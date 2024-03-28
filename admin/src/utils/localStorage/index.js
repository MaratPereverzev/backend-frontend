const getReadData = (storeName) => {
  let data = {};

  try {
    const readData = localStorage.getItem(storeName);
    if (readData && readData.trim() !== "") {
      data = JSON.parse(readData);
    }
  } catch (err) {
    data = {};
    console.log(err);
  }

  return data;
};

export { getReadData };
