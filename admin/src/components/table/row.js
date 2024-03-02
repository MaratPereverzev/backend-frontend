import { Box } from "../box";
import { Checkbox } from "@mui/material";
import { memo } from "react";
import { useState, useEffect } from "react";
import { useTable } from "@context";
import { dispatch, addEvent } from "@utils";

function areEqual(prev, next) {
  const result =
    prev.checked === next.checked &&
    prev.setChecked === next.setChecked &&
    prev.onRenderItem === next.onRenderItem &&
    JSON.stringify(prev.item) === JSON.stringify(next.item);
  return result;
}

const Default = memo((props) => {
  const { item, name, onRenderItem, langBase } = props;
  const { id, caption } = item;
  const [checked, setChecked] = useState(false);
  const [select, setSelect] = useState(false);
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

  useEffect(() => {
    return addEvent(`${name}.selectCheckBox`, (data) => {
      setSelect(data?.detail?.show);
    });
  });

  return (
    <Box defFlex row grow ai sx={{ p: 1 }}>
      {select && (
        <Checkbox
          checked={checked}
          size="small"
          onChange={() => {
            setChecked((prev) => !prev);
          }}
        />
      )}
      {typeof onRenderItem === "function" ? (
        <Box defFlex grow>
          {onRenderItem(item, langBase)}
        </Box>
      ) : (
        { caption }
      )}
    </Box>
  );
}, areEqual);

export default Default;
