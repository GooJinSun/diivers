import axios from '../../utils/api';

const initialState = {
  receivedNotifications: [],
  receivedFriendRequests: [],
  receivedResponseRequests: [],
  nextNotificationUrl: null,
  nextFriendRequestUrl: null,
  nextResponseRequestUrl: null
};

export const GET_NOTIFICATIONS_REQUEST =
  'notification/GET_NOTIFICATION_REQUEST';
export const GET_NOTIFICATIONS_SUCCESS =
  'notification/GET_NOTIFICATION_SUCCESS';
export const GET_NOTIFICATIONS_FAILURE =
  'notification/GET_NOTIFICATION_FAILURE';

export const APPEND_NOTIFICATIONS_REQUEST =
  'notification/APPEND_NOTIFICATION_REQUEST';
export const APPEND_NOTIFICATIONS_SUCCESS =
  'notification/APPEND_NOTIFICATION_SUCCESS';
export const APPEND_NOTIFICATIONS_FAILURE =
  'notification/APPEND_NOTIFICATION_FAILURE';

export const GET_FRIEND_REQUESTS_REQUEST =
  'notification/GET_FRIEND_REQUESTS_REQUEST';
export const GET_FRIEND_REQUESTS_SUCCESS =
  'FRIEND_REQUESTS/GET_FRIEND_REQUESTS_SUCCESS';
export const GET_FRIEND_REQUESTS_FAILURE =
  'FRIEND_REQUESTS/GET_FRIEND_REQUESTS_FAILURE';

export const APPEND_FRIEND_REQUESTS_REQUEST =
  'FRIEND_REQUESTS/APPEND_FRIEND_REQUESTS_REQUEST';
export const APPEND_FRIEND_REQUESTS_SUCCESS =
  'FRIEND_REQUESTS/APPEND_FRIEND_REQUESTS_SUCCESS';
export const APPEND_FRIEND_REQUESTS_FAILURE =
  'FRIEND_REQUESTS/APPEND_FRIEND_REQUESTS_FAILURE';

export const GET_RESPONSE_REQUESTS_REQUEST =
  'notification/GET_RESPONSE_REQUESTS_REQUEST';
export const GET_RESPONSE_REQUESTS_SUCCESS =
  'RESPONSE_REQUESTS/GET_RESPONSE_REQUESTS_SUCCESS';
export const GET_RESPONSE_REQUESTS_FAILURE =
  'RESPONSE_REQUESTS/GET_RESPONSE_REQUESTS_FAILURE';

export const APPEND_RESPONSE_REQUESTS_REQUEST =
  'RESPONSE_REQUESTS/APPEND_RESPONSE_REQUESTS_REQUEST';
export const APPEND_RESPONSE_REQUESTS_SUCCESS =
  'RESPONSE_REQUESTS/APPEND_RESPONSE_REQUESTS_SUCCESS';
export const APPEND_RESPONSE_REQUESTS_FAILURE =
  'RESPONSE_REQUESTS/APPEND_NOTIFICATION_FAILURE';

export const READ_NOTIFICATIONS_REQUEST =
  'notification/READ_NOTIFICATIONS_REQUEST';
export const READ_NOTIFICATIONS_SUCCESS =
  'notification/READ_NOTIFICATIONS_SUCCESS';
export const READ_NOTIFICATIONS_FAILURE =
  'notification/READ_NOTIFICATIONS_FAILURE';

export const getNotifications = () => async (dispatch) => {
  let res;
  dispatch({ type: GET_NOTIFICATIONS_REQUEST });
  try {
    res = await axios.get('/notifications/');
  } catch (error) {
    dispatch({
      type: GET_NOTIFICATIONS_FAILURE,
      error
    });
    return;
  }
  dispatch({
    type: GET_NOTIFICATIONS_SUCCESS,
    res: res?.data.results,
    next: res?.data.next
  });
};

export const appendNotifications = () => async (dispatch, getState) => {
  const { nextNotificationUrl } = getState().notiReducer;
  if (!nextNotificationUrl) return;
  const nextUrl = nextNotificationUrl.replace('http://localhost:8000/api/', '');
  let result;
  dispatch({ type: APPEND_NOTIFICATIONS_REQUEST });
  try {
    result = await axios.get(nextUrl);
  } catch (error) {
    dispatch({ type: APPEND_NOTIFICATIONS_FAILURE, error });
    return;
  }
  const { data } = result;
  dispatch({
    type: APPEND_NOTIFICATIONS_SUCCESS,
    results: data?.results,
    next: data?.next
  });
};

