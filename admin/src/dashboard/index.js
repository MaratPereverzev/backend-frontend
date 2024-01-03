import { Box, Divider, MenuButton, Text } from "@components";

const MyButton = (props) => {
  const { name } = props;

  return (
    <MenuButton
      caption={<Text caption={name}></Text>}
      sx={{ justifyContent: "flex-start" }}
    />
  );
};
const Default = () => {
  return (
    <Box defFlex row grow>
      <Box
        defFlex
        sx={{
          borderRight: "1px solid #000",
          width: 240,
        }}
        gap
      >
        <Box sx={{ height: 60 }}></Box>
        <Divider />
        <Box defFlex gap={1.5} sx={{ p: 1 }} grow>
          <MyButton name="Home" />
          <MyButton name="Portfolio" />
        </Box>
        <Box defFlex sx={{ p: 1 }}>
          <MyButton name="Close" />
        </Box>
      </Box>
      <Box grow />
    </Box>
  );
};

export { Default as Dashboard };
