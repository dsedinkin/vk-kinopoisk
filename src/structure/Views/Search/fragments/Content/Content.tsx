import { useRef, createRef, useMemo } from "react";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { classNames } from "engine/utils";

import { useGlobalState } from "elum-state/react";
import { POPOUT } from "engine/state";

import {
  ActionSheet,
  ActionSheetItem,
  AdaptiveIconRenderer,
  Input,
  IconButton,
  FormItem,
  usePlatform,
  Platform,
} from "@vkontakte/vkui";
import { CustomCell } from "engine/components";

import {
  Icon16Search,
  Icon24Done,
  Icon24Cancel,
  Icon24Filter,
  Icon20DeleteOutline,
  Icon20DeleteOutlineAndroid,
  Icon28DeleteOutline,
  Icon28DeleteOutlineAndroid,
  Icon20CopyOutline,
  Icon28CopyOutline,
  Icon20FavoriteOutline,
  Icon28FavoriteOutline,
} from "@vkontakte/icons";

import "./Content.css";

interface IContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const Content: React.FC<IContentProps> = ({ className, ...restProps }) => {
  const platform = usePlatform();

  const routeNavigator = useRouteNavigator();

  const [popout, setPopout] = useGlobalState(POPOUT);

  const handleDone = () => {};

  const handleClear = () => {};

  const handleFilter = () => {
    routeNavigator.showModal("filter");
  };

  const array = [
    {
      id: 535341,
      name: "1+1",
      alternativeName: "Intouchables",
      poster: {
        url: "https://image.openmoviedb.com/kinopoisk-images/1946459/bf93b465-1189-4155-9dd1-cb9fb5cb1bb5/orig",
        previewUrl:
          "https://image.openmoviedb.com/kinopoisk-images/1946459/bf93b465-1189-4155-9dd1-cb9fb5cb1bb5/x1000",
      },
      rating: {
        kp: 8.826,
        imdb: 8.5,
        filmCritics: 6.8,
        russianFilmCritics: 100,
        await: null,
      },
      shortDescription:
        "Аристократ на коляске нанимает в сиделки бывшего заключенного. Искрометная французская комедия с Омаром Си",
      genres: [
        {
          name: "драма",
        },
        {
          name: "комедия",
        },
      ],
      countries: [
        {
          name: "Франция",
        },
      ],
      year: 2011,
    },
  ];

  const onClickIconButtonAfter = ({
    ref,
  }: {
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
          onClick={() => {}}
        >
          Скопировать ссылку
        </ActionSheetItem>
        <ActionSheetItem
          before={
            <AdaptiveIconRenderer
              IconCompact={Icon20FavoriteOutline}
              IconRegular={Icon28FavoriteOutline}
            />
          }
          onClick={() => {}}
        >
          В избранное
        </ActionSheetItem>
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
          onClick={() => {}}
        >
          Удалить из избранного
        </ActionSheetItem>
      </ActionSheet>
    );
  };

  const refs = useRef([]);

  const list = useMemo(
    () =>
      array?.map((value, key) => {
        const id = value?.id || 0;
        const subhead = value?.name;
        const headline =
          value?.alternativeName + (value?.year ? ", " + value?.year : "");
        const footnote =
          (value?.countries
            ? value?.countries?.map((value) => value?.name)?.join(", ")
            : "") +
          (value?.genres
            ? (value?.countries ? " · " : "") +
              value?.genres?.map((value) => value?.name)?.join(", ")
            : "");
        const rating = value?.rating?.kp.toFixed(1);

        refs.current[key] = refs?.current?.[key] || createRef();

        return (
          <CustomCell
            key={`CustomCell--${key}`}
            favorite={true}
            footnote={footnote}
            headline={headline}
            onClick={() => routeNavigator.push(`/watch/${id}`)}
            getIconButtonAfterRef={refs.current[key]}
            onClickIconButtonAfter={({ ref }) => {
              onClickIconButtonAfter({ ref });
            }}
            rating={rating}
            subhead={subhead}
          />
        );
      }),
    [array]
  );

  return (
    <div {...restProps} className={classNames("Content Group", className)}>
      <div className="Group__content">
        <FormItem style={{ paddingTop: 0 }}>
          <Input
            after={
              <>
                <IconButton onClick={handleDone}>
                  <Icon24Done />
                </IconButton>
                <IconButton onClick={handleClear}>
                  <Icon24Cancel />
                </IconButton>
                <IconButton onClick={handleFilter}>
                  <Icon24Filter />
                </IconButton>
              </>
            }
            before={<Icon16Search color="var(--vkui--color_icon_secondary)" />}
            placeholder="Название фильма, сериала..."
          />
        </FormItem>
        {list}
      </div>
    </div>
  );
};

export default Content;
