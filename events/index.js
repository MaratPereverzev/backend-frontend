const { MyEvents } = require("@class");

const myEvents = new MyEvents();

myEvents.on("marat", (userData) => {
  console.log(userData);
});

process.myEvents = myEvents;
