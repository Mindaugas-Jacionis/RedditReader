import * as types from './actionTypes';
import Immutable from 'seamless-immutable';
import _ from 'underscore';
import { Tools } from '../../utils';

const initialState = Immutable({
  isFetching: false,
  errorMessage: false,
  posts: [],
  after: ''
});

export default function home(state=initialState, action={}){
  switch (action.type) {
    case types.FETCH:
      return Object.assign({}, state, {
        isFetching: true,
        errorMessage: false
      });
    case types.SUCCESS:
      const newData = _.pluck(action.payload.data.children, 'data');

      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: false,
        after: action.payload.data.after,
        posts: Tools.merge(state.posts, newData, 'id')
      });
    case types.FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: 'Unable to load content, please try later.'
      });

    default:
      return state;
  }
}
