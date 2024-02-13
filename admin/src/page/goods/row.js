import { Box, ButtonIcon } from "@components";
import { dispatchDialogDelete, dispatchDialogEdit } from "@utils";
import { useCallback } from "react";

const useRenderRow = () =>
  useCallback((item, langBase) => {
    return (
      <Box defFlex row jc="space-between" ai grow>
        <div>{item.caption}</div>
        <Box defFlex row>
          <ButtonIcon
            name="edit"
            onClick={() => {
              dispatchDialogEdit(langBase, item);
            }}
          />
          <ButtonIcon
            name="delete"
            onClick={() => {
              dispatchDialogDelete(langBase, item);
            }}
            sx={{ color: "warning.main" }}
          />
        </Box>
      </Box>
    );
  }, []);

export default useRenderRow;
