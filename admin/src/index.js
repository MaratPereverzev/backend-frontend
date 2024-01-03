import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Text, Button, Box } from "@components";
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Box defFlex>
      <Button caption="Button">
        <Text caption="Hello"></Text>
      </Button>
    </Box>
  </StrictMode>
);
