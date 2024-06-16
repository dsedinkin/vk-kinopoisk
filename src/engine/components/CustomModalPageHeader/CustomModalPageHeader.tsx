import { classNames } from "engine/utils";

import { ModalPageHeader, PanelHeaderContent, Title } from "@vkontakte/vkui";

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
      <ModalPageHeader className="CustomModalPageHeader__content">
        <PanelHeaderContent status={subtitle}>
          <Title className="CustomModalPageHeader__title" level="3">
            {title}
          </Title>
        </PanelHeaderContent>
      </ModalPageHeader>
    </div>
  );
};

export default CustomModalPageHeader;
