import { Typography } from "@mui/material";

const Default = (props) => {
  const { caption, sx, ...other } = props;

  return (
    <Typography sx={{ ...sx }} {...other}>
      {caption}
    </Typography>
  );
};

export { Default as Text };
