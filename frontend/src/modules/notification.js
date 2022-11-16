import axios from '../apis';

const initialState = {
  receivedNotifications: [],
  receivedFriendRequests: [],
  receivedResponseRequests: [],
  next: null
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

export const READ_NOTIFICATION_REQUEST =
  'notification/READ_NOTIFICATION_REQUEST';
export const READ_NOTIFICATION_SUCCESS =
  'notification/READ_NOTIFICATION_SUCCESS';
export const READ_NOTIFICATION_FAILURE =
  'notification/READ_NOTIFICATION_FAILURE';

export const READ_ALL_NOTIFICATIONS_REQUEST =
  'notification/READ_ALL_NOTIFICATIONS_REQUEST';
export const READ_ALL_NOTIFICATIONS_SUCCESS =
  'notification/READ_ALL_NOTIFICATIONS_SUCCESS';
export const READ_ALL_NOTIFICATIONS_FAILURE =
  'notification/READ_ALL_NOTIFICATIONS_FAILURE';

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
  const { next } = getState().notiReducer;
  if (!next) return;
  const nextUrl = next.replace('http://localhost:8000/api/', '');
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
  const { next } = getState().notiReducer;
  if (!next) return;
  const nextUrl = next.replace('http://localhost:8000/api/', '');
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
  const { next } = getState().notiReducer;
  if (!next) return;
  const nextUrl = next.replace('http://localhost:8000/api/', '');
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

export const readNotification = (id) => async (dispatch) => {
  let res;
  dispatch({ type: 'notification/READ_NOTIFICATION_REQUEST' });
  try {
    res = await axios.patch(`/notifications/${id}/`, { is_read: true });
  } catch (error) {
    dispatch({ type: 'notification/READ_NOTIFICATION_FAILURE', error });
    return;
  }
  dispatch({
    type: 'notification/READ_NOTIFICATION_SUCCESS',
    res: res.data
  });
};

export const readAllNotification = () => async (dispatch) => {
  let res;
  dispatch({ type: 'notification/READ_ALL_NOTIFICATIONS_REQUEST' });
  try {
    res = await axios.put(`/notifications/`);
  } catch (error) {
    dispatch({
      type: 'notification/READ_ALL_NOTIFICATIONS_FAILURE',
      error
    });
    return;
  }
  dispatch({
    type: 'notification/READ_ALL_NOTIFICATIONS_SUCCESS',
    res: res.data
  });
};

export default function notiReducer(state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case READ_ALL_NOTIFICATIONS_SUCCESS:
    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        receivedNotifications: action.res,
        next: action.next
      };
    case READ_NOTIFICATION_SUCCESS:
      const updatedNotification = action.res;
      const updatedNotificationIndex = state.receivedNotifications.findIndex(
        (noti) => noti.id === updatedNotification.id
      );
      return {
        ...state,
        receivedNotifications: [
          ...state.receivedNotifications.slice(0, updatedNotificationIndex),
          updatedNotification,
          ...state.receivedNotifications.slice(updatedNotificationIndex + 1)
        ]
      };
    case APPEND_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        receivedNotifications: state.receivedNotifications
          ? [...state.receivedNotifications, ...action.results]
          : [...action.results],
        next: action.next
      };
    case GET_FRIEND_REQUESTS_SUCCESS:
      return {
        ...state,
        receivedFriendRequests: action.res,
        next: action.next
      };
    case APPEND_FRIEND_REQUESTS_SUCCESS:
      return {
        ...state,
        receivedFriendRequests: state.receivedFriendRequests
          ? [...state.receivedFriendRequests, ...action.results]
          : [...action.results],
        next: action.next
      };
    case GET_RESPONSE_REQUESTS_SUCCESS:
      return {
        ...state,
        receivedResponseRequests: action.res,
        next: action.next
      };
    case APPEND_RESPONSE_REQUESTS_SUCCESS:
      return {
        ...state,
        receivedResponseRequests: state.receivedResponseRequests
          ? [...state.receivedResponseRequests, ...action.results]
          : [...action.results],
        next: action.next
      };
    default:
      return state;
  }
}
