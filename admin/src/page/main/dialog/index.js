import { DialogDelete, DialogEdit } from "@components";
import Container from "./edit";

const Default = (props) => {
  const { langBase } = props;

  return (
    <>
      <DialogEdit
        langBase={langBase}
        container={<Container />}
        sxDialogContent={{
          py: 0,
          px: 0.25,
        }}
        sxDialogHeader={{ py: 1.75 }}
      />
      <DialogDelete langBase={langBase} />
    </>
  );
};

export default Default;
