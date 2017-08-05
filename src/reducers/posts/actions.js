import * as types from './actionTypes';

export function toggleFavorite(id) {
  return {
    type: types.TOGGLE_FAVORITE,
    id
  }
}
