const buildGet = (params) => {
  const req = Object.keys(params).map((item) => `${item}=${params[item]}`);

  return `?${req.join("&")}`;
};

export { buildGet };
