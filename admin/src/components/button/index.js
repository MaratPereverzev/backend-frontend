import { Button } from "@mui/material";
import { Box } from "../box";
import { Text } from "../text";

const Default = (props) => {
  const { caption, sxBox, sxText, propsBox, propsText, ...other } = props;

  return (
    <Button variant="contained" {...other}>
      <Box defFlex center row gap {...propsBox} sx={{ ...sxBox }}>
        <Text caption={caption} {...propsText} sx={{ ...sxText }}></Text>
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

export { Default as Button, Delete as ButtonDelete };
