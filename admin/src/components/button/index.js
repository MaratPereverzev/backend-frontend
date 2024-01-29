import { Button, IconButton } from "@mui/material";
import { Box } from "../box";
import { Text } from "../text";
import { Icon } from "../icon";

const Default = (props) => {
  const {
    caption,
    icon,
    sxBox,
    sxText,
    sxIcon,
    propsBox,
    propsText,
    ...other
  } = props;

  const textIsString = typeof caption === "string";
  return (
    <Button variant="contained" {...other}>
      <Box defFlex center row gap {...propsBox} sx={{ ...sxBox }}>
        {icon ? <Icon name={icon} sx={{ ...sxIcon }}></Icon> : null}
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

const ButtonIcon = (props) => {
  const { name, sx, sxIcon, ...other } = props;

  return (
    <IconButton sx={{ ...sx }}>
      <Icon name={name} sx={{ ...sxIcon }} {...other} />
    </IconButton>
  );
};
export { Default as Button, Delete as ButtonDelete, MenuButton, ButtonIcon };
