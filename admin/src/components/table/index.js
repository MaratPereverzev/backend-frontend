import { Input } from "../searchBar";
import { Box } from "../box";
import Rows from "./rows";
import { useState } from "react";
import { Pagination, Divider, Stack } from "@mui/material";

const defStyle = { sxIcon: { fontSize: 20 } };

const Default = (props) => {
  const {
    items,
    bottomButtons,
    topButtons,
    onSearch,
    sx,
    sxHeader,
    sxContent,
    sxFooter,
  } = props;

  const [search, setSearch] = useState("");

  return (
    <Box name="table" defFlex gap sx={{ width: "100%", height: "100%", ...sx }}>
      <Box
        defFlex
        gap
        row
        name="header"
        sx={{ width: "100%", boxSizing: "border-box", p: 0.5, ...sxHeader }}
      >
        <Input
          size="small"
          label="search prompt"
          sx={{ "& fieldset": { borderTopLeftRadius: 10 }, flexGrow: 1 }}
          onChange={({ target }) => {
            setSearch(target.value);
          }}
          onKeyUp={(e) => {
            if (e.keyChar === 13 && typeof onSearch === "function") {
              console.log(search);
              onSearch();
            }
          }}
          variant="filled"
        />
        <Stack
          direction="row"
          spacing={0.5}
          divider={<Divider orientation="vertical" variant="middle" flexItem />}
        >
          {typeof topButtons === "function" ? (
            topButtons(defStyle)
          ) : typeof topButtons.props.children === "function" ? (
            topButtons.props.children(defStyle)
          ) : Array.isArray(topButtons.props.children) ? (
            topButtons.props.children.map((child) => {
              if (typeof chlid === "function") return child(defStyle);
              // в .type хранится сама компонента
              return (
                <child.type
                  {...child.props}
                  sxIcon={{
                    ...child.props.sxIcon,
                    ...defStyle.sxIcon,
                  }}
                />
              );
            })
          ) : (
            <topButtons.type
              {...topButtons.props}
              sxIcon={{ ...topButtons.props.sxIcon, ...defStyle.sxIcon }}
            />
          )}
        </Stack>
      </Box>
      <Box
        defFlex
        gap
        grow
        name="content"
        sx={{ height: "1px", overflowY: "scroll", ...sxContent }}
      >
        <Rows items={items} />
      </Box>
      <Divider variant="middle" flexItem />
      <Box defFlex jc="space-between" row name="footer" sx={{ ...sxFooter }}>
        {bottomButtons}
        <Pagination count={10} hidePrevButton hideNextButton />
      </Box>
    </Box>
  );
};

export { Default as Table };
