import { useMemo } from "react";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { classNames } from "engine/utils";

import { useGlobalState } from "elum-state/react";
import { SELECTED_FILTERS } from "engine/state";

import {
  FormItem,
  ChipsSelect,
  FormLayoutGroup,
  Select,
  Button,
} from "@vkontakte/vkui";
import {
  CustomModalPageFooter,
  CustomModalPageHeader,
  SelectYear,
} from "engine/components";
import { Loading } from "structure/Popouts";

import {} from "@vkontakte/icons";

import "./Filter.css";

interface IFilter extends React.HTMLAttributes<HTMLDivElement> {}

const Filter: React.FC<IFilter> = ({ className, ...restProps }) => {
  const routeNavigator = useRouteNavigator();
  const path = `filter`;

  const genres = [
    {
      label: "аниме",
      value: "anime",
    },
    {
      label: "биография",
      value: "biografiya",
    },
    {
      label: "боевик",
      value: "boevik",
    },
    {
      label: "вестерн",
      value: "vestern",
    },
    {
      label: "военный",
      value: "voennyy",
    },
    {
      label: "детектив",
      value: "detektiv",
    },
    {
      label: "детский",
      value: "detskiy",
    },
    {
      label: "для взрослых",
      value: "dlya-vzroslyh",
    },
    {
      label: "документальный",
      value: "dokumentalnyy",
    },
    {
      label: "драма",
      value: "drama",
    },
    {
      label: "игра",
      value: "igra",
    },
    {
      label: "история",
      value: "istoriya",
    },
    {
      label: "комедия",
      value: "komediya",
    },
    {
      label: "концерт",
      value: "koncert",
    },
    {
      label: "короткометражка",
      value: "korotkometrazhka",
    },
    {
      label: "криминал",
      value: "kriminal",
    },
    {
      label: "мелодрама",
      value: "melodrama",
    },
    {
      label: "музыка",
      value: "muzyka",
    },
    {
      label: "мультфильм",
      value: "multfilm",
    },
    {
      label: "мюзикл",
      value: "myuzikl",
    },
    {
      label: "новости",
      value: "novosti",
    },
    {
      label: "приключения",
      value: "priklyucheniya",
    },
    {
      label: "реальное ТВ",
      value: "realnoe-TV",
    },
    {
      label: "семейный",
      value: "semeynyy",
    },
    {
      label: "спорт",
      value: "sport",
    },
    {
      label: "ток-шоу",
      value: "tok-shou",
    },
    {
      label: "триллер",
      value: "triller",
    },
    {
      label: "ужасы",
      value: "uzhasy",
    },
    {
      label: "фантастика",
      value: "fantastika",
    },
    {
      label: "фильм-нуар",
      value: "film-nuar",
    },
    {
      label: "фэнтези",
      value: "fentezi",
    },
    {
      label: "церемония",
      value: "ceremoniya",
    },
  ];
  const ratings = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "10", value: "10" },
  ];

  const [selectedFilters, setSelectedFilters] =
    useGlobalState(SELECTED_FILTERS);

  const setState = ({ value, name }: any) =>
    setSelectedFilters((prev) => ({ ...prev, [name]: value }));

  const [selectedGenres, setSelectedGenres] = [
    useMemo(() => selectedFilters?.selectedGenres, [selectedFilters]),
    (value: Array<any>) => setState({ value, name: "selectedGenres" }),
  ];
  const [selectedRatingMin, setSelectedRatingMin] = [
    useMemo(() => selectedFilters?.selectedRatingMin, [selectedFilters]),
    (value: string) => setState({ value, name: "selectedRatingMin" }),
  ];
  const [selectedRatingMax, setSelectedRatingMax] = [
    useMemo(() => selectedFilters?.selectedRatingMax, [selectedFilters]),
    (value: string) => setState({ value, name: "selectedRatingMax" }),
  ];
  const [selectedYearMin, setSelectedYearMin] = [
    useMemo(() => selectedFilters?.selectedYearMin, [selectedFilters]),
    (value: string) => setState({ value, name: "selectedYearMin" }),
  ];
  const [selectedYearMax, setSelectedYearMax] = [
    useMemo(() => selectedFilters?.selectedYearMax, [selectedFilters]),
    (value: string) => setState({ value, name: "selectedYearMax" }),
  ];

  const inputGenres = useMemo(
    () => (
      <ChipsSelect
        id="genres"
        value={selectedGenres}
        onChange={setSelectedGenres}
        options={genres}
        placeholder="Не выбраны"
      />
    ),
    [selectedGenres, genres]
  );

  const handleReset = () => {
    setSelectedGenres([]);
    setSelectedRatingMin("");
    setSelectedRatingMax("");
    setSelectedYearMin("");
    setSelectedYearMax("");
  };

  const handleDone = () => {
    routeNavigator.hideModal();
  };

  const disabled = useMemo(
    () =>
      selectedGenres?.length === 0 &&
      selectedRatingMin === "" &&
      selectedRatingMax === "" &&
      selectedYearMin === "" &&
      selectedYearMax === "",
    [
      selectedGenres,
      selectedRatingMin,
      selectedRatingMax,
      selectedYearMin,
      selectedYearMax,
    ]
  );

  return (
    <div {...restProps} className={classNames("Filter", className)}>
      <CustomModalPageHeader title="Фильтры" />
      <FormItem htmlFor="genres" top="Выберите жанры">
        {inputGenres}
      </FormItem>
      <FormLayoutGroup mode="horizontal">
        <FormItem top="Рейтинг">
          <Select
            allowClearButton
            onChange={(e) => setSelectedRatingMin(e.target.value)}
            options={ratings}
            placeholder="От"
            value={selectedRatingMin}
          />
        </FormItem>
        <FormItem>
          <Select
            allowClearButton
            onChange={(e) => setSelectedRatingMax(e.target.value)}
            options={ratings}
            placeholder="До"
            value={selectedRatingMax}
          />
        </FormItem>
      </FormLayoutGroup>
      <FormLayoutGroup mode="horizontal">
        <FormItem top="Год выпуска">
          <SelectYear
            defaultValue={selectedYearMin}
            onSelectOption={(value) => setSelectedYearMin(value)}
            placeholder="От"
          />
        </FormItem>
        <FormItem>
          <SelectYear
            defaultValue={selectedYearMax}
            onSelectOption={(value) => setSelectedYearMax(value)}
            placeholder="До"
          />
        </FormItem>
      </FormLayoutGroup>
      <CustomModalPageFooter>
        <Button
          appearance="negative"
          disabled={disabled}
          mode="link"
          onClick={handleReset}
        >
          Сбросить
        </Button>
        <Button onClick={handleDone} disabled={disabled}>
          Применить
        </Button>
      </CustomModalPageFooter>
    </div>
  );
};

export default Filter;
