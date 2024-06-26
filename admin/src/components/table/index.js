import { Input } from "../input";
import { Box } from "../box";
import Footer from "./footer";
import Rows from "./rows";
import { useState, memo } from "react";
import { Divider, Stack } from "@mui/material";
import { TableContext } from "@context/table";

function areEqual(prev, next) {
  let dontRender = true;

  for (let item of Object.keys(prev)) {
    if (prev[item]?.type) continue;

    let tempPrev =
      typeof prev[item] === "object" ? JSON.stringify(prev[item]) : prev[item];
    let tempNext =
      typeof next[item] === "object" ? JSON.stringify(next[item]) : next[item];

    if (tempPrev !== tempNext) {
      dontRender = false;
      break;
    }
  }

  return dontRender;
}
const defStyle = { sxIcon: { fontSize: 25 } };

const Default = (props) => {
  const {
    name,
    items,
    topButtons,
    onSearch,
    sx,
    sxHeader,
    sxContent,
    sxFooter,
    onChangePage,
    onRenderItem,
    langBase,
    loading,
  } = props;

  const [search, setSearch] = useState("");

  return (
    <Box name="table" defFlex gap sx={{ width: "100%", height: "100%", ...sx }}>
      <Box
        defFlex
        gap
        row
        name="header"
        ai
        sx={{ width: "100%", boxSizing: "border-box", p: 0.5, ...sxHeader }}
      >
        <Input
          size="small"
          value={search ?? ""}
          label="search prompt"
          sx={{ "& fieldset": { borderTopLeftRadius: 10 }, flexGrow: 1 }}
          onChange={() => setSearch}
          onKeyUp={(e) => {
            if (e.keyChar === 13 && typeof onSearch === "function") {
              onSearch();
            }
          }}
          variant="filled"
          clear
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
            topButtons.props.children.map((child, index) => {
              if (typeof chlid === "function") return child(defStyle);
              // в .type хранится сама компонента
              return (
                <child.type
                  key={child?.id ?? index}
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
      <Box defFlex gap grow name="content" sx={{ height: "1px", ...sxContent }}>
        <Rows
          items={items}
          name={name}
          onRenderItem={onRenderItem}
          langBase={langBase}
          loading={loading}
        />
      </Box>
      <Divider variant="middle" flexItem />
      <Footer sxFooter={sxFooter} name={name} onChangePage={onChangePage} />
    </Box>
  );
};

const ContextTable = memo((props) => {
  return (
    <TableContext>
      <Default {...props} />
    </TableContext>
  );
}, areEqual);

export { ContextTable as Table };
