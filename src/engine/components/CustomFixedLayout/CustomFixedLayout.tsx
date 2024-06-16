import { classNames } from "engine/utils";

import { Separator } from "@vkontakte/vkui";

import "./CustomFixedLayout.css";

interface ICustomFixedLayout extends React.HTMLAttributes<HTMLDivElement> {}

const CustomFixedLayout: React.FC<ICustomFixedLayout> = ({
  children,
  className,
  ...restProps
}) => {
  return (
    <div className={classNames("CustomFixedLayout", className)}>
      <Separator wide />
      <div {...restProps} className="CustomFixedLayout__content">
        {children}
      </div>
    </div>
  );
};

export default CustomFixedLayout;
