import { DialogDelete, DialogEdit } from "@components";
import { useState } from "react";
import Container from "./edit";

const useData = () => {
  const [loading, setLoading] = useState(false);

  const handleOnPost = (data, onClose) => {
    setLoading(true);
    console.log(data);
    onClose();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  const handleOnEdit = (data, onClose) => {
    setLoading(true);
    console.log(data);
    onClose();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  return { onPost: handleOnPost, onEdit: handleOnEdit, loading };
};

const Default = (props) => {
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
        useData={useData()}
      />
      <DialogDelete langBase={langBase} />
    </>
  );
};

export default Default;
