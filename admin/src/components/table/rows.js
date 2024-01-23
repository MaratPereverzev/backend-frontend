import { Divider, Stack } from "@mui/material";
import Row from "./row";
import { useEffect, useState } from "react";
import { dispatch } from "@hooks";
import { useTable } from "@context";

const Default = (props) => {
  const [checked, setChecked] = useState([]);
  const { items, name } = props;
  const tableData = useTable();

  useEffect(() => {
    tableData.selected = checked;
    dispatch(`${name}.selectChange`);
  }, [name, checked, tableData]);
  if (!Array.isArray(items) || !items.length > 0) return null;

  return (
    <Stack divider={<Divider variant="middle" flexItem />}>
      {items?.map((item, index) => {
        const isChecked = !!checked.find((checked) => checked?.id === item?.id);

        return (
          <Row
            key={item?.id ?? index}
            checked={isChecked}
            setChecked={(data) => {
              dispatch(`${name}.selectChange`);
              setChecked(data);
            }}
            item={item}
          />
        );
      })}
    </Stack>
  );
};

export default Default;
