import { useState, useEffect, useMemo } from "react";
import { useRouteNavigator, useParams } from "@vkontakte/vk-mini-apps-router";
import {
  getFavorites,
  isFavorites,
  setFavorites,
  copyText,
} from "engine/action";
import api from "engine/api";
import { classNames, parseResponseKinopoiskDocs } from "engine/utils";

import {
  Button,
  ButtonGroup,
  Div,
  Header,
  Headline,
  MiniInfoCell,
  Subhead,
  Text,
} from "@vkontakte/vkui";
import { ContentLoading, Poster } from "engine/components";

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

  const params = useParams<"id">();

  const [response, setResponse] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const favorites = getFavorites();

  const handleRefresh = () => {
    setError(false);
    setLoading(true);
    if (typeof Number(params?.id) === "number") {
      api
        .getById(String(params?.id))
        .then((resp) => {
          setResponse(parseResponseKinopoiskDocs(resp) || {});
        })
        .catch((error) => {
          console.log({ error });
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError(true);
      setLoading(false);
    }
  };

  const id = useMemo(() => response?.id, [response]);

  const buttons = useMemo(
    () =>
      isFavorites(id) ? (
        <Button
          appearance="negative"
          mode="primary"
          size="l"
          onClick={() => {
            setFavorites(id);
          }}
        >
          Удалить из избранного
        </Button>
      ) : (
        <Button
          mode="primary"
          size="l"
          onClick={() => {
            setFavorites(id);
          }}
        >
          В избранное
        </Button>
      ),
    [id, favorites]
  );

  useEffect(() => {
    handleRefresh();
  }, []);

  return (
    <div {...restProps} className={classNames("Content Group", className)}>
      <ContentLoading loading={loading} error={error} onRefresh={handleRefresh}>
        <div className="Group__content">
          <div className="WatchHeader">
            <div className="WatchHeader__before">
              <Poster
                favorite={isFavorites(response?.id)}
                rating={response?.rating}
                src={response?.src}
              />
            </div>
            <div className="WatchHeader__after">
              {response?.name || response?.id ? (
                <Subhead
                  Component="span"
                  className="CustomCell__subhead CustomCell__text"
                >
                  {response?.name || response?.id}
                </Subhead>
              ) : (
                <></>
              )}
              {response?.alternativeName ? (
                <Headline
                  Component="span"
                  className="CustomCell__headline"
                  weight="3"
                >
                  {response?.alternativeName}
                </Headline>
              ) : (
                <></>
              )}
              {response?.shortDescription ? (
                <MiniInfoCell before={<Icon20ArticleOutline />} textWrap="full">
                  {response?.shortDescription}
                </MiniInfoCell>
              ) : (
                <></>
              )}
              {response?.genresString ? (
                <MiniInfoCell
                  before={<Icon20ListBulletOutline />}
                  textWrap="full"
                >
                  {response?.genresString}
                </MiniInfoCell>
              ) : (
                <></>
              )}
              {response?.year ? (
                <MiniInfoCell
                  before={<Icon20CalendarOutline />}
                  textWrap="full"
                >
                  {response?.year}
                </MiniInfoCell>
              ) : (
                <></>
              )}
              {response?.movieLength ? (
                <MiniInfoCell before={<Icon20RecentOutline />} textWrap="full">
                  {response?.movieLength + " мин."}
                </MiniInfoCell>
              ) : (
                <></>
              )}
              <Div>
                <ButtonGroup mode="horizontal" stretched>
                  {buttons}
                  <Button
                    mode="secondary"
                    size="l"
                    onClick={() => {
                      copyText(
                        `${window.location.origin}/#/watch/${id}`
                      );
                    }}
                  >
                    Скопировать ссылку
                  </Button>
                </ButtonGroup>
              </Div>
            </div>
          </div>
          {response?.description ? (
            <Div>
              <Header mode="secondary" style={{ padding: 0 }}>
                Описание
              </Header>
              <Text>{response?.description}</Text>
            </Div>
          ) : (
            <></>
          )}
        </div>
      </ContentLoading>
    </div>
  );
};

export default Content;
