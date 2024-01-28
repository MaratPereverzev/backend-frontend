import { Box, Divider, MenuButton, Text, Icon } from "@components";
import { useState, useEffect, useCallback, memo } from "react";
import { dispatch, addEvent } from "@hooks";
import { getPageHash } from "@utils";
import { Page } from "./pages";

function areEqual() {
  return true;
}

const Content = memo((props) => {
  const { sx } = props;
  return (
    <Box defFlex grow sx={{ py: 2, pr: 2 }}>
      <Page sx={{ ...sx }} />
    </Box>
  );
}, areEqual);
const MyButton = (props) => {
  const { name, sx, open, iconSx, caption, ...other } = props;
  const [active, setActive] = useState(getPageHash() === name);

  useEffect(
    () =>
      addEvent(
        "hashchange",
        () => {
          setActive(getPageHash() === name);
        },
        window,
        false
      ),
    [name]
  );

  return (
    <MenuButton
      color="inherit"
      variant={active ? "contained" : "text"}
      caption={
        <>
          <Icon name={name} sx={{ ...iconSx }} />
          {open && (
            <Text
              caption={caption}
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
        p: 1,
        ...sx,
      }}
      onClick={() => {
        dispatch("route", { route: name });
      }}
      {...other}
    />
  );
};

const Default = () => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    return addEvent("closeSideBar", () => {
      setOpen(false);
    });
  }, []);

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
          <MyButton name="logo" caption="ok" open={open} sx={{ height: 40 }} />
          <Divider sx={{ my: 1.5 }} />
          <Box defFlex gap={1.5} grow>
            <MyButton name="goods" caption="goods" open={open} />
            <MyButton name="orders" caption="orders" open={open} />
          </Box>
          <Box defFlex>
            <MyButton
              name="close"
              caption="close"
              open={open}
              onClick={leftPanelOpen}
              iconSx={{
                color: "primary.light",
                rotate: open ? "0deg" : "-180deg",
                transition: "rotate 100ms ease-in-out",
              }}
            />
          </Box>
        </Box>
      </Box>
      <Content
        sx={{
          p: 1,
          pt: 1.5,
          boxShadow: "0px 0px 15px 0px rgba(66, 68, 90, 0.47)",
          borderRadius: 4,
        }}
      />
    </Box>
  );
};

const RootDefault = (props) => {
  return <Default {...props} />;
};

export { RootDefault as Dashboard };
