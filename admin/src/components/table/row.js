import { Box } from "../box";
import { Checkbox } from "@mui/material";
import { memo } from "react";

function areEqual(prev, next) {
  const result =
    prev.checked === next.checked && prev.setChecked === next.setChecked;
  return result;
}
const Default = memo((props) => {
  const { checked, setChecked, item } = props;
  return (
    <Box sx={{ p: 1 }}>
      <Checkbox
        checked={checked}
        size="small"
        onChange={({ target }) => {
          if (target.checked) {
            setChecked((prev) => {
              prev.push({ id: item?.id });
              return [...prev];
            });
          } else {
            setChecked((prev) =>
              prev.filter((checked) => checked.id !== item?.id)
            );
          }
        }}
      />
      {item?.caption}
    </Box>
  );
}, areEqual);

export default Default;
