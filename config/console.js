const oldLog = console.log;

console.log = function (...args) {
  oldLog(new Date(), ...args);
};
