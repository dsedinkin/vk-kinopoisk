import { classNames } from "engine/utils";

import { ModalPageHeader, PanelHeaderContent } from "@vkontakte/vkui";

import "./CustomModalPageHeader.css";

interface ICustomModalPageHeader extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
}

const CustomModalPageHeader: React.FC<ICustomModalPageHeader> = ({
  title,
  subtitle,
  className,
  ...restProps
}) => {
  return (
    <div
      {...restProps}
      className={classNames("CustomModalPageHeader", className)}
    >
      <ModalPageHeader>
        <PanelHeaderContent status={subtitle}>{title}</PanelHeaderContent>
      </ModalPageHeader>
    </div>
  );
};

export default CustomModalPageHeader;
