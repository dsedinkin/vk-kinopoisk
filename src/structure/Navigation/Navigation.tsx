import {
  useRouteNavigator,
  useActiveVkuiLocation,
} from "@vkontakte/vk-mini-apps-router";
import { classNames } from "engine/utils";

import { DEFAULT_VIEW } from "engine/state";

import { Spacing } from "@vkontakte/vkui";
import { Icon28SearchOutline, Icon28FavoriteOutline } from "@vkontakte/icons";

import { CustomCell } from "./fragments";

import "./Navigation.css";

interface INavigationProps extends React.HTMLAttributes<HTMLDivElement> {}

const Navigation: React.FC<INavigationProps> = ({
  className,
  ...restProps
}) => {
  const routeNavigator = useRouteNavigator();
  const { view: activeView = DEFAULT_VIEW.auth } = useActiveVkuiLocation();

  return (
    <div {...restProps} className={classNames("Navigation", className)}>
      <CustomCell
        before={Icon28SearchOutline}
        id="view-search"
        open={activeView === "view-search"}
        setOpen={() => routeNavigator.replace("/search")}
        title="Поиск"
      />
      <Spacing size={4} />
      <CustomCell
        before={Icon28FavoriteOutline}
        id="view-favorite"
        open={activeView === "view-favorite"}
        setOpen={() => routeNavigator.replace("/favorite")}
        title="Избранное"
      />
    </div>
  );
};

export default Navigation;
