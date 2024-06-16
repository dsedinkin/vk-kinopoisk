import { atom } from "elum-state/react";

export const SNACKBAR = atom<JSX.Element>({
  key: "snackbar",
  default: undefined,
});

export const POPOUT = atom<JSX.Element>({
  key: "popout",
  default: undefined,
});
