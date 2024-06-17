import { setter } from "elum-state/react";
import { SNACKBAR } from "engine/state";

import { CustomSnackbar } from "engine/components";

export const setSnackbar = (message: any) => {
  setter(
    SNACKBAR,
    <CustomSnackbar
      text={message?.text}
      appearance={message?.is_error ? "negative" : "positive"}
      onClose={() => setter(SNACKBAR, undefined)}
    />
  );
};

export const copyText = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      setSnackbar({
        is_error: false,
        text: "Скопировано",
      });
    })
    .catch(() => {
      setSnackbar({
        is_error: true,
        text: "Не удалось скопировать",
      });
    });
};

export const storage = {
  get: (key: string) => localStorage?.getItem(key),
  set: (key: string, value: string) => localStorage?.setItem(key, value),
};

export const getFavorites = () =>
  storage
    .get("FAVORITES")
    ?.split(",")
    ?.filter((value) => value && value) || [];

export const isFavorites = (id: string) => {
  const idString = String(id);
  const prevState = getFavorites();
  const index = prevState?.indexOf(idString);
  return index !== -1;
};

export const setFavorites = (id: string) => {
  const idString = String(id);
  const prevState = getFavorites();
  const index = prevState?.indexOf(idString);
  if (index !== -1) {
    delete prevState[index];
    setSnackbar({
      is_error: false,
      text: "Удалено из избранного",
    });
  } else {
    prevState.push(idString);
    setSnackbar({
      is_error: false,
      text: "Добавлено в избранное",
    });
  }
  storage.set(
    "FAVORITES",
    prevState?.filter((value) => value && value)?.join(",")
  );
};
