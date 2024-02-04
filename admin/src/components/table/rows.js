import { Divider, Box } from "@mui/material";
import { ViewportList } from "react-viewport-list";
import { useRef } from "react";
import Row from "./row";

const Default = (props) => {
  const { items, name, onRenderItem, langBase } = props;

  const ref = useRef(null);

  if (!Array.isArray(items) || !items.length > 0) return null;

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        willChange: "transform",
      }}
    >
      <ViewportList items={items} viewportRef={ref} overscan={5}>
        {(item, index, arr) => {
          return (
            <Box defFlex grow row key={item?.id ?? index}>
              <Row
                item={item}
                name={name}
                onRenderItem={onRenderItem}
                langBase={langBase}
              />
              {arr.length - 1 !== index && (
                <Divider variant="middle" flexItem />
              )}
            </Box>
          );
        }}
      </ViewportList>
    </div>
  );
};

export default Default;
