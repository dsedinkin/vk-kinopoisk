import { useMemo } from "react";
import { classNames } from "engine/utils";

import { Select } from "@vkontakte/vkui";

import "./SelectYear.css";

interface ISelectYear extends React.HTMLAttributes<HTMLSelectElement> {
  defaultValue: string | undefined;
  onSelectOption: (value: string) => void;
  placeholder: string;
  step?: number;
}

const SelectYear: React.FC<ISelectYear> = ({
  defaultValue,
  onSelectOption,
  placeholder,
  step = 0,
  className,
  ...restProps
}) => {
  const value = defaultValue || "";

  const minYear = 1990;

  const options = useMemo(
    () =>
      Array.from(Array(new Date().getFullYear() - minYear + step + 1).keys())
        .map((i) => {
          const age = `${i + minYear}`;
          return {
            label: age,
            value: age,
          };
        })
        .reverse(),
    []
  );

  return (
    <Select
      {...restProps}
      className={classNames("SelectYear", className)}
      allowClearButton
      onChange={(e) => onSelectOption(e.target.value)}
      options={options}
      placeholder={placeholder}
      value={value}
    />
  );
};

export default SelectYear;
