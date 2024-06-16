import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { classNames } from "engine/utils";

import { Panel, Placeholder, Button } from "@vkontakte/vkui";

import { Icon56GlobeCrossOutline } from "@vkontakte/icons";

import "./Error.css";

interface IErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  nav: string;
}

const Error: React.FC<IErrorProps> = ({ nav, className, ...restProps }) => {
  const routeNavigator = useRouteNavigator();

  const backPage = () => routeNavigator.replace("/");

  return (
    <Panel
      {...restProps}
      className={classNames("Error", className)}
      id={nav}
      nav={nav}
    >
      <Placeholder
        action={
          <Button size="m" onClick={backPage}>
            На главную
          </Button>
        }
        header="Страница 404"
        icon={<Icon56GlobeCrossOutline />}
        stretched
        style={{ background: "var(--vkui--color_background_content)" }}
      >
        Возможно, запрашиваемая Вами страница была перенесена или удалена. Также
        возможно, Вы допустили небольшую опечатку при вводе адреса – такое
        случается даже с нами
      </Placeholder>
    </Panel>
  );
};

export default Error;
