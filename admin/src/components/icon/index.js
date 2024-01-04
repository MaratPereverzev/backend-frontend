import { Box } from "../box";

const iconData = {
  home: "Home",
  portfolio: "Person",
  open: "keyboard_tab",
  close: "keyboard_tab_rtl",
  logo: "polymer",
  defIcon: "Block",
};

const Icon = (props) => {
  const { name, sx, ...other } = props;
  const icon = iconData[name] ?? iconData["defIcon"];

  return (
    <Box
      className="material-symbols-rounded"
      sx={{ height: 24, width: 24, ...sx }}
      {...other}
    >
      {icon}
    </Box>
  );
};

export { Icon };
