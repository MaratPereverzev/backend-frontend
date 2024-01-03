import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Dashboard } from "./dashboard";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Dashboard />
  </StrictMode>
);
