import { Table, ButtonIcon, Box } from "@components";
import Dialogs from "../main/dialog";
import { useState, useCallback } from "react";
import useRow from "./row";

const goods = (page = 0) => {
  const perPage = 1000;
  return new Array(perPage).fill(null).map((_, index) => ({
    id: index,
    caption: `good №${perPage * page + index}`,
  }));
};

const langBase = "goods";

const Default = (props) => {
  const { loading } = props;
  const [page, setPage] = useState(0);

  const handleOnChangePage = useCallback(
    (name) => (page) => {
      setPage(page - 1);
    },
    []
  );

  return (
    <Box defFlex center sx={{ height: "100%", width: "100%" }}>
      <Table
        topButtons={
          <Box>
            <ButtonIcon name="search" />
            <ButtonIcon name="filter" />
          </Box>
        }
        items={goods(page)}
        langBase="goods"
        name="goods"
        onChangePage={handleOnChangePage}
        onRenderItem={useRow(langBase)}
        pageCount={20}
        loading={loading}
      />
      <Dialogs langBase={langBase} />
    </Box>
  );
};

export { Default as Goods };
