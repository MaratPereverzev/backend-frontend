const addEvent = (eventName, event) => {
  const localEvent = (data) => {
    event(data);
  };

  document.addEventListener(eventName, localEvent);

  return () => {
    document.removeEventListener(eventName, localEvent);
  };
};

const dispatch = (eventName, data) => {
  const event = new CustomEvent(eventName, { bubbles: true, detail: data });
  document.dispatchEvent(event);
};

module.exports = { addEvent, dispatch };
