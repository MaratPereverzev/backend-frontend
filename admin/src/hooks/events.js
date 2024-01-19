const addEvent = (eventName, event, field = document, ...args) => {
  const localEvent = (data) => {
    event(data);
  };

  field.addEventListener(eventName, localEvent, ...args);

  return () => {
    field.removeEventListener(eventName, localEvent);
  };
};

const dispatch = (eventName, data) => {
  const event = new CustomEvent(eventName, { bubbles: true, detail: data });
  document.dispatchEvent(event);
};

module.exports = { addEvent, dispatch };
