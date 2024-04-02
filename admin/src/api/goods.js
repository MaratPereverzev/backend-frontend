import { useCallback, useState } from "react";
import { buildGet, useFetch } from "@utils";

const baseUrl = `https://dummyjson.com/products`;

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
  useGet as useGoodsGet,
  useGetById as useGoodGetById,
  //useGetAll as useGoodsGetAll,
  useUpdate as useGoodsUpdate,
  usePost as useGoodsPost,
  useDel as useGoodsDelete,
};
