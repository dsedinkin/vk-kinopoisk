import {} from "react";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {} from "engine/action";
import api from "engine/api";
import { classNames } from "engine/utils";

import {} from "elum-state/react";
import {} from "engine/state";

import {} from "@vkontakte/vkui";
import {
  CustomModalPageFooter,
  CustomModalPageHeader,
} from "engine/components";
import { Loading } from "structure/Popouts";

import {} from "@vkontakte/icons";

import "./Filter.css";

interface IFilter extends React.HTMLAttributes<HTMLDivElement> {}

const Filter: React.FC<IFilter> = ({ className, ...restProps }) => {
  const routeNavigator = useRouteNavigator();
  const path = `filter`;

  return (
    <div {...restProps} className={classNames("Filter", className)}>
      <CustomModalPageHeader title="Фильтры" />
    </div>
  );
};

export default Filter;
