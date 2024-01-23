import { Box } from "../box";
import { useTable } from "@context";
import { Pagination, Typography } from "@mui/material";
import { addEvent } from "@hooks";
import { useEffect, useState } from "react";

const Default = (props) => {
  const [, setReload] = useState(false);
  const { sxFooter, bottomButtons, name } = props;
  const tableData = useTable();
  useEffect(
    () =>
      addEvent(`${name}.selectChange`, () => {
        setReload((prev) => !prev);
      }),
    [name]
  );
  return (
    <Box defFlex jc="space-between" row name="footer" sx={{ ...sxFooter }}>
      {bottomButtons}
      {tableData?.selected?.length > 0 ? (
        <Typography>
          Кол-во выбранных элементов: {tableData.selected.length}
        </Typography>
      ) : null}
      <Pagination count={10} hidePrevButton hideNextButton />
    </Box>
  );
};

export default Default;
