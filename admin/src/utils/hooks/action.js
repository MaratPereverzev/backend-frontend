import { useCallback, useEffect } from "react";
import { getReadData } from "../localStorage";

const useAction = (setData, onChange) => {
  return useCallback(
    (name) => (value) => {
      setData((prev) => {
        if (!prev) {
          prev = {};
        }
        if (typeof onChange === "function") {
          prev[name] = onChange(name, value, prev);
        } else {
          prev[name] = value;
        }
        return { ...prev };
      });
    },
    [setData, onChange]
  );
};

const useActionDialog = (setDialogData, storeName, itemsStore) => {
  useEffect(() => {
    let oldData = getReadData(storeName);

    const newData = Object.keys(oldData).reduce((prev, item) => {
      if (itemsStore.includes(item)) {
        prev[item] = oldData[item];
      }
      return prev;
    }, {});

    if (Object.keys(oldData).length > 0) {
      setDialogData((prev) => ({ ...newData, ...prev }));
    }
  }, [itemsStore, storeName, setDialogData]);

  const store = useCallback(
    (name, value, prev) => {
      if (Array.isArray(itemsStore) && storeName) {
        let oldData = getReadData(storeName);

        //oldData[name] = value;
        itemsStore.forEach((item) => {
          if (name === item) {
            oldData[item] = value;
          }
        });

        localStorage.setItem(storeName, JSON.stringify(oldData));
      }

      return value;
    },
    [storeName, itemsStore]
  );
  return useAction(setDialogData, store);
};

export { useAction, useActionDialog };
