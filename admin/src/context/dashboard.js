import { createContext, useContext } from "react";

class DashboardStore {
  constructor() {
    this._token = value;
  }

  get token() {
    return this._token;
  }
  set token(value) {
    this._token = value;
  }
}

const context = createContext(null);

const useDashboard = useContext(context);

const Context = () => {
  <context.Provider
    value={new DashboardStore()}
    name="DASHBOARD CONTEXT"
    {...props}
  />;
};

export { Context as DashboardContext, useDashboard };
