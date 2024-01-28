import { Box } from "../box";
import { useTable } from "@context";
import { Pagination, Typography } from "@mui/material";
import { addEvent, dispatch } from "@hooks";
import { useEffect, useState } from "react";

const CountSelect = (props) => {
  const { name } = props;
  const [, setReload] = useState(false);
  const tableData = useTable();
  useEffect(
    () =>
      addEvent(`${name}.selectChange`, () => {
        setReload((prev) => !prev);
      }),
    [name]
  );
  const count = Object.keys(tableData?.selected ?? {}).length;
  return count > 0 ? (
    <Typography
      onClick={(e) => {
        dispatch(`${name}.selectClear`);
        e.stopPropagation();
      }}
    >
      Кол-во выбранных элементов: {count}
    </Typography>
  ) : null;
};

const Default = (props) => {
  const { sxFooter, bottomButtons, name } = props;

  return (
    <Box defFlex jc="space-between" row name="footer" sx={{ ...sxFooter }}>
      {bottomButtons}
      <CountSelect name={name} />
      <Pagination count={10} hidePrevButton hideNextButton />
    </Box>
  );
};

export default Default;
