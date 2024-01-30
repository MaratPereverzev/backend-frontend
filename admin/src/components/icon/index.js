import { Icon } from "@mui/material";

const iconData = {
  goods: "shopping_cart",
  orders: "receipt_long",
  open: "keyboard_tab",
  close: "keyboard_tab_rtl",
  logo: "polymer",
  defIcon: "Block",
  search: "search",
  settings: "settings",
  filter: "filter_alt",
};

const Default = (props) => {
  const { name, sx, ...other } = props;
  const icon = iconData[name] ?? iconData["defIcon"];

  return (
    <Icon className="material-symbols-rounded" sx={{ ...sx }} {...other}>
      {icon}
    </Icon>
  );
};

export { Default as Icon };
