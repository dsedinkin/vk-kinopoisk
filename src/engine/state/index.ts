export * from "./atoms";

// Router.

export const DEFAULT_VIEW = {
  auth: "view-auth",
  error: "view-error",
  favorite: "view-favorite",
  search: "view-search",
  watch: "view-watch",
};

export const DEFAULT_PANELS = {
  auth: {
    DEFAULT_PANEL: "panel-auth",
  },
  error: {
    DEFAULT_PANEL: "panel-error",
  },
  favorite: {
    DEFAULT_PANEL: "panel-favorite",
  },
  search: {
    DEFAULT_PANEL: "panel-search",
  },
  watch: {
    DEFAULT_PANEL: "panel-watch"
  }
};
