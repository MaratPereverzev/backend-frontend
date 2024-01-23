import { Table, ButtonIcon, Box } from "@components";

const Default = () => {
  return (
    <Table
      topButtons={
        <Box>
          <ButtonIcon name="search" />
          <ButtonIcon name="filter" />
        </Box>
      }
      bottomButtons={
        <>
          <ButtonIcon name="settings" sxIcon={{ fontSize: 20 }} />
        </>
      }
      items={new Array(10).fill(null).map((_, index) => ({
        id: index,
        caption: `good №${index}`,
      }))}
      name="goods"
    />
  );
};

export { Default as Goods };
