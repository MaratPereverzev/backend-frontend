function capitalizeFirstLetterWithoutIndex(string) {
  if (string === "index") {
    return "";
  }
  return string[0].toUpperCase() + string.slice(1);
}

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

const loader = (name, obj) => {
  if (
    typeof name === "string" &&
    typeof obj === "object" &&
    !Array.isArray(obj)
  ) {
    return Object.keys(obj).reduce((prev, item) => {
      prev[`${name}${capitalizeFirstLetter(item)}`] = obj[item];
      return prev;
    }, {});
  }
  return {};
};

module.exports = { loader, capitalizeFirstLetterWithoutIndex };
