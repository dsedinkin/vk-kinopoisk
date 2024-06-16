import {} from "react";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { classNames } from "engine/utils";

import {
  Button,
  ButtonGroup,
  Div,
  MiniInfoCell,
  Subhead,
  Text,
  Header,
} from "@vkontakte/vkui";
import { Poster } from "engine/components";

import {
  Icon20ArticleOutline,
  Icon20CalendarOutline,
  Icon20ListBulletOutline,
  Icon20RecentOutline,
} from "@vkontakte/icons";

import "./Content.css";

interface IContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const Content: React.FC<IContentProps> = ({ className, ...restProps }) => {
  const routeNavigator = useRouteNavigator();

  const poster = {
    url: "https://image.openmoviedb.com/kinopoisk-images/1946459/bf93b465-1189-4155-9dd1-cb9fb5cb1bb5/orig",
    previewUrl:
      "https://image.openmoviedb.com/kinopoisk-images/1946459/bf93b465-1189-4155-9dd1-cb9fb5cb1bb5/x1000",
  };
  const rating = {
    kp: 8.826,
    imdb: 8.5,
    filmCritics: 6.8,
    russianFilmCritics: 100,
    await: null,
  };
  const name = "1+1";
  const shortDescription =
    "Аристократ на коляске нанимает в сиделки бывшего заключенного. Искрометная французская комедия с Омаром Си";
  const genres = [
    {
      name: "драма",
    },
    {
      name: "комедия",
    },
  ];
  const year = 2011;
  const movieLength = 112;
  const description =
    "Пострадав в результате несчастного случая, богатый аристократ Филипп нанимает в помощники человека, который менее всего подходит для этой работы, – молодого жителя предместья Дрисса, только что освободившегося из тюрьмы. Несмотря на то, что Филипп прикован к инвалидному креслу, Дриссу удается привнести в размеренную жизнь аристократа дух приключений.";

  return (
    <div {...restProps} className={classNames("Content Group", className)}>
      <div className="Group__content">
        <div className="WatchHeader">
          <div className="WatchHeader__before">
            <Poster
              favorite={true}
              rating={rating?.kp?.toFixed(1)}
              src={poster?.url}
            />
          </div>
          <div className="WatchHeader__after">
            <Subhead
              Component="span"
              className="CustomCell__subhead CustomCell__text"
            >
              {name}
            </Subhead>
            <MiniInfoCell before={<Icon20ArticleOutline />}>
              {shortDescription}
            </MiniInfoCell>
            <MiniInfoCell before={<Icon20ListBulletOutline />}>
              {genres?.map((value) => value.name).join(", ")}
            </MiniInfoCell>
            <MiniInfoCell before={<Icon20CalendarOutline />}>
              {year}
            </MiniInfoCell>
            <MiniInfoCell before={<Icon20RecentOutline />}>
              {movieLength + " мин."}
            </MiniInfoCell>
            <Div>
              <ButtonGroup mode="horizontal" stretched>
                <Button mode="primary" size="l">
                  В избранное
                </Button>
                <Button mode="secondary" size="l">
                  Скопировать ссылку
                </Button>
              </ButtonGroup>
            </Div>
          </div>
        </div>
        <Header mode="secondary">Описание</Header>
        <Div>
          <Text>{description}</Text>
        </Div>
      </div>
    </div>
  );
};

export default Content;
