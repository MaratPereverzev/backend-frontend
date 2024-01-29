import { Divider, Stack } from "@mui/material";
import Row from "./row";

const Default = (props) => {
  const { items, name, onRenderItem } = props;

  if (!Array.isArray(items) || !items.length > 0) return null;

  return (
    <Stack divider={<Divider variant="middle" flexItem />}>
      {items?.map((item, index) => {
        return (
          <Row
            key={item?.id ?? index}
            item={item}
            name={name}
            onRenderItem={onRenderItem}
          />
        );
      })}
    </Stack>
  );
};

export default Default;
