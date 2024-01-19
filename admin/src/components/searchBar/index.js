import { TextField } from "@mui/material";

const Default = (props) => {
  const { sx, ...other } = props;
  return <TextField sx={{ ...sx }} {...other} />;
};

export { Default as Input };
