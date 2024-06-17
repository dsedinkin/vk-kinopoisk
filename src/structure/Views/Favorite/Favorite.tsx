import {
  useRouteNavigator,
  useFirstPageCheck,
} from "@vkontakte/vk-mini-apps-router";
import { classNames } from "engine/utils";

import { Panel } from "@vkontakte/vkui";
import { CustomPanelHeader as Header } from "engine/components";
import { SearchContent as Content } from "engine/fragments";

import "./Favorite.css";

interface IFavoriteProps extends React.HTMLAttributes<HTMLDivElement> {
  nav: string;
  scrollTop: () => void;
}

const Favorite: React.FC<IFavoriteProps> = ({
  nav,
  scrollTop,
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
      <Content mode="favorites" scrollTop={scrollTop} />
    </Panel>
  );
};

export default Favorite;
