function isObject(object) {
  return object !== null && Object.isObject(object);
}

function areEqualObject(prev, next) {
  const keys1 = Object.keys(prev);
  const keys2 = Object.keys(next);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    const val1 = prev[key];
    const val2 = next[key];
    const areObjects = isObject(val1) && isObject(val2);

    if (
      (areObjects && !areEqualObject(val1, val2)) ||
      (!areObjects && val1 !== val2)
    )
      return false;
  }
  return true;
}

function areEqualAlways(prev, next) {
  return true;
}

export { isObject, areEqualObject, areEqualAlways };
