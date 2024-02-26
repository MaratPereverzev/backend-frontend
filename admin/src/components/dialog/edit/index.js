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
import { Divider } from "../../divider";

const Edit = (props) => {
  const { langBase, container, sxDialogHeader, sxDialogContent } = props;
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(
    () =>
      addEvent(`${langBase}.dialog.edit`, (data) => {
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
          aria-labelledby="responsive-dialog-title"
          maxWidth="md"
        >
          <DialogTitle id="responsive-dialog-title" sx={sxDialogHeader}>
            Редактирование: {data?.caption}
          </DialogTitle>
          <Divider />
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              ...sxDialogContent,
            }}
          >
            {container ?? (
              <DialogContentText>{data?.id} - test</DialogContentText>
            )}
          </DialogContent>
          <Divider />
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

export { Edit as DialogEdit };
