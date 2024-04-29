export const buildQueryString = (params: any) => {
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const arr = queryString.split("");
  arr.unshift("?");

  return arr.join("");
};
