import {
  useRouteNavigator,
  useFirstPageCheck,
} from "@vkontakte/vk-mini-apps-router";
import { classNames } from "engine/utils";

import { Panel } from "@vkontakte/vkui";
import { Header, Content } from "./fragments";

import "./Favorite.css";

interface IFavoriteProps extends React.HTMLAttributes<HTMLDivElement> {
  nav: string;
}

const Favorite: React.FC<IFavoriteProps> = ({
  nav,
  className,
  ...restProps
}) => {
  const routeNavigator = useRouteNavigator();
  const isFirstPage = useFirstPageCheck();
  const handleBackPage = () =>
    isFirstPage ? routeNavigator.replace("/") : routeNavigator.back();
  return (
    <Panel
      {...restProps}
      className={classNames("Panel Favorite", className)}
      id={nav}
      nav={nav}
    >
      <Header children="Избранное" onClick={handleBackPage} />
      <Content />
    </Panel>
  );
};

export default Favorite;
