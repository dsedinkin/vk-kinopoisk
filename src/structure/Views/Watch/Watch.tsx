import {
  useRouteNavigator,
  useFirstPageCheck,
} from "@vkontakte/vk-mini-apps-router";
import { classNames } from "engine/utils";

import { Panel } from "@vkontakte/vkui";
import { Header, Content } from "./fragments";

import "./Watch.css";

interface IWatchProps extends React.HTMLAttributes<HTMLDivElement> {
  nav: string;
}

const Watch: React.FC<IWatchProps> = ({ nav, className, ...restProps }) => {
  const routeNavigator = useRouteNavigator();
  const isFirstPage = useFirstPageCheck();
  const handleBackPage = () =>
    isFirstPage ? routeNavigator.replace("/") : routeNavigator.back();
  return (
    <Panel
      {...restProps}
      className={classNames("Panel Watch", className)}
      id={nav}
      nav={nav}
    >
      <Header children="Watch" onClick={handleBackPage} defaultMode="third" />
      <Content />
    </Panel>
  );
};

export default Watch;
