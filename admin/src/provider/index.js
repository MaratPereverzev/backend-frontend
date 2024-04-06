import { Provider } from "use-http";
import { useRootSetting } from "@context";

const Default = (props) => {
  const { ...other } = props;

  const context = useRootSetting();

  return (
    <Provider
      options={{
        onAbort: (...args) => {
          console.log(args);
        },
        interceptors: {
          request: ({ options }) => {
            options.headers["x-server-sacredApp"] = "0.0.1";
            options.headers["authorization"] =
              localStorage.getItem("token") ?? "";

            return options;
          },
          response: ({ response }) => {
            if (response.status === 401) {
              localStorage.removeItem("token");
              context.userAuth = false;
            }

            return response;
          },
        },
      }}
      {...other}
    />
  );
};

export { Default as FetchProvider };
