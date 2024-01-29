import { Table, ButtonIcon, Box } from "@components";
import { useState, useCallback } from "react";

const goods = (page = 0) => {
  const perPage = 10;
  return new Array(10).fill(null).map((_, index) => ({
    id: index,
    caption: `good №${perPage * page + index}`,
  }));
};

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
        <ButtonIcon
          name="filter"
          onClick={() => {
            setData((prev) => !prev);
          }}
        />
      </Box>
    );
  }, []);

  return (
    <Table
      topButtons={
        <Box>
          <ButtonIcon name="search" />
          <ButtonIcon name="filter" />
        </Box>
      }
      bottomButton={<ButtonIcon name="settings" sxIcon={{ fontSize: 20 }} />}
      items={goods(page)}
      name="goods"
      onChangePage={handleOnChangePage}
      onRenderItem={handleOnRenderItem}
      pageCount={20}
    />
  );
};

export { Default as Goods };
