import { classNames } from "engine/utils";

import { Image, Footnote } from "@vkontakte/vkui";

import { Icon32FavoriteCircleFillGreen } from "@vkontakte/icons";

import "./Poster.css";

interface PosterProps extends React.HTMLAttributes<HTMLDivElement> {
  favorite?: boolean;
  rating?: string | number;
  src?: string;
  size?: "s" | "l";
}

const Poster: React.FC<PosterProps> = ({
  favorite,
  rating,
  src,
  size = "s",
  children,
  className,
  ...restProps
}) => {
  return (
    <div {...restProps} className={classNames("Poster", className)}>
      <Image
        src={src}
        style={
          size === "s"
            ? { width: 125, height: 178.65 }
            : { width: 187.5, height: 267.975 }
        }
        borderRadius="l"
      >
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
