import { Box, Divider, MenuButton, Text, Icon } from "@components";
import { useState, useEffect, useCallback } from "react";
import { dispatch, addEvent } from "@hooks";
import { Page } from "./pages";

const MyButton = (props) => {
  const { name, open, iconSx, ...other } = props;

  return (
    <MenuButton
      color="inherit"
      caption={
        <>
          <Icon name={name} sx={{ ...iconSx }} />
          {open && (
            <Text
              caption={name}
              sx={{
                fontSize: 16,
                textTransform: "capitalize",
                opacity: open ? 1 : 0,
                transition: "opacity 100ms ease-in-out",
              }}
            />
          )}
        </>
      }
      sx={{
        justifyContent: "flex-start",
        borderRadius: 2,
        minHeight: 40,
        minWidth: 0,
      }}
      {...other}
    />
  );
};

const useOpen = () => {
  const [open, setOpen] = useState(true);

  return [open, setOpen];
};

const Default = () => {
  const [open, setOpen] = useOpen();

  useEffect(() => {
    return addEvent("closeSideBar", () => {
      setOpen((prev) => (prev = false));
    });
  }, [setOpen]);

  const leftPanelOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, [setOpen]);

  return (
    <Box defFlex row grow>
      <Box
        defFlex
        gap
        sx={{
          width: open ? 200 : 55,
          p: 2,
          transition: "width 100ms ease-out",
        }}
      >
        <Box
          defFlex
          grow
          sx={{
            p: 1,
            pt: 1.5,
            boxShadow: "0px 0px 15px 0px rgba(66, 68, 90, 0.47)",
            borderRadius: 4,
          }}
        >
          <Box defFlex ai row gap sx={{ height: 32 }}>
            <Icon name="logo" sx={{ fontSize: 39, width: 40, height: 40 }} />
            {open && (
              <Text
                caption="React"
                sx={{
                  opacity: open ? 1 : 0,
                  transition: "opacity 100ms ease-in-out",
                }}
              />
            )}
          </Box>
          <Divider sx={{ my: 1.5 }} />
          <Box defFlex gap={1.5} grow>
            <MyButton
              name="home"
              open={open}
              onClick={() => {
                dispatch("caption", { caption: "home" });
              }}
            />
            <MyButton
              name="portfolio"
              open={open}
              onClick={() => {
                dispatch("caption", { caption: "portfolio" });
              }}
            />
          </Box>
          <Box defFlex>
            <MyButton
              name="close"
              open={open}
              onClick={leftPanelOpen}
              iconSx={{
                rotate: open ? "0deg" : "-180deg",
                transition: "rotate 100ms ease-in-out",
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box defFlex grow sx={{ py: 2, pr: 1 }}>
        <Page />
      </Box>
    </Box>
  );
};

const RootDefault = (props) => {
  return <Default {...props} />;
};

export { RootDefault as Dashboard };
