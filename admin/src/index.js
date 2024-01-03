import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Button, Typography } from "@mui/material";
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <div id="FIRST ELEMENT" />
    <input />
    <Button variant="contained" color="warning">
      <Typography variant="h6">Marat</Typography>
    </Button>
  </StrictMode>
);
