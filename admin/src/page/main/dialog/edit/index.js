import { Box, Input } from "@components";
import { useState, useCallback } from "react";

const Default = (props) => {
  const [data, setData] = useState(null);

  const handleOnChange = useCallback(
    (name) => (value) => {
      setData((prev) => {
        if (!prev) {
          prev = {};
        }
        prev[name] = value;
        return { ...prev };
      });
    },
    []
  );

  return (
    <Box defFlex gap sx={{ py: 0.5 }}>
      <Input
        name="caption"
        caption="caption"
        onChange={handleOnChange}
        value={data?.caption}
        clear
      />
      <Input
        name="caption1"
        caption="caption1"
        onChange={handleOnChange}
        value={data?.caption1}
        clear
      />
      <Input
        name="caption2"
        caption="caption2"
        onChange={handleOnChange}
        value={data?.caption2}
        clear
      />
    </Box>
  );
};

export default Default;
