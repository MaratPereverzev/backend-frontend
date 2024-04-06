import { useCallback, useState } from "react";
import { buildGet, useFetch } from "@utils";

const baseUrl = `api/private/auth`;

const useAuth = () => {
  const { response, loading, get, abort } = useFetch("/api/auth");

  return [
    useCallback(
      (data, setData) => {
        get(buildGet(data)).then((data) => {
          setData(response?.ok ? data : null);
        });
      },
      [get, response]
    ),
    loading,
    abort,
  ];
};
const useGet = (limit) => {
  const [rows, setRows] = useState(null);
  const { loading, get } = useFetch(baseUrl);

  return [
    useCallback(
      (data) => {
        const { page } = data ?? {};
        const params = { limit, skip: page * limit };

        get(buildGet(params)).then((newData) => {
          if (newData) {
            newData.totalPage = Math.ceil(newData.total / limit);
          }
          setRows(newData);
        });
      },
      [limit, get]
    ),
    loading,
    rows,
  ];
};

const useGetById = () => {
  const { response, loading, get } = useFetch(baseUrl);

  return [
    useCallback(
      (data, setData) => {
        get("/" + data?.id).then((data) => {
          setData(response?.ok ? data : null);
        });
      },
      [get, response]
    ),
    loading,
  ];
};

const useUpdate = () => {};

const usePost = () => {};

const useDel = () => {};

export {
  useAuth,
  useGet as useUserGet,
  useGetById as useUserGetById,
  //useGetAll as useUserGetAll,
  useUpdate as useUserUpdate,
  usePost as useUserPost,
  useDel as useUserDelete,
};
