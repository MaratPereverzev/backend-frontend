const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware("/api", {
      target: "http://localhost:8080",
    })
  );
  app.use(
    "/test_ws",
    createProxyMiddleware("/test_ws", {
      target: "ws://localhost:8080",
      ws: true,
    })
  );
};
