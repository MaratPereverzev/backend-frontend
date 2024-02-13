import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { addEvent } from "@utils";
import { useState, useEffect } from "react";
import { Button } from "../../button";

const Delete = (props) => {
  const { langBase } = props;
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(
    () =>
      addEvent(`${langBase}.dialog.delete`, (data) => {
        setData(data?.detail);
        setOpen(true);
      }),
    [langBase]
  );

  const handleClose = () => {
    setOpen(false);
  };

  if (open) {
    return (
      <>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            Удаление: {data?.caption}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>{data?.id} - test</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} caption="Сохранить" variant="text" />
            <Button
              onClick={handleClose}
              autoFocus
              caption="Отмена"
              variant="text"
              color="warning"
            />
          </DialogActions>
        </Dialog>
      </>
    );
  } else {
    return null;
  }
};

export { Delete as DialogDelete };
