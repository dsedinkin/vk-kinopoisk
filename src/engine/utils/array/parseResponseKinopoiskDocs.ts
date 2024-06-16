const parseResponseKinopoiskDocs = (value: Record<string, any>) => {
  const id = value?.id || 0;
  const name = value?.name || "";
  const alternativeNamePlusYear =
    (value?.alternativeName ? value?.alternativeName : "") +
    (value?.year
      ? (value?.alternativeName ? ", " : "") + value?.year
      : "");
  const countriesPlusGenres =
    (value?.countries
      ? value?.countries?.map((value: any) => value?.name)?.join(", ")
      : "") +
    (value?.genres
      ? (value?.countries ? " · " : "") +
      value?.genres?.map((value: any) => value?.name)?.join(", ")
      : "");
  const rating =
    value?.rating?.kp > 0
      ? value?.rating?.kp?.toFixed(1)
      : value?.rating?.imdb
        ? value?.rating?.imdb?.toFixed(1)
        : undefined;
  const src = value?.poster?.url;
  return {
    id,
    name,
    alternativeNamePlusYear,
    countriesPlusGenres,
    rating,
    src
  }
};

export default parseResponseKinopoiskDocs;
