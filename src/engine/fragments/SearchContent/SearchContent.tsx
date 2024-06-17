import { useRef, createRef, useEffect, useMemo, useState } from "react";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
  copyText,
  getFavorites,
  isFavorites,
  setFavorites,
} from "engine/action";
import api from "engine/api";
import { classNames, parseResponseKinopoiskDocs } from "engine/utils";

import { useGlobalState } from "elum-state/react";
import { POPOUT, SELECTED_FILTERS } from "engine/state";

import {
  ActionSheet,
  ActionSheetItem,
  AdaptiveIconRenderer,
  Div,
  usePlatform,
  Platform,
  Button,
  Pagination,
  Placeholder,
} from "@vkontakte/vkui";
import {
  ContentLoading,
  CustomCell,
  CustomFixedLayout,
} from "engine/components";

import {
  Icon24Filter,
  Icon20DeleteOutline,
  Icon20DeleteOutlineAndroid,
  Icon28DeleteOutline,
  Icon28DeleteOutlineAndroid,
  Icon20CopyOutline,
  Icon28CopyOutline,
  Icon20FavoriteOutline,
  Icon28FavoriteOutline,
  Icon56FavoriteOutline,
} from "@vkontakte/icons";

import "./SearchContent.css";

interface ISearchContentProps extends React.HTMLAttributes<HTMLDivElement> {
  mode?: "search" | "favorites";
  scrollTop: () => void;
}

