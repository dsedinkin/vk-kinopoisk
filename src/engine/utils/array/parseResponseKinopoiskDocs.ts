const parseResponseKinopoiskDocs = (value: Record<string, any>) => {
  const id = value?.id || 0;
  const name = value?.name || "";
  const year = value?.year;
  const alternativeName = (value?.alternativeName ? value?.alternativeName : "");
  const alternativeNamePlusYear =
    alternativeName +
    (year
      ? (alternativeName ? ", " : "") + year
      : "");
  const countriesString = (value?.countries
    ? value?.countries?.map((value: any) => value?.name)?.join(", ")
    : "");
  const genresString = value?.genres ? value?.genres?.map((value: any) => value?.name)?.join(", ") : "";
  const countriesPlusGenres =
    countriesString +
    (genresString
      ? (countriesString ? " · " : "") +
      genresString
      : "");
  const rating =
    value?.rating?.kp > 0
      ? value?.rating?.kp?.toFixed(1)
      : value?.rating?.imdb
        ? value?.rating?.imdb?.toFixed(1)
        : undefined;
  const src = value?.poster?.url;
  const movieLength = value?.movieLength;
  const shortDescription = value?.shortDescription;
  const description = value?.description;
  return {
    alternativeName,
    alternativeNamePlusYear,
    countriesPlusGenres,
    countriesString,
    description,
    genresString,
    id,
    movieLength,
    name,
    rating,
    shortDescription,
    src,
    year,
  }
};

export default parseResponseKinopoiskDocs;
