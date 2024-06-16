import { classNames } from "engine/utils";

import { Placeholder, Button, Spinner } from "@vkontakte/vkui";

import { Icon56ErrorOutline } from "@vkontakte/icons";

import "./ContentLoading.css";

interface IContentLoading extends React.HTMLAttributes<HTMLDivElement> {
  error?: boolean;
  loading: boolean;
  onRefresh?: () => void;
}

const ContentLoading: React.FC<IContentLoading> = ({
  error,
  loading,
  onRefresh,
  children,
  className,
  ...restProps
}) => {
  return (
    <div {...restProps} className={classNames("ContentLoading", className)}>
      {error ? (
        <Placeholder
          action={<Button onClick={onRefresh}>Перезагрузить страницу</Button>}
          header="Ошибка загрузки"
          icon={<Icon56ErrorOutline color="var(--vkui--color_icon_negative)" />}
          stretched
        >
          Произошла ошибка. Перезагрузите страницу.
        </Placeholder>
      ) : loading ? (
        <Placeholder icon={<Spinner size="medium" />} stretched />
      ) : (
        children
      )}
    </div>
  );
};

export default ContentLoading;
