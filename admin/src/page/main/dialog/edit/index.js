import { Box } from "@components";
import Setting from "./setting";
import Price from "./price";
import Tabs from "@components/tabs";
import { useAction, useActionDialog, useDef } from "@utils";
import { useState } from "react";

const tabs = [
  { name: "setting", validate: ["caption"] },
  { name: "price", validate: ["price"] },
];

const storeProps = ["tabs"];

const Default = (props) => {
  const { langBase, data: oldData } = props;
  const [data, setData] = useState(oldData);
  const [dialogData, setDialogData] = useState(null);

  const handleOnChange = useAction(setData);
  const handleOnDialogChange = useActionDialog(
    setDialogData,
    langBase,
    storeProps
  );

  const def = useDef(data, handleOnChange);

  return (
    <>
      <Tabs
        items={tabs}
        tabs={dialogData?.tabs}
        onChange={handleOnDialogChange}
      />
      <Box
        sx={{
          p: 1,
          minHeight: 150,
          maxHeight: 250,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {dialogData?.tabs === 0 && <Setting def={def} />}
        {dialogData?.tabs === 1 && <Price def={def} />}
      </Box>
    </>
  );
};

export default Default;
