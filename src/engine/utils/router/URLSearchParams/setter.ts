import { SetURLSearchParams } from "@vkontakte/vk-mini-apps-router/dist/hooks/useSearchParams";

export type TSetter = (params: URLSearchParams, setParams: SetURLSearchParams) => (data: Object) => void;

export const setter: TSetter = (params, setParams) => (data) => {
  if (data && typeof data === "object") {
    for (const [key, value] of Object.entries(data)) {
      if (value && value !== "0") {
        params?.set(key, value);
      } else {
        params?.delete(key);
      };
    };
    setParams(params, { replace: true });
  };
};
