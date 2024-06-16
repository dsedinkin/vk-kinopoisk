import { classNames } from "engine/utils";

import { Snackbar, SnackbarProps } from "@vkontakte/vkui";

import {
  Icon28CheckCircleOutline,
  Icon28ErrorCircleOutline,
} from "@vkontakte/icons";

import "./CustomSnackbar.css";

interface ICustomSnackbar extends SnackbarProps {
  appearance: "positive" | "negative";
  text: string;
}

const CustomSnackbar: React.FC<ICustomSnackbar> = ({
  appearance,
  text,
  className,
  ...restProps
}) => {
  return (
    <Snackbar
      {...restProps}
      className={classNames("CustomSnackbar", className)}
      before={
        appearance === "positive" ? (
          <Icon28CheckCircleOutline fill="var(--vkui--color_icon_positive)" />
        ) : appearance === "negative" ? (
          <Icon28ErrorCircleOutline fill="var(--vkui--color_icon_negative)" />
        ) : undefined
      }
    >
      {text}
    </Snackbar>
  );
};

export default CustomSnackbar;
