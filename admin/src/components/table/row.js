import { Box } from "../box";
import { Checkbox } from "@mui/material";

const Default = (props) => {
  const { checked, setChecked, item } = props;

  return (
    <Box sx={{ p: 1 }}>
      <Checkbox
        checked={!!checked.find((checked) => checked.id === item?.id)}
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
};

export default Default;
