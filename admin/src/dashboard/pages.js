import { Box } from "@components";
import { useState, useEffect } from "react";
import { addEvent, dispatch } from "@hooks";

const Default = (props) => {
  const [caption, setCaption] = useState("");

  useEffect(() => {
    return addEvent("caption", (data) => {
      setCaption((prev) => (prev = data.detail.caption));
      dispatch("closeSideBar");
    });
  }, []);

  const { sx } = props;
  return (
    <Box
      defFlex
      grow
      sx={{
        border: ({ palette }) => `1px solid ${palette.divider}`,
        borderRadius: 1,
        ...sx,
      }}
    >
      {caption}
    </Box>
  );
};

export { Default as Page };
