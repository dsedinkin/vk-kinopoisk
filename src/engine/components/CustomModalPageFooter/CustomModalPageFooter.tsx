import { classNames } from "engine/utils";

import { Div } from "@vkontakte/vkui";

import "./CustomModalPageFooter.css";

interface ICustomModalPageFooter extends React.HTMLAttributes<HTMLDivElement> {}

const CustomModalPageFooter: React.FC<ICustomModalPageFooter> = ({
  children,
  className,
  ...restProps
}) => {
  return (
    <div
      {...restProps}
      className={classNames("CustomModalPageFooter", className)}
    >
      <Div className="CustomModalPageFooter__content">{children}</Div>
    </div>
  );
};

export default CustomModalPageFooter;
