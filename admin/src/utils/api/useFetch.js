import useFetch from "use-http";

const useDefault = (url, cachePolicy, headersProps, dependensy, persist) => {
  const headers = headersProps ?? { "Content-Type": "application/json" };

  const { response, ...other } = useFetch(
    url,
    {
      cachePolicy,
      cacheLife: 1000 * 60 * 60,
      persist,
      headers,
      onError: (err) => {
        console.log("use-http error", err);
      },
    },
    dependensy
  );

  return { response, ok: response.ok, ...other };
};
export { useDefault as useFetch };
