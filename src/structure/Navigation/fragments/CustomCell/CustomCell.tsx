import { classNames } from "engine/utils";

import {
  AdaptivityProvider,
  SizeType,
  SimpleCell,
  Headline,
} from "@vkontakte/vkui";

import "./CustomCell.css";

interface CustomCellProps extends React.HTMLAttributes<HTMLDivElement> {
  before: React.ElementType;
  id: string;
  open: boolean;
  setOpen: () => void;
  title: string;
}

const CustomCell: React.FC<CustomCellProps> = ({
  before,
  id,
  open,
  setOpen,
  title,
  className,
  ...restProps
}) => {
  const Icon = before;
  const iconBeforeProps = {
    color: open
      ? "var(--vkui--color_icon_accent)"
      : "var(--vkui--color_icon_secondary)",
  };
  const headlineProps = {
    style: {
      color: open
        ? "var(--vkui--color_text_accent)"
        : "var(--vkui--color_text_secondary)",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  };

  return (
    <AdaptivityProvider sizeX={SizeType.COMPACT} sizeY={SizeType.COMPACT}>
      <SimpleCell
        {...restProps}
        className={classNames("CustomCell SimpleCell", {
          activated: open,
        })}
        before={<Icon {...iconBeforeProps} />}
        onClick={() => setOpen()}
        activeClassName="activated"
      >
        <Headline level="2" weight="3" {...headlineProps}>
          {title}
        </Headline>
      </SimpleCell>
    </AdaptivityProvider>
  );
};

export default CustomCell;
