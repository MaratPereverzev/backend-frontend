import { Box } from "@components";
import Setting from "./setting";
import Price from "./price";
import Tabs from "@components/tabs";
import { useAction, useDef } from "@utils";
import { useState } from "react";

const tabs = [
  { name: "setting", validate: ["caption"] },
  { name: "price", validate: ["price"] },
];

const Default = (props) => {
  const [data, setData] = useState(null);
  const [dialogData, setDialogData] = useState({ tabs: 0 });

  const handleOnChange = useAction(setData);
  const handleOnDialogChange = useAction(setDialogData);

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
        {dialogData.tabs === 0 && <Setting def={def} />}
        {dialogData.tabs === 1 && <Price def={def} />}
      </Box>
    </>
  );
};

export default Default;