export const getFriendRequests = () => async (dispatch) => {
  let res;
  dispatch({ type: GET_FRIEND_REQUESTS_REQUEST });
  try {
    res = await axios.get('/notifications/friend-requests/');
  } catch (error) {
    dispatch({
      type: GET_FRIEND_REQUESTS_FAILURE,
      error
    });
    return;
  }
  dispatch({
    type: GET_FRIEND_REQUESTS_SUCCESS,
    res: res?.data.results,
    next: res?.data.next
  });
};

export const appendFriendRequests = () => async (dispatch, getState) => {
  const { nextFriendRequestUrl } = getState().notiReducer;
  if (!nextFriendRequestUrl) return;
  const nextUrl = nextFriendRequestUrl.replace(
    'http://localhost:8000/api/',
    ''
  );
  let result;
  dispatch({ type: APPEND_FRIEND_REQUESTS_REQUEST });
  try {
    result = await axios.get(nextUrl);
  } catch (error) {
    dispatch({ type: APPEND_FRIEND_REQUESTS_FAILURE, error });
    return;
  }
  const { data } = result;
  dispatch({
    type: APPEND_FRIEND_REQUESTS_SUCCESS,
    results: data?.results,
    next: data?.next
  });
};

export const getResponseRequests = () => async (dispatch) => {
  let res;
  dispatch({ type: GET_RESPONSE_REQUESTS_REQUEST });
  try {
    res = await axios.get('/notifications/response-requests/');
  } catch (error) {
    dispatch({
      type: GET_RESPONSE_REQUESTS_FAILURE,
      error
    });
    return;
  }
  dispatch({
    type: GET_RESPONSE_REQUESTS_SUCCESS,
    res: res?.data.results,
    next: res?.data.next
  });
};

export const appendResponseRequests = () => async (dispatch, getState) => {
  const { nextResponseRequestUrl } = getState().notiReducer;
  if (!nextResponseRequestUrl) return;
  const nextUrl = nextResponseRequestUrl.replace(
    'http://localhost:8000/api/',
    ''
  );
  let result;
  dispatch({ type: APPEND_RESPONSE_REQUESTS_REQUEST });
  try {
    result = await axios.get(nextUrl);
  } catch (error) {
    dispatch({ type: APPEND_RESPONSE_REQUESTS_FAILURE, error });
    return;
  }
  const { data } = result;
  dispatch({
    type: APPEND_RESPONSE_REQUESTS_SUCCESS,
    results: data?.results,
    next: data?.next
  });
};

export const readNotifications = () => async (dispatch, getState) => {
  const { receivedNotifications } = getState().notiReducer;

  if (!receivedNotifications) {
    return;
  }

  const unreadNotifications = receivedNotifications
    .filter((noti) => !noti.is_read)
    .map((noti) => noti.id);

  if (unreadNotifications.length === 0) {
    return;
  }

  let res;
  dispatch({ type: 'notification/READ_NOTIFICATIONS_REQUEST' });
  try {
    res = await axios.patch(`/notifications/read/`, {
      ids: unreadNotifications
    });
  } catch (error) {
    dispatch({
      type: 'notification/READ_NOTIFICATIONS_FAILURE',
      error
    });
    return;
  }
  dispatch({
    type: 'notification/READ_NOTIFICATIONS_SUCCESS',
    res: res.data
  });
};

export default function notiReducer(state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        receivedNotifications: action.res,
        nextNotificationUrl: action.next
      };
    case APPEND_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        receivedNotifications: state.receivedNotifications
          ? [...state.receivedNotifications, ...action.results]
          : [...action.results],
        nextNotificationUrl: action.next
      };
    case GET_FRIEND_REQUESTS_SUCCESS:
      return {
        ...state,
        receivedFriendRequests: action.res,
        nextFriendRequestUrl: action.next
      };
    case APPEND_FRIEND_REQUESTS_SUCCESS:
      return {
        ...state,
        receivedFriendRequests: state.receivedFriendRequests
          ? [...state.receivedFriendRequests, ...action.results]
          : [...action.results],
        nextFriendRequestUrl: action.next
      };
    case GET_RESPONSE_REQUESTS_SUCCESS:
      return {
        ...state,
        receivedResponseRequests: action.res,
        nextResponseRequestUrl: action.next
      };
    case APPEND_RESPONSE_REQUESTS_SUCCESS:
      return {
        ...state,
        receivedResponseRequests: state.receivedResponseRequests
          ? [...state.receivedResponseRequests, ...action.results]
          : [...action.results],
        nextResponseRequestUrl: action.next
      };
    default:
      return state;
  }
}
