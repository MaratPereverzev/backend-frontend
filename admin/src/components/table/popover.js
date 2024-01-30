import { useState } from "react";
import { Box } from "../box";
import { ButtonIcon, Button } from "../button";
import Popover from "@mui/material/Popover";
import { dispatch } from "@hooks";

const Default = (props) => {
  const { name } = props;
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
    <Box ai>
      <ButtonIcon
        name="settings"
        sx={{
          rotate: open ? "90deg" : "0deg",
          transition: "rotate 150ms ease-in-out",
        }}
        sxIcon={{ fontSize: 20 }}
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
        <Button
          sx={{ m: 1 }}
          onClick={(e) => {
            dispatch(`${name}.selectClear`);
            e.stopPropagation();
          }}
        />
      </Popover>
    </Box>
  );
};

export default Default;
