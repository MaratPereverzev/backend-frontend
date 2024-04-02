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
import { useState, useEffect, useCallback } from "react";
import { Button } from "../../button";
import { Divider } from "../../divider";
import { Box } from "../../box";

const Edit = (props) => {
  const {
    langBase,
    container,
    sxDialogHeader,
    sxDialogContent,
    useData,
    needLoading,
    loading: loadingProps,
  } = props;

  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [id, setId] = useState(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleOk = useCallback(() => {
    if (data?.id !== undefined || data?.id !== null) {
      if (typeof useData?.onEdit === "function") {
        useData.onEdit(data, () => {
          setOpen(false);
        });
      }
      return;
    }
    if (typeof useData?.onPost === "function") {
      useData.onPost(data, () => {
        setOpen(false);
      });
    }
  }, [useData, data]);
  useEffect(() => {
    if (needLoading && data?.id) {
      if (typeof useData?.onGet === "function") {
        useData.onGet({ id: data.id }, (data) => {
          setId(data?.id);
          setData(data);
        });
      }
    }
  }, [needLoading, data, useData]);
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

  const calcContainer =
    typeof container === "function" ? (
      container(data)
    ) : (
      <container.type {...container.props} data={data} />
    );

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
            {loadingProps
              ? `Loading...`
              : `Редактирование: ${data?.caption ?? data?.title}`}
          </DialogTitle>
          <Divider />
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              ...sxDialogContent,
            }}
          >
            {loadingProps ? (
              <Box defFlex center grow>
                LOADING...
              </Box>
            ) : (
              calcContainer ?? (
                <DialogContentText>{id} - test</DialogContentText>
              )
            )}
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button
              onClick={handleOk}
              caption="Сохранить"
              variant="text"
              disabled={loadingProps}
            />
            <Button
              onClick={handleClose}
              disabled={loadingProps}
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
