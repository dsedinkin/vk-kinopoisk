import { TRequest } from "engine/types";

const state = new Map();

const request: TRequest = ({ path }) =>
  new Promise((resolve, reject) => {
    const dataString = JSON.stringify(path);
    const json = state.get(dataString);
    if (json) {
      resolve(json);
    } else {
      const token = JSON?.parse(localStorage?.getItem("ACCESS_TOKEN") || "") || "";
      const options = {
        method: "GET",
        headers: { accept: "application/json", "X-API-KEY": token }
      };
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
  search: (params: string) => request({ path: `movie?${params}` }),
  getById: (id: string) => request({ path: `movie/${id}` }),
}

export default api;
