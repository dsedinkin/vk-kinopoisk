import { classNames } from "engine/utils";

import { ScreenSpinner } from "@vkontakte/vkui";

import "./Loading.css";

interface ILoading extends React.HTMLAttributes<HTMLDivElement> { };

const Loading: React.FC<ILoading> = ({
  className,
  ...restProps
}) => {
  return (
    <ScreenSpinner
      {...restProps}
      className={classNames("Loading", className)}
      state="loading"
    />
  );
};

export default Loading;
