import { Table, Button } from "@components";

const Default = () => {
  return (
    <Table
      topButtons={
        <>
          <Button
            icon="search"
            sxIcon={{ fontSize: 20, height: 20, width: 20 }}
            sx={{ borderTopRightRadius: 10 }}
            variant="outlined"
          />
        </>
      }
      bottomButtons={
        <>
          <Button
            icon="settings"
            sxIcon={{ fontSize: 20, height: 20, width: 20 }}
            sx={{ borderBottomRightRadius: 10 }}
            variant="outlined"
          />
        </>
      }
      items={new Array(70).fill(null).map((_, index) => ({
        id: index,
        caption: `good №${index}`,
      }))}
    />
  );
};

export { Default as Goods };
