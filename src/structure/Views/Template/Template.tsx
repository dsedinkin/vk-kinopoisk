import {
  useRouteNavigator,
  useFirstPageCheck,
} from "@vkontakte/vk-mini-apps-router";
import { classNames } from "engine/utils";

import { Panel } from "@vkontakte/vkui";
import { Header, Content } from "./fragments";

import "./Template.css";

interface ITemplateProps extends React.HTMLAttributes<HTMLDivElement> {
  nav: string;
}

const Template: React.FC<ITemplateProps> = ({
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
      className={classNames("Panel Template", className)}
      id={nav}
      nav={nav}
    >
      <Header children="Template" onClick={handleBackPage} />
      <Content />
    </Panel>
  );
};

export default Template;
