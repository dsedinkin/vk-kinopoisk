import { IconButton } from "@vkontakte/vkui";

import { Icon16Clear } from "@vkontakte/icons";

const getInputProps = (defaultValue: string | undefined, value: string | undefined, ref: any, onChange: any) => ({
  after: value !== "" && (
    <IconButton
      hoverMode="opacity"
      aria-label="Очистить поле"
      onClick={() => {
        ref.current.value = "";
        onChange("");
      }}
    >
      <Icon16Clear />
    </IconButton>
  ),
  defaultValue: defaultValue || "",
  getRef: ref,
  onChange: (e: any) => onChange(e.target.value),
  type: "text"
});

export default getInputProps;
