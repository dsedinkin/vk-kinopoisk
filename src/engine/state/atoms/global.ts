import { atom } from "elum-state/react";

export const SNACKBAR = atom<JSX.Element>({
  key: "snackbar",
  default: undefined,
});

export const POPOUT = atom<JSX.Element>({
  key: "popout",
  default: undefined,
});

export const SELECTED_FILTERS = atom<Record<string, any>>({
  key: "selectedFilters",
  default: {
    page: 1,
    selectedGenres: [],
    selectedRatingMin: "",
    selectedRatingMax: "",
    selectedYearMin: "",
    selectedYearMax: ""
  }
});
