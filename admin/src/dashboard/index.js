import { Box, Divider, MenuButton, Text, Icon } from "@components";

const MyButton = (props) => {
  const { name } = props;

  return (
    <MenuButton
      color="inherit"
      caption={
        <>
          <Icon name={name} />
          <Text
            caption={name}
            sx={{ fontSize: 14, textTransform: "capitalize" }}
          />
        </>
      }
      sx={{ justifyContent: "flex-start", borderRadius: 2, minHeight: 40 }}
    />
  );
};
const Default = () => {
  return (
    <Box defFlex row grow>
      <Box defFlex gap sx={{ width: 240, p: 2 }}>
        <Box
          defFlex
          grow
          sx={{
            p: 1,
            pt: 1.5,
            boxShadow: "0px 0px 15px 0px rgba(66, 68, 90, 0.47)",
            borderRadius: 4,
          }}
        >
          <Box defFlex ai row gap sx={{ height: 32 }}>
            <Icon name="logo" sx={{ fontSize: 46, width: 46, height: 46 }} />
            <Text caption="React"></Text>
          </Box>
          <Divider sx={{ my: 1.5 }} />
          <Box defFlex gap={1.5} grow>
            <MyButton name="home" />
            <MyButton name="portfolio" />
          </Box>
          <Box defFlex>
            <MyButton name="close" />
          </Box>
        </Box>
      </Box>
      <Box component="pages" grow />
    </Box>
  );
};

export { Default as Dashboard };
