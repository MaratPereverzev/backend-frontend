import { Input } from "../searchBar";
import { Box } from "../box";
import { useState } from "react";
import { Pagination, Divider, Stack } from "@mui/material";

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
  return (
    <Box name="table" defFlex gap sx={{ width: "100%", height: "100%" }}>
      <Box
        defFlex
        gap
        row
        name="header"
        sx={{ width: "100%" /*, boxSizing: "border-box", p: 1 */ }}
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
        />
        {topButtons}
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
              {item?.caption}
            </Box>
          ))}
        </Stack>
      </Box>
      <Divider variant="middle" flexItem />
      <Box defFlex jc="space-between" row name="footer">
        <Pagination count={10} hidePrevButton hideNextButton />
        {bottomButtons}
      </Box>
    </Box>
  );
};

export { Default as Table };
