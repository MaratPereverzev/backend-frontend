import { Box } from "../box";
import { Checkbox } from "@mui/material";
import { memo } from "react";
import { useState, useEffect } from "react";
import { useTable } from "@context";
import { dispatch, addEvent } from "@hooks";

function areEqual(prev, next) {
  const result =
    prev.checked === next.checked &&
    prev.setChecked === next.setChecked &&
    prev.onRenderItem === next.onRenderItem &&
    JSON.stringify(prev.item) === JSON.stringify(next.item);
  return result;
}

const Default = memo((props) => {
  const { item, name, onRenderItem } = props;
  const { id, caption } = item;
  const [checked, setChecked] = useState(false);
  const tableData = useTable();

  useEffect(() => {
    return addEvent(`${name}.selectClear`, () => {
      setChecked(false);
    });
  }, [name]);

  useEffect(() => {
    if (checked) tableData.selected[id] = true;
    else delete tableData.selected[id];
    dispatch(`${name}.selectChange`);
  }, [checked, tableData, id, name]);

  return (
    <Box defFlex row ai sx={{ p: 1 }}>
      <Checkbox
        checked={checked}
        size="small"
        onChange={() => {
          setChecked((prev) => !prev);
        }}
      />
      {typeof onRenderItem === "function" ? (
        <Box defFlex grow>
          {onRenderItem(item)}
        </Box>
      ) : (
        { caption }
      )}
    </Box>
  );
}, areEqual);

export default Default;
