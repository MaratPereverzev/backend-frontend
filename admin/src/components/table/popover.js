import { useState } from "react";
import { Box } from "../box";
import Popover from "@mui/material/Popover";

const Default = (props) => {
  const { bottomButton } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box>
      <bottomButton.type
        {...bottomButton.props}
        sxIcon={{ ...bottomButton.props.sxIcon }}
        onClick={handleClick}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        asdfasdga
      </Popover>
    </Box>
  );
};

export default Default;
