import { useState } from "react";
import { Box } from "../box";
import { ButtonIcon, Button } from "../button";
import Popover from "@mui/material/Popover";
import { dispatch } from "@utils";
import { useTable } from "@context";

const Default = (props) => {
  const { name } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [showSelected, setShowSelected] = useState(false);
  const tableData = useTable();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const cancel =
    showSelected && Object.keys(tableData.selected ?? {}).length === 0;

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
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            sx: {
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              borderBottomRightRadius: 15,
            },
          },
        }}
      >
        <Box defFlex gap sx={{ p: 0.5 }}>
          <Button
            caption={
              cancel
                ? "Отмена"
                : showSelected
                ? "Cнять выделения"
                : "Выбрать элементы"
            }
            sx={{ m: 1 }}
            sxText={{ fontSize: 12 }}
            onClick={(e) => {
              if (showSelected) {
                dispatch(`${name}.selectClear`);
                dispatch(`${name}.selectCheckBox`, { show: false });
                setShowSelected(false);
              } else {
                dispatch(`${name}.selectCheckBox`, { show: true });
                setShowSelected(true);
              }
              handleClose();
              e.stopPropagation();
            }}
          />
        </Box>
      </Popover>
    </Box>
  );
};

export default Default;
