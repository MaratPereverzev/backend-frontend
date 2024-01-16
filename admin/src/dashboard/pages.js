import { Box } from "@components";
import { useState, useEffect } from "react";
import { addEvent, dispatch } from "@hooks";
import { Home } from "../pages";

const Default = (props) => {
  const [route, setRoute] = useState(window.location.hash.replace("#", ""));

  useEffect(() => {
    const event = () => {
      setRoute(window.location.hash.replace("#", ""));
    };

    window.addEventListener("hashchange", event, false);
    return () => {
      window.removeEventListener("hashchange", event);
    };
  }, []);

  useEffect(() => {
    return addEvent("route", (data) => {
      window.location.hash = data.detail.route;
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
      {(route === "home" || !route) && <Home />}
    </Box>
  );
};

export { Default as Page };
