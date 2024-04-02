const getPageHash = () => window.location.hash.replace("#", "");
const setPageHash = (value) => (window.location.hash = value);

export { getPageHash, setPageHash };
