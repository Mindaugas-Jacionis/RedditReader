import * as types from './actionTypes';

export function fetch(query) {
  const q = query.trim();

  return {
    types: [types.FETCH, types.SUCCESS, types.FAILURE],
    api: (api) => api(`r/ProgrammerHumor.json`)
  }
}
