import { Box } from "../box";
import { Checkbox } from "@mui/material";
import { memo } from "react";
import { useState, useEffect } from "react";
import { useTable } from "@context";
import { dispatch, addEvent } from "@hooks";

function areEqual(prev, next) {
  const result =
    prev.checked === next.checked && prev.setChecked === next.setChecked;
  return result;
}
const Default = memo((props) => {
  const { item, name } = props;
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
    <Box sx={{ p: 1 }}>
      <Checkbox
        checked={checked}
        size="small"
        onChange={() => {
          setChecked((prev) => !prev);
        }}
      />
      {caption}
    </Box>
  );
}, areEqual);

export default Default;
