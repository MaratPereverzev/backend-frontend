const { MyEvents } = require("@class");

const myEvents = new MyEvents();

myEvents.on("marat", (userData) => {
  console.log(userData);
});
myEvents.on("webSocketData", (props) => {
  const { data, send } = props;
  send("pong: " + data);
});

process.myEvents = myEvents;
