import { CALL_API } from `redux-api-middleware`;
import { chanel } from '../../utils/Constants'
import * as types from './actionTypes';

export function fetch(query) {
  const q = query.trim();

  return {
    [CALL_API]: {
      endpoint: `${chanel}${query}`,
      method: 'GET',
      types: [types.FETCH, types.SUCCESS, types.FAILURE]
    }
  }
}
