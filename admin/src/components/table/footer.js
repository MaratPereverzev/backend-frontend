import { Box } from "../box";
import { useTable } from "@context";
import { Pagination, Typography } from "@mui/material";
import { addEvent, dispatch } from "@hooks";
import { useEffect, useState } from "react";
import Popover from "./popover";

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
  const { sxFooter, bottomButton, name, onChangePage } = props;

  return (
    <Box defFlex jc="space-between" row name="footer" sx={{ ...sxFooter }}>
      <Popover bottomButton={bottomButton} />
      <CountSelect name={name} />
      <Pagination
        count={10}
        hidePrevButton
        hideNextButton
        onChange={(e, page) => {
          if (typeof onChangePage === "function") {
            onChangePage(name)(page);
          }
        }}
      />
    </Box>
  );
};

export default Default;
