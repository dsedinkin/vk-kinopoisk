import { classNames } from "engine/utils";

import {
  Footnote,
  Headline,
  IconButton,
  Subhead,
  Tappable,
} from "@vkontakte/vkui";
import { Poster } from "engine/components";

import { Icon28MoreVertical } from "@vkontakte/icons";

import "./CustomCell.css";

interface CustomCellProps extends React.HTMLAttributes<HTMLDivElement> {
  favorite?: boolean;
  footnote: string;
  getIconButtonAfterRef?: React.Ref<HTMLElement> | undefined;
  headline: string;
  onClickIconButtonAfter?: ({
    ref,
  }: {
    ref: React.Ref<HTMLElement> | undefined;
  }) => void;
  rating?: string;
  subhead: string;
}

const CustomCell: React.FC<CustomCellProps> = ({
  favorite,
  footnote,
  getIconButtonAfterRef,
  headline,
  onClickIconButtonAfter,
  rating,
  subhead,
  children,
  className,
  ...restProps
}) => {
  const src =
    "https://image.openmoviedb.com/kinopoisk-images/1946459/bf93b465-1189-4155-9dd1-cb9fb5cb1bb5/orig";
  return (
    <div className={classNames("CustomCell", className)}>
      <Tappable {...restProps} className="CustomCell__content">
        <div className="CustomCell__before">
          <Poster favorite={favorite} rating={rating} src={src} />
        </div>
        <div className="CustomCell__middle">
          <Subhead
            Component="span"
            className="CustomCell__subhead CustomCell__text"
          >
            {subhead}
          </Subhead>
          <Headline
            Component="span"
            className="CustomCell__headline"
            weight="3"
          >
            {headline}
          </Headline>
          <Footnote className="CustomCell__footnote" normalize={false}>
            {footnote}
          </Footnote>
        </div>
      </Tappable>
      <div className="CustomCell__after">
        <IconButton
          getRootRef={getIconButtonAfterRef}
          onClick={() =>
            onClickIconButtonAfter &&
            onClickIconButtonAfter({ ref: getIconButtonAfterRef })
          }
        >
          <Icon28MoreVertical color="var(--vkui--color_icon_secondary)" />
        </IconButton>
      </div>
    </div>
  );
};

export default CustomCell;
