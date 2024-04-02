import { Table, ButtonIcon, Box } from "@components";
import Dialogs from "../main/dialog";
import { useState, useCallback, useEffect } from "react";
import useRow from "./row";
import { useGoodsGet } from "@api";

const langBase = "goods";

const Default = () => {
  const [page, setPage] = useState(0);
  const [callbackGet, loading, rows] = useGoodsGet(20);

  useEffect(() => {
    callbackGet({ page });
  }, [callbackGet, page]);

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
        items={rows?.products?.map((item) => ({
          ...item,
          caption: item.title,
        }))}
        langBase="goods"
        name="goods"
        onChangePage={handleOnChangePage}
        onRenderItem={useRow(langBase)}
        pageCount={rows?.totalPage}
        loading={loading}
      />
      <Dialogs langBase={langBase} />
    </Box>
  );
};

export { Default as PageMain };
