import { TextField } from "@mui/material";
import { ButtonIcon } from "../button";
import { memo } from "react";

function areEqual(prev, next) {
  let dontRender;
  dontRender =
    prev.value === next.value &&
    prev.caption === next.caption &&
    prev.onChange === next.onChange &&
    prev.name === next.name &&
    prev.endComponent === next.endComponent &&
    prev.startComponent === next.startComponent &&
    prev.clear === next.clear
      ? true
      : false;
  return dontRender;
}

const Default = memo((props) => {
  const {
    caption,
    variant,
    onChange,
    name,
    value,
    sx,
    startComponent,
    endComponent,
    clear,
    ...other
  } = props;

  other.multiline = other.rows > 0;

  const clearComponent = clear ? (
    <ButtonIcon
      name="clear"
      sxIcon={{ fontSize: 20 }}
      onClick={(e) => {
        if (typeof onChange === "function") onChange(name)(null);
        e.stopPropagation();
      }}
    />
  ) : null;

  return (
    <TextField
      name={name}
      label={caption}
      value={value ?? ""}
      variant={variant ?? "filled"}
      size={"small"}
      onChange={(e) => {
        if (typeof onChange === "function") onChange(name)(e?.target?.value);
      }}
      InputProps={{
        startAdornment: startComponent,
        endAdornment: endComponent ?? clearComponent,
      }}
      sx={{
        "& .MuiInputBase-root": { pr: 0 },
        ...sx,
      }}
      {...other}
    />
  );
}, areEqual);

export { Default as Input };
