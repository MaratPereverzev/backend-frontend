import { Box, Divider, MenuButton, Text, Icon } from "@components";
import { useState, useEffect, useCallback } from "react";

const MyButton = (props) => {
  const { name, open, ...other } = props;

  return (
    <MenuButton
      color="inherit"
      caption={
        <>
          <Icon name={name} />
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
const Default = () => {
  const [open, setOpen] = useState(true);

  const leftPanelOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    localStorage.setItem("leftPane", open);
  }, [open]);

  return (
    <Box defFlex row grow>
      <Box
        defFlex
        gap
        sx={{
          width: open ? 200 : 54,
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
            <MyButton name="home" open={open} />
            <MyButton name="portfolio" open={open} />
          </Box>
          <Box defFlex>
            <MyButton
              name={open ? "close" : "open"}
              open={open}
              onClick={leftPanelOpen}
            />
          </Box>
        </Box>
      </Box>
      <Box grow />
    </Box>
  );
};

export { Default as Dashboard };