const SearchContent: React.FC<ISearchContentProps> = ({
  mode = "search",
  scrollTop,
  className,
  ...restProps
}) => {
  const platform = usePlatform();

  const routeNavigator = useRouteNavigator();

  const [popout, setPopout] = useGlobalState(POPOUT);
  const [response, setResponse] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const favorites = getFavorites();
  const [selectedFilters, setSelectedFilters] =
    useGlobalState(SELECTED_FILTERS);

  const handleFilter = () => {
    routeNavigator.showModal("filter");
  };

  const handleRefresh = () => {
    setError(false);
    setLoading(true);
    const params = new URLSearchParams([
      ["page", selectedFilters?.page],
      ["limit", "50"],
      ...(mode === "favorites" && favorites?.length > 0
        ? favorites.map((value) => ["id", value])
        : []),
      ...(selectedFilters?.selectedGenres?.length === 0 &&
      !selectedFilters?.selectedRatingMin &&
      !selectedFilters?.selectedRatingMax &&
      !selectedFilters?.selectedYearMin &&
      !selectedFilters?.selectedYearMax
        ? [["lists", "top250"]]
        : []),
      // ["notNullFields", "id"],
      // ["notNullFields", "name"],
      // ["notNullFields", "alternativeName"],
      // ["notNullFields", "year"],
      // ["notNullFields", "rating.kp"],
      // ["notNullFields", "poster.url"],
      ...(selectedFilters?.selectedGenres
        ? selectedFilters?.selectedGenres?.map((value: any) => [
            "genres.name",
            value?.label,
          ])
        : []),
      ...(selectedFilters?.selectedRatingMin ||
      selectedFilters?.selectedRatingMax
        ? [
            [
              "rating.kp",
              `${
                selectedFilters?.selectedRatingMin
                  ? selectedFilters?.selectedRatingMin
                  : "0"
              }${
                "-" +
                (selectedFilters?.selectedRatingMax
                  ? selectedFilters?.selectedRatingMax
                  : "10")
              }`,
            ],
          ]
        : []),
      ...(selectedFilters?.selectedYearMin || selectedFilters?.selectedYearMax
        ? [
            [
              "year",
              `${
                selectedFilters?.selectedYearMin
                  ? selectedFilters?.selectedYearMin
                  : "1990"
              }${
                "-" +
                (selectedFilters?.selectedYearMax
                  ? selectedFilters?.selectedYearMax
                  : new Date().getFullYear())
              }`,
            ],
          ]
        : []),
    ]).toString();
    api
      .search(params)
      .then((resp) => {
        setResponse(resp || {});
      })
      .catch((error) => {
        console.log({ error });
        setError(true);
      })
      .finally(() => {
        setLoading(false);
        scrollTop();
      });
  };

  useEffect(() => {
    handleRefresh();
  }, [selectedFilters]);

  const onClickIconButtonAfter = ({
    id,
    ref,
  }: {
    id: string;
    ref: React.Ref<HTMLElement> | undefined;
  }) => {
    setPopout(
      <ActionSheet
        onClose={() => setPopout(undefined)}
        toggleRef={(ref as React.RefObject<Element>)?.current}
      >
        <ActionSheetItem
          before={
            <AdaptiveIconRenderer
              IconCompact={Icon20CopyOutline}
              IconRegular={Icon28CopyOutline}
            />
          }
          onClick={() => {
            copyText(`${window.location.origin}/#/watch/${id}`);
          }}
        >
          Скопировать ссылку
        </ActionSheetItem>
        {isFavorites(id) ? (
          <ActionSheetItem
            before={
              <AdaptiveIconRenderer
                IconCompact={
                  platform === Platform.IOS
                    ? Icon20DeleteOutline
                    : Icon20DeleteOutlineAndroid
                }
                IconRegular={
                  platform === Platform.IOS
                    ? Icon28DeleteOutline
                    : Icon28DeleteOutlineAndroid
                }
              />
            }
            mode="destructive"
            onClick={() => {
              setFavorites(id);
            }}
          >
            Удалить из избранного
          </ActionSheetItem>
        ) : (
          <ActionSheetItem
            before={
              <AdaptiveIconRenderer
                IconCompact={Icon20FavoriteOutline}
                IconRegular={Icon28FavoriteOutline}
              />
            }
            onClick={() => {
              setFavorites(id);
            }}
          >
            В избранное
          </ActionSheetItem>
        )}
      </ActionSheet>
    );
  };

  const refs = useRef([]);

  const list = useMemo(
    () =>
      Array.isArray(response?.docs) ? (
        (response?.docs as Array<any>)?.map((value, key) => {
          const {
            id,
            name,
            alternativeNamePlusYear,
            countriesPlusGenres,
            rating,
            src,
          } = parseResponseKinopoiskDocs(value);

          refs.current[key] = refs?.current?.[key] || createRef();

          return (
            <CustomCell
              key={`CustomCell--${key}`}
              favorite={isFavorites(id)}
              footnote={countriesPlusGenres}
              headline={alternativeNamePlusYear}
              onClick={() => routeNavigator.push(`/watch/${id}`)}
              getIconButtonAfterRef={refs.current[key]}
              onClickIconButtonAfter={({ ref }) => {
                onClickIconButtonAfter({ id, ref });
              }}
              rating={rating}
              src={src}
              subhead={name}
            />
          );
        })
      ) : (
        <></>
      ),
    [favorites, response]
  );

  return (
    <div {...restProps} className={classNames("Content Group", className)}>
      {mode === "favorites" && favorites?.length === 0 ? (
        <div className="Group__content">
          <Placeholder
            header="Пока не добавлено"
            icon={
              <Icon56FavoriteOutline color="var(--vkui--color_text_secondary)" />
            }
            stretched
          />
        </div>
      ) : (
        <ContentLoading
          loading={loading}
          error={error}
          onRefresh={handleRefresh}
        >
          <div className="Group__content">
            <Div style={{ paddingTop: 0 }}>
              <Button
                appearance="neutral"
                before={<Icon24Filter />}
                onClick={handleFilter}
                size="l"
                stretched={true}
              >
                Фильтры
              </Button>
            </Div>
            {list}
          </div>
          <CustomFixedLayout
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Pagination
              currentPage={selectedFilters?.page}
              totalPages={response?.pages}
              onChange={(page) => {
                scrollTop();
                setSelectedFilters((prev) => ({ ...prev, page: page }));
              }}
            />
          </CustomFixedLayout>
        </ContentLoading>
      )}
    </div>
  );
};

export default SearchContent;
