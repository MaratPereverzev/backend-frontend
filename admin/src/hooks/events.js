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

const dispatchDialogEdit = (langBase, data, field = document) => {
  dispatch(`${langBase}.dialog.edit`, data, field);
};

const dispatchDialogDelete = (langBase, data, field = document) => {
  dispatch(`${langBase}.dialog.delete`, data, field);
};

module.exports = {
  addEvent,
  dispatch,
  dispatchDialogEdit,
  dispatchDialogDelete,
};
