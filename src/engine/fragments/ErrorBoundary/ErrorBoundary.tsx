import { useState } from "react";
import { ErrorBoundary as ReactErrorBoundary, FallbackProps, ErrorBoundaryProps } from "react-error-boundary";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

import { Placeholder, ButtonGroup, Button } from "@vkontakte/vkui";

import { Icon56ReportOutline } from "@vkontakte/icons";

import "./ErrorBoundary.css";

const Fallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const routeNavigator = useRouteNavigator();
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      resetErrorBoundary();
      routeNavigator.replace("/");
    }, 500);
  };
  return (
    <Placeholder
      action={
        <ButtonGroup mode="vertical" align="center">
          <Button
            loading={loading}
            onClick={handleClick}
            size="m"
          >
            Пробовать снова
          </Button>
          <Button
            Component="a"
            href={`https://vk.com/public1`}
            mode="tertiary"
            size="m"
            target="_blank"
          >
            Поддержка
          </Button>
        </ButtonGroup>
      }
      header="Что-то пошло не так"
      icon={<Icon56ReportOutline />}
      stretched
      style={{ background: "var(--vkui--color_background_content)" }}
    >
      {error?.message || "Повторите попытку позже. Если вы по-прежнему сталкиваетесь с этой ошибкой, пожалуйста, свяжитесь с поддержкой в сообществе приложения"}
    </Placeholder>
  );
};

interface IErrorBoundaryProps extends React.HTMLAttributes<ErrorBoundaryProps> {

};

const ErrorBoundary: React.FC<IErrorBoundaryProps> = ({
  children
}) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={Fallback}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
