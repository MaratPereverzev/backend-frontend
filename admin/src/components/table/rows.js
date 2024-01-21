import { Divider, Stack } from "@mui/material";
import Row from "./row";
import { useState } from "react";

const Default = (props) => {
  const [checked, setChecked] = useState([]);
  const { items } = props;

  if (!Array.isArray(items) || !items.length > 0) return null;

  return (
    <Stack divider={<Divider variant="middle" flexItem />}>
      {items?.map((item, index) => {
        const isChecked = !!checked.find((checked) => checked?.id === item?.id);

        return (
          <Row
            key={item?.id ?? index}
            checked={isChecked}
            setChecked={setChecked}
            item={item}
          />
        );
      })}
    </Stack>
  );
};

export default Default;
