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
