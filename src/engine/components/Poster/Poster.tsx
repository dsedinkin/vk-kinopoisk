import { classNames } from "engine/utils";

import { Image, Footnote } from "@vkontakte/vkui";

import { Icon32FavoriteCircleFillGreen } from "@vkontakte/icons";

import "./Poster.css";

interface PosterProps extends React.HTMLAttributes<HTMLDivElement> {
  favorite?: boolean;
  rating?: string | number;
  src?: string;
}

const Poster: React.FC<PosterProps> = ({
  favorite,
  rating,
  src,
  children,
  className,
  ...restProps
}) => {
  return (
    <div {...restProps} className={classNames("Poster", className)}>
      <Image src={src} style={{ width: 125, height: 178.65 }} borderRadius="l">
        {rating ? (
          <div className="Poster__badge">
            <Footnote>{rating}</Footnote>
          </div>
        ) : (
          <></>
        )}
        {favorite ? (
          <Image.Badge>
            <Icon32FavoriteCircleFillGreen width={24} height={24} />
          </Image.Badge>
        ) : (
          <></>
        )}
      </Image>
    </div>
  );
};

export default Poster;
