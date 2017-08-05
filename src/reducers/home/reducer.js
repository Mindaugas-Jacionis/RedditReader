import * as types from './actionTypes';
import Immutable from 'seamless-immutable';
import _ from 'underscore';
// import Tools from '../../utils/Tools';

const initialState = Immutable({
  isFetching: false,
  errorMessage: false,
  posts: []
});

export default function search(state=initialState, action={}){
  switch (action.type) {
    case types.FETCH:
      return Object.assign({}, state, {
        isFetching: true,
        errorMessage: false
      });
    case types.SUCCESS:
      console.log('SUCCESS', action.payload);

      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: false
      });
    case types.FAILURE:
      let payload = action.payload || {};
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: 'Unable to load content, please try later.'
      });

    default:
      return state;
  }
}
