import {} from "react";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { classNames } from "engine/utils";

import {} from "@vkontakte/vkui";

import "./Content.css";

interface IContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const Content: React.FC<IContentProps> = ({ className, ...restProps }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <div {...restProps} className={classNames("Content Group", className)}>
      <div className="Group__content"></div>
    </div>
  );
};

export default Content;
