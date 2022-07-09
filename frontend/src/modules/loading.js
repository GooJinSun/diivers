/* eslint-disable no-unused-vars */
import Cookies from 'js.cookie';
import history from '../history';

export default function loadingReducer(state, action) {
  if (typeof state === 'undefined') {
    return {};
  }
  const { type } = action;
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);
  if (!matches) return state;
  const [, requestName, requestState] = matches;

  if (requestName === 'user/LOGOUT') {
    return {
      ...state,
      'user/LOGIN': 'FAILURE'
    };
  }
  return {
    ...state,
    [requestName]: requestState
  };
}
