import { DialogDelete, DialogEdit } from "@components";
import { useGoodGetById } from "@api";
import { useState, memo, useMemo, useCallback } from "react";
import Container from "./edit";
import { areEqualAlways } from "@utils";

const useData = () => {
  const [loading, setLoading] = useState(false);
  const [callbackGet, loadingGetById] = useGoodGetById();

  const handleOnPost = useCallback((data, onClose) => {
    setLoading(true);
    console.log(data);
    onClose();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const handleOnEdit = useCallback((data, onClose) => {
    setLoading(true);
    console.log(data);
    onClose();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const handleOnGet = useCallback(
    (data, onClose) => {
      callbackGet(data, onClose);
    },
    [callbackGet]
  );

  const result = useMemo(() => {
    return {
      onPost: handleOnPost,
      onEdit: handleOnEdit,
      onGet: handleOnGet,
    };
  }, [handleOnEdit, handleOnGet, handleOnPost]);

  result.loading = loading || loadingGetById;
  return result;
};

const Default = memo((props) => {
  const { langBase } = props;
  return (
    <>
      <DialogEdit
        langBase={langBase}
        container={<Container langBase={`${langBase}.dialog.edit`} />}
        sxDialogContent={{
          py: 0,
          px: 0.25,
        }}
        sxDialogHeader={{ py: 1.75 }}
        {...useData()}
        needLoading
      />
      <DialogDelete langBase={langBase} />
    </>
  );
}, areEqualAlways);

export default Default;
