import { Divider, Stack } from "@mui/material";
import Row from "./row";

const Default = (props) => {
  const { items, checked, setChecked } = props;

  if (!Array.isArray(items) || !items.length > 0) return null;

  return (
    <Stack divider={<Divider variant="middle" flexItem />}>
      {items?.map((item, index) => (
        <Row
          key={item?.id ?? index}
          checked={checked}
          setChecked={setChecked}
          item={item}
        />
      ))}
    </Stack>
  );
};

export default Default;
