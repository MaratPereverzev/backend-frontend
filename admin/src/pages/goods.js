import { Table, ButtonIcon, Box, Dialog } from "@components";
import { useState, useCallback } from "react";
import { dispatch } from "@hooks";

const goods = (page = 0) => {
  const perPage = 10;
  return new Array(10).fill(null).map((_, index) => ({
    id: index,
    caption: `good №${perPage * page + index}`,
  }));
};

const langBase = "goods";

const Default = () => {
  const [, setData] = useState(false);
  const [page, setPage] = useState(0);

  const handleOnChangePage = useCallback(
    (name) => (page) => {
      setPage(page - 1);
    },
    []
  );

  const handleOnRenderItem = useCallback((item) => {
    return (
      <Box defFlex row jc="space-between" ai grow>
        <div>{item.caption}</div>
        <Box defFlex row>
          <ButtonIcon
            name="edit"
            onClick={() => {
              dispatch(`${langBase}.dialog.edit`);
              setData((prev) => !prev);
            }}
          />
          <ButtonIcon
            name="delete"
            onClick={() => {
              setData((prev) => !prev);
            }}
            sx={{ color: "warning.main" }}
          />
        </Box>
      </Box>
    );
  }, []);

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
        name="goods"
        onChangePage={handleOnChangePage}
        onRenderItem={handleOnRenderItem}
        pageCount={20}
      />
      <Dialog langBase={langBase} />
    </Box>
  );
};

export { Default as Goods };
