import { createContext, useContext } from "react";
const context = createContext(null);

const useTable = useContext(context);

class TableStore {
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

const Context = (props) => {
  return (
    <context.Provider
      value={new TableStore()}
      name="TABLE CONTEXT"
      {...props}
    />
  );
};

export { Context as TableContext, useTable };
