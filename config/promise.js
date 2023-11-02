Promise.prototype.defAnswer = function (res, errorCode = 500, errorMessage) {
  return this.then((data) => {
    if (typeof res?.send === "function") {
      res.send(data);
    }
  }).catch((err) => {
    console.log(`\x1b[31mERROR\x1b[0m`, err.message);
    if (typeof res?.status === "function") {
      res.status(errorCode).send(errorMessage ? errorMessage : err.message);
    }
  });
};
