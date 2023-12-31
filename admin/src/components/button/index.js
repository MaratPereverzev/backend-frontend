import { Button } from "@mui/material";
import { Box } from "../box";
import { Text } from "../text";

const Default = (props) => {
  const { caption, sxBox, sxText, propsBox, propsText, ...other } = props;

  const textIsString = typeof caption === "string";
  return (
    <Button variant="contained" {...other}>
      <Box defFlex center row gap {...propsBox} sx={{ ...sxBox }}>
        {textIsString ? (
          <Text caption={caption} {...propsText} sx={{ ...sxText }}></Text>
        ) : (
          caption
        )}
        {other.children}
      </Box>
    </Button>
  );
};

const Delete = (props) => {
  const { caption = "delete", ...other } = props;

  return (
    <Default
      variant="contained"
      color="warning"
      caption={caption}
      {...other}
    ></Default>
  );
};

const MenuButton = (props) => {
  return <Default variant="text" {...props}></Default>;
};
export { Default as Button, Delete as ButtonDelete, MenuButton };
