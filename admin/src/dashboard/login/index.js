import { Box, Button, Input, Text } from "@components";
import { useState } from "react";
import { useAction } from "@utils";
import { useAuth } from "../../api";
import { useRootSetting } from "@context";

const Default = (props) => {
  const [data, setData] = useState(null);

  const [callbackAuth, loading] = useAuth();
  const context = useRootSetting();
  const handleOnChange = useAction(setData);

  const handleOnAuth = () => {
    callbackAuth(data, (data) => {
      if (data?.accessToken) {
        context.userAuth = true;
        localStorage.setItem("token", data.accessToken);
      }
    });
  };

  const def = (name) => ({
    name,
    caption: name,
    onChange: handleOnChange,
    value: data?.[name],
  });

  return (
    <Box
      defFlex
      grow
      center
      sx={{
        background: "url(/res/img/background_login.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        defFlex
        gap
        sx={{
          py: 2,
          px: 3,
          borderRadius: 2,
          boxShadow: (theme) => theme.shadows[15],
          border: ({ palette }) => `1px solid ${palette.divider}`,
          width: "35vw",
          minWidth: "150px",
          backdropFilter: "blur(10px)",
        }}
      >
        <Box defFlex center>
          <img src="/res/img/logo.png" alt="logo" width={250} />
        </Box>
        <Input {...def("login")} disabled={loading} clear />
        <Input {...def("password")} type="password" disabled={loading} clear />
        <Box defFlex row gap jc="space-between" ai>
          <Text
            caption="v0.1"
            sx={{ fontSize: 13, color: "text.secondary" }}
          ></Text>
          <Button
            color="secondary"
            caption="Войти"
            sx={{ width: "35%" }}
            sxText={{ fontSize: 13 }}
            disabled={!(data?.login && data?.password) || loading}
            onClick={handleOnAuth}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Default;
