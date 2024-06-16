import { getter, setter } from "elum-state/react";
import { } from "engine/state";

import { TRequest } from "engine/types";

import { } from "engine/action";

const options = {
  method: "GET",
  headers: { accept: "application/json", "X-API-KEY": "" }
};

const state = new Map();

const request: TRequest = ({ path }) =>
  new Promise((resolve, reject) => {
    const dataString = JSON.stringify(path);
    const json = state.get(dataString);
    if (json) {
      resolve(json);
    } else {
      fetch(`https://api.kinopoisk.dev/v1.4/${path}`, options)
        .then((data) => data.json())
        .then((resp) => {
          state.set(dataString, resp);
          resolve(resp);
        })
        .catch((error) => reject(error));
    }
  });

const api = {
  search: (params: string) => request({ path: `movie?${params}` })
};

export default api;
