import { classNames } from "engine/utils";

import {
  usePlatform,
  Platform,
  useAdaptivityConditionalRender,
  ModalPageHeader,
  PanelHeaderContent,
  PanelHeaderClose,
  PanelHeaderButton,
} from "@vkontakte/vkui";

import { Icon24Dismiss } from "@vkontakte/icons";

import "./CustomModalPageHeader.css";

interface ICustomModalPageHeader extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
  subtitle?: string;
  title: string;
}

const CustomModalPageHeader: React.FC<ICustomModalPageHeader> = ({
  onClose,
  subtitle,
  title,
  className,
  ...restProps
}) => {
  const platform = usePlatform();
  const { sizeX } = useAdaptivityConditionalRender();
  return (
    <div
      {...restProps}
      className={classNames("CustomModalPageHeader", className)}
    >
      <ModalPageHeader
        before={
          sizeX.compact &&
          platform === Platform.ANDROID && (
            <PanelHeaderClose
              className={sizeX.compact.className}
              onClick={onClose}
            />
          )
        }
        after={
          sizeX.compact &&
          platform === Platform.IOS && (
            <PanelHeaderButton
              className={sizeX.compact.className}
              onClick={onClose}
            >
              <Icon24Dismiss />
            </PanelHeaderButton>
          )
        }
      >
        <PanelHeaderContent status={subtitle}>{title}</PanelHeaderContent>
      </ModalPageHeader>
    </div>
  );
};

export default CustomModalPageHeader;
