import { classNames } from "engine/utils";

import { FixedLayout, Separator, Spacing } from "@vkontakte/vkui";

import "./CustomFixedLayout.css";

interface ICustomFixedLayout extends React.HTMLAttributes<HTMLDivElement> {
  modeDesktop?: boolean;
}

const CustomFixedLayout: React.FC<ICustomFixedLayout> = ({
  modeDesktop,
  children,
  className,
  ...restProps
}) => {
  if (modeDesktop) {
    return (
      <div className={classNames("CustomFixedLayout", className)}>
        <Separator wide />
        <div {...restProps} className="CustomFixedLayout__content">
          {children}
        </div>
      </div>
    );
  } else {
    return (
      <>
        <Spacing size={70} />
        <FixedLayout vertical="bottom" filled>
          <Separator wide />
          <div {...restProps} className="CustomFixedLayout__content">
            {children}
          </div>
        </FixedLayout>
      </>
    );
  }
};

export default CustomFixedLayout;
