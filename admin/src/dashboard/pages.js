import { Box } from "@components";
import { useState, useEffect } from "react";
import { addEvent, dispatch } from "@utils";
import { setPageHash, getPageHash } from "@utils";
import { PageMain, PageGood } from "../page";

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
      {(route === "main" || !route) && <PageMain />}
      {route === "goods" && <PageGood />}
    </Box>
  );
};

export { Default as Page };
