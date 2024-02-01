import { Box } from "@components";
import { useState, useEffect } from "react";
import { addEvent, dispatch } from "@hooks";
import { setPageHash, getPageHash } from "@utils";
import { Goods } from "../page";

const Default = (props) => {
  const [route, setRoute] = useState(getPageHash());

  useEffect(() => {
    addEvent(
      "hashchange",
      () => {
        setRoute(getPageHash());
      },
      window,
      false
    );
  }, []);

  useEffect(() => {
    return addEvent("route", (data) => {
      setPageHash(data.detail.route);
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
        borderRadius: 4,
        ...sx,
      }}
    >
      {(route === "goods" || !route) && <Goods />}
    </Box>
  );
};

export { Default as Page };
