import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Dashboard } from "./dashboard";
import { FetchProvider } from "./provider";
import { RootSettingContext } from "./context";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <RootSettingContext>
      <FetchProvider>
        <Dashboard />
      </FetchProvider>
    </RootSettingContext>
  </StrictMode>
);
