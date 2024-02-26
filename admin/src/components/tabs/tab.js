import { Tab } from "@mui/material";

const Default = (props) => {
  const { sx, ...other } = props;

  return <Tab {...other} sx={{ p: 1, pb: 0, ...sx }} />;
};

export default Default;
