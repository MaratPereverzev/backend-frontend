import { Provider } from "use-http";
import { useRootSetting } from "@context";

const Default = (props) => {
  const { ...other } = props;

  const context = useRootSetting();

  console.log(context);
  return (
    <Provider
      options={{
        onAbort: (...args) => {
          console.log(args);
        },
        interceptors: {
          request: ({ options }) => {
            options.headers["x-server-sacredApp"] = "0.0.1";
            options.headers["authorization"] = "JWT 123.456.789";

            return options;
          },
          response: ({ response }) => {
            if (response.status === 401) {
              console.log("error auth");
            } else if (response.status === 200) {
              console.log("SUCCESS DATA", response?.data);
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
