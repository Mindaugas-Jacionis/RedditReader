import * as types from './actionTypes';
import Immutable from 'seamless-immutable';
import _ from 'underscore';
import { Tools } from '../../utils';

const initialState = Immutable({
  favorites: []
});

export default function posts(state=initialState, action={}){
  switch (action.type) {
    case types.TOGGLE_FAVORITE:
        const { id } = action;
        const { favorites } = state;
        const isFavorite = favorites.includes(id);

        return Object.assign({}, state, {
          favorites: isFavorite ? _.reject(favorites, val => val === id) : _.union(favorites, [id])
        });

    default:
      return state;
  }
}
