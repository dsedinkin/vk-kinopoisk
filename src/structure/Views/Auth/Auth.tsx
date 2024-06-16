import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { classNames } from "engine/utils";

import { Button, Panel, Placeholder } from "@vkontakte/vkui";

import { Icon56LogoVkColor, Icon24LogoVk } from "@vkontakte/icons";

import "./Auth.css";

interface IAuthProps extends React.HTMLAttributes<HTMLDivElement> {
  nav: string;
}

const Auth: React.FC<IAuthProps> = ({ nav, className, ...restProps }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <Panel
      {...restProps}
      className={classNames("Auth", className)}
      id={nav}
      nav={nav}
    >
      <div className="Auth__content">
        <Placeholder
          className="Placeholder"
          action={
            <Button
              before={<Icon24LogoVk />}
              loading={false}
              onClick={() => routeNavigator.replace("/search")}
              size="l"
              stretched
            >
              Войти через VK ID
            </Button>
          }
          header="VK Kinopoisk"
          icon={<Icon56LogoVkColor />}
          stretched
        >
          Авторизуйтесь с помощью VK ID
        </Placeholder>
      </div>
    </Panel>
  );
};

export default Auth;
