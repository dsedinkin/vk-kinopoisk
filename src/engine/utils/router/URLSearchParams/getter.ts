export type TGetter = (params: URLSearchParams) => (key: string) => string;

export const getter: TGetter = (params) => (key) => {
  if (key && typeof key === "string") {
    return params?.get(key) || "";
  };
  return "";
};
