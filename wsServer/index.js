const expressWs = require("express-ws");
const { jwtVal } = require("@utils");

module.exports = (app) => {
  expressWs(app, undefined, {
    wsOptions: {
      verifyClient: (data, next) => {
        const search = new URLSearchParams(data.req.url.split("?")[1]);
        next(jwtVal(search.get("token")));
      },
    },
  });

  app.ws("/ws/user", (ws) => {
    let isActive = true;

    ws.on("message", (data) => {
      process.myEvents.emit("webSocketData", {
        data: data,
        send: (sendData) => {
          ws.send(sendData);
        },
      });
    });
    ws.on("close", (...args) => {
      isActive = false;
      console.log("client left the conversation");
    });
  });
};
