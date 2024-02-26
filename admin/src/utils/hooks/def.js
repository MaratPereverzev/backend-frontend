const useDef = (data, onChange) => (name) => {
  return {
    name: name,
    caption: name,
    onChange: onChange,
    value: data?.[name],
    clear: true,
  };
};

export { useDef };
