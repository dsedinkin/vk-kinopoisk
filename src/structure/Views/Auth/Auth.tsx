import { useRef } from "react";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { useLocalStorageState } from "engine/hooks";
import { classNames } from "engine/utils";

import {
  Button,
  Panel,
  Placeholder,
  Input,
  Link,
  FormItem,
} from "@vkontakte/vkui";

import { Icon56LogoVk } from "@vkontakte/icons";

import "./Auth.css";

interface IAuthProps extends React.HTMLAttributes<HTMLDivElement> {
  nav: string;
}

const Auth: React.FC<IAuthProps> = ({ nav, className, ...restProps }) => {
  const routeNavigator = useRouteNavigator();

  const [accessToken, setAccessToken] = useLocalStorageState(
    "ACCESS_TOKEN",
    ""
  );
  const inputTextRef = useRef();

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
              disabled={accessToken?.length === 0}
              onClick={() => routeNavigator.replace("/search")}
              size="l"
              stretched
            >
              Продолжить
            </Button>
          }
          icon={<Icon56LogoVk color="var(--vkui--color_icon_accent)" />}
          header="VK Kinopoisk"
          stretched
        >
          <FormItem
            bottom={
              <>
                Для корректной работы, необходимо добавить токен с{" "}
                <Link href="https://kinopoisk.dev/" target="_blank">
                  kinopoisk.dev
                </Link>
              </>
            }
          >
            <Input
              defaultValue={accessToken}
              getRef={inputTextRef as any}
              onChange={(e) => setAccessToken(e.target.value)}
              placeholder="XXXXXXX-XXXXXX-XXXXXXX-XXXXXXX"
              type="text"
            />
          </FormItem>
        </Placeholder>
      </div>
    </Panel>
  );
};

export default Auth;
