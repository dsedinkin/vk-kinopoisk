import { classNames } from "engine/utils";

import {  } from "@vkontakte/vkui";

import {  } from "@vkontakte/icons";

import "./Template.css";

interface TemplateProps extends React.HTMLAttributes<HTMLDivElement> {}

const Template: React.FC<TemplateProps> = ({
  children,
  className,
  ...restProps
}) => {
  return (
    <div
      {...restProps}
      className={classNames("Template", className)}
    >

    </div>
  );
};

export default Template;
