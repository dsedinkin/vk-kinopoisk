import {
  useRouteNavigator,
  useFirstPageCheck,
} from "@vkontakte/vk-mini-apps-router";
import { classNames } from "engine/utils";

import { Panel } from "@vkontakte/vkui";
import { CustomPanelHeader as Header } from "engine/components";
import { SearchContent as Content } from "engine/fragments";

import "./Search.css";

interface ISearchProps extends React.HTMLAttributes<HTMLDivElement> {
  nav: string;
  scrollTop: () => void;
}

const Search: React.FC<ISearchProps> = ({
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
      className={classNames("Panel Search", className)}
      id={nav}
      nav={nav}
    >
      <Header children="Поиск" onClick={handleBackPage} />
      <Content mode="search" scrollTop={scrollTop} />
    </Panel>
  );
};

export default Search;
