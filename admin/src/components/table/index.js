import { Input } from "../searchBar";
import { Box } from "../box";
import { useState } from "react";
import { Pagination, Divider, Stack, Checkbox } from "@mui/material";

const defStyle = { sxIcon: { fontSize: 20 } };
const Default = (props) => {
  const {
    items,
    bottomButtons,
    topButtons,
    onSearch,
    /*
    sx,
    sxHeader,
    sxContent,
    sxFooter,
    */
  } = props;
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState([]);

  return (
    <Box name="table" defFlex gap sx={{ width: "100%", height: "100%" }}>
      <Box
        defFlex
        gap
        row
        name="header"
        sx={{ width: "100%", boxSizing: "border-box", p: 0.5 }}
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
        sx={{ height: "1px", overflowY: "scroll" }}
      >
        <Stack divider={<Divider variant="middle" flexItem />}>
          {items?.map((item, index) => (
            <Box key={item?.id ?? index} sx={{ p: 1 }}>
              <Checkbox
                checked={!!checked.find((checked) => checked.id === item?.id)}
                size="small"
                onChange={({ target }) => {
                  if (target.checked) {
                    setChecked((prev) => {
                      prev.push({ id: item?.id });
                      return [...prev];
                    });
                  } else {
                    setChecked((prev) =>
                      prev.filter((checked) => checked.id !== item?.id)
                    );
                  }
                }}
              />
              {item?.caption}
            </Box>
          ))}
        </Stack>
      </Box>
      <Divider variant="middle" flexItem />
      <Box defFlex jc="space-between" row name="footer">
        {bottomButtons}
        <Pagination count={10} hidePrevButton hideNextButton />
      </Box>
    </Box>
  );
};

export { Default as Table };
