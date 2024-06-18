import { useEffect, useMemo, useState } from "react";
import { classNames, isDesktop } from "engine/utils";

import {
  Button,
  Header,
  PanelHeader,
  PanelHeaderBack,
  PanelHeaderContent,
  Platform,
  usePlatform,
} from "@vkontakte/vkui";

import { Icon20ChevronLeftOutline } from "@vkontakte/icons";

import "./CustomPanelHeader.css";

interface ICustomPanelHeader extends React.HTMLAttributes<HTMLDivElement> {
  defaultMode?: "first" | "second" | "third";
  modeDesktop?: boolean;
  subtitle?: string;
}

const CustomPanelHeader: React.FC<ICustomPanelHeader> = ({
  defaultMode,
  modeDesktop,
  onClick,
  subtitle,
  className,
  children,
  ...restProps
}) => {
  const platform = usePlatform();
  const [mode, setMode] = useState("second");

  useEffect(() => {
    setMode(modeDesktop ? (defaultMode ? defaultMode : "second") : "first");
  }, [modeDesktop]);

  const content = useMemo(() => {
    switch (mode) {
      case "first":
        return (
          <PanelHeader
            {...restProps}
            className={classNames("CustomPanelHeader", className)}
            fixed
            before={
              <PanelHeaderBack
                onClick={onClick}
                label={platform === Platform.VKCOM ? "Назад" : undefined}
              />
            }
          >
            <PanelHeaderContent children={children} status={subtitle} />
          </PanelHeader>
        );
      case "second":
        return (
          <div className={classNames("CustomPanelHeader--second", className)}>
            <Header size="large">{children}</Header>
          </div>
        );
      case "third":
        return (
          <div className={classNames("CustomPanelHeader--third", className)}>
            <Button
              before={<Icon20ChevronLeftOutline />}
              appearance="neutral"
              mode="secondary"
              size="l"
              onClick={onClick}
            >
              Вернуться назад
            </Button>
          </div>
        );
      default:
        return <></>;
    }
  }, [mode, platform, children, subtitle]);

  return content;
};

export default CustomPanelHeader;
