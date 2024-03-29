import axios, { deleteTokens } from '@utils/api';
import { setTokensInCookies } from '@utils/tokenCookiesHelpers';
import { deactivateFirebaseDevice } from '@utils/firebaseHelpers';

export const GET_CURRENT_USER_REQUEST = 'user/GET_CURRENT_USER_REQUEST';
export const GET_CURRENT_USER_SUCCESS = 'user/GET_CURRENT_USER_SUCCESS';
export const GET_CURRENT_USER_FAILURE = 'user/GET_CURRENT_USER_FAILURE';

export const SIGN_UP_REQUEST = 'user/SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'user/SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'user/SIGN_UP_FAILURE';

export const DELETE_CURRENT_USER_REQUEST = 'user/DELETE_CURRENT_USER_REQUEST';
export const DELETE_CURRENT_USER_SUCCESS = 'user/DELETE_CURRENT_USER_SUCCESS';
export const DELETE_CURRENT_USER_FAILURE = 'user/DELETE_CURRENT_USER_FAILURE';

export const LOGIN_REQUEST = 'user/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'user/LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'user/LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'user/LOGOUT_SUCCESS';

export const ACTIVATE_REQUEST = 'user/ACTIVATE_REQUEST';
export const ACTIVATE_SUCCESS = 'user/ACTIVATE_SUCCESS';
export const ACTIVATE_FAILURE = 'user/ACTIVATE_FAILURE';

export const RESET_PASSWORD_EMAIL_REQUEST = 'user/RESET_PASSWORD_EMAIL_REQUEST';
export const RESET_PASSWORD_EMAIL_SUCCESS = 'user/RESET_PASSWORD_EMAIL_SUCCESS';
export const RESET_PASSWORD_EMAIL_FAILURE = 'user/RESET_PASSWORD_EMAIL_FAILURE';

export const RESET_PASSWORD_REQUEST = 'user/RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'user/RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'user/RESET_PASSWORD_FAILURE';

export const UPDATE_QUESTION_SELECT_REQUEST =
  'user/UPDATE_QUESTION_SELECT_REQUEST';
export const UPDATE_QUESTION_SELECT_SUCCESS =
  'user/UPDATE_QUESTION_SELECT_SUCCESS';
export const UPDATE_QUESTION_SELECT_FAILURE =
  'user/UPDATE_QUESTION_SELECT_FAILURE';

export const SKIP_OR_COMPLETE_SELECT_QUESTIONS =
  'user/SKIP_OR_COMPLETE_SELECT_QUESTIONS';

export const GET_SELECTED_USER_REQUEST = 'user/GET_SELECTED_USER_REQUEST';
export const GET_SELECTED_USER_SUCCESS = 'user/GET_SELECTED_USER_SUCCESS';
export const GET_SELECTED_USER_FAILURE = 'user/GET_SELECTED_USER_FAILURE';

export const REPORT_USER_REQUEST = 'user/REPORT_USER_REQUEST';
export const REPORT_USER_SUCCESS = 'user/REPORT_USER_SUCCESS';
export const REPORT_USER_FAILURE = 'user/REPORT_USER_FAILURE';

export const UPDATE_PROFILE_IMAGE_REQUEST = 'user/UPDATE_PROFILE_IMAGE_REQUEST';
export const UPDATE_PROFILE_IMAGE_SUCCESS = 'user/UPDATE_PROFILE_IMAGE_SUCCESS';
export const UPDATE_PROFILE_IMAGE_FAILURE = 'user/UPDATE_PROFILE_IMAGE_FAILURE';

export const REMOVE_ERROR = 'user/REMOVE_ERROR';

export const SET_FCM_TOKEN = 'user/SET_FCM_TOKEN';

export const REFRESH_PROFILE_IMAGE = 'user/REFRESH_PROFILE_IMAGE';

const initialState = {
  loginError: null,
  signUpError: {},
  currentUser: null,
  selectedUser: null,
  selectQuestion: true,
  fcmToken: null,
  profileImageUpdatedAt: Date.now()
};

export const skipOrCompleteSelectQuestions = () => {
  return (dispatch) => {
    dispatch({ type: SKIP_OR_COMPLETE_SELECT_QUESTIONS });
  };
};

export const requestSignUp = (signUpInfo) => {
  return async (dispatch) => {
    dispatch({ type: SIGN_UP_REQUEST });
    try {
      const { data } = await axios.post('user/signup/', signUpInfo, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (data.id) {
        dispatch({
          type: SIGN_UP_SUCCESS,
          currentUser: data
        });
      } else {
        dispatch({
          type: SIGN_UP_FAILURE,
          error: data
        });
      }
    } catch (error) {
      dispatch({
        type: SIGN_UP_FAILURE,
        error: error.response?.data
      });
    }
  };
};

export const changeProfileImage = (profileInfo) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_PROFILE_IMAGE_REQUEST });
    try {
      await axios.patch(`user/me/`, profileInfo, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (error) {
      dispatch({ type: UPDATE_PROFILE_IMAGE_FAILURE, error });
      return;
    }
    dispatch({
      type: UPDATE_PROFILE_IMAGE_SUCCESS
    });
    dispatch(getCurrentUser());
    dispatch({
      type: REFRESH_PROFILE_IMAGE,
      profileImageUpdatedAt: Date.now()
    });
  };
};

export const requestResetPasswordEmail = (emailInfo) => {
  return async (dispatch) => {
    dispatch({ type: RESET_PASSWORD_EMAIL_REQUEST });
    try {
      await axios.post(`user/send-reset-password-email/`, emailInfo);
      dispatch({ type: RESET_PASSWORD_EMAIL_SUCCESS });
    } catch (error) {
      dispatch({ type: RESET_PASSWORD_EMAIL_FAILURE });
    }
  };
};

export const requestResetPassword = (id, token, passwordInfo) => {
  return async (dispatch) => {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    try {
      await axios.patch(`user/reset-password/${id}/${token}/`, passwordInfo);
      dispatch({ type: RESET_PASSWORD_SUCCESS });
    } catch (error) {
      dispatch({ type: RESET_PASSWORD_FAILURE });
    }
  };
};

export const requestActivate = (id, token) => {
  return async (dispatch) => {
    dispatch({ type: ACTIVATE_REQUEST });
    try {
      await axios.put(`user/activate/${id}/${token}/`);
      dispatch({ type: ACTIVATE_SUCCESS });
    } catch (error) {
      dispatch({ type: ACTIVATE_FAILURE, error });
    }
  };
};

export const postSelectedQuestions = (selectedQuestions) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_QUESTION_SELECT_REQUEST });
    const formData = new FormData();
    formData.append('question_history', selectedQuestions.join(','));
    try {
      await axios.patch(`user/me/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (error) {
      dispatch({ type: UPDATE_QUESTION_SELECT_FAILURE, error });
      return;
    }
    dispatch({
      type: UPDATE_QUESTION_SELECT_SUCCESS,
      selectedQuestions
    });
  };
};

export const requestLogin = (loginInfo) => {
  return async (dispatch) => {
    dispatch({ type: 'user/LOGIN_REQUEST' });

    try {
      const res = await axios.post('user/token/', loginInfo);
      // set jwt token set
      const { access, refresh } = res.data;
      setTokensInCookies(access, refresh);

      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            actionType: 'SET_TOKEN',
            token: {
              refresh,
              access
            }
          })
        );
      }

      // set user info
      dispatch(getCurrentUser());
      dispatch({ type: 'user/LOGIN_SUCCESS' });
    } catch (error) {
      dispatch({ type: 'user/LOGIN_FAILURE', error: error.response.data });
    }
  };
};

export const logout = () => async (dispatch) => {
  dispatch({ type: 'user/LOGOUT_REQUEST' });
  try {
    await axios.get('user/logout/');
    deleteTokens();

    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          actionType: 'REMOVE_TOKEN'
        })
      );
    }
  } catch (error) {
    dispatch({ type: 'user/LOGOUT_FAILURE', error });
    return;
  }
  dispatch({
    type: 'user/LOGOUT_SUCCESS'
  });
};

export const getCurrentUser = () => async (dispatch) => {
  let result;
  dispatch({ type: 'user/GET_CURRENT_USER_REQUEST' });
  try {
    result = await axios.get('/user/me/');
  } catch (error) {
    dispatch({ type: 'user/GET_CURRENT_USER_FAILURE', error });
    return;
  }
  if (result) {
    dispatch({
      type: 'user/GET_CURRENT_USER_SUCCESS',
      currentUser: result?.data
    });
  }
};

export const getSelectedUser = (userName) => async (dispatch) => {
  let result;
  dispatch({ type: `user/GET_SELECTED_USER_REQUEST` });
  try {
    result = await axios.get(`user/profile/${userName}/`);
  } catch (error) {
    dispatch({ type: `user/GET_SELECTED_USER_FAILURE`, error });
    return;
  }
  dispatch({
    type: `user/GET_SELECTED_USER_SUCCESS`,
    selectedUser: result?.data
  });
};

export const deleteCurrentUser = () => async (dispatch) => {
  dispatch(logout());
  dispatch({ type: DELETE_CURRENT_USER_REQUEST });
  try {
    await axios.delete('/user/me/delete/');
  } catch (error) {
    dispatch({ type: DELETE_CURRENT_USER_FAILURE, error });
    return;
  }
  dispatch({
    type: DELETE_CURRENT_USER_SUCCESS
  });
};

export const setFcmToken = (fcmToken) => (dispatch) => {
  if (!fcmToken) return;
  dispatch({ type: SET_FCM_TOKEN, fcmToken });
};

export default function userReducer(state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case GET_SELECTED_USER_REQUEST:
    case GET_SELECTED_USER_FAILURE:
      return {
        ...state,
        selectedUser: null
      };
    case GET_SELECTED_USER_SUCCESS:
      return {
        ...state,
        selectedUser: action.selectedUser
      };
    case SIGN_UP_REQUEST:
      return {
        ...state,
        currentUser: null,
        signUpError: false,
        loginError: false
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        currentUser: null,
        loginError: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginError: false
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        currentUser: null,
        loginError: action.error
      };
    case DELETE_CURRENT_USER_REQUEST:
    case LOGOUT_REQUEST:
      deactivateFirebaseDevice(state.fcmToken);
      return initialState;
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpError: false,
        selectQuestion: false
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        signUpError: action.error
      };
    case SKIP_OR_COMPLETE_SELECT_QUESTIONS:
      return {
        ...state,
        selectQuestion: true
      };
    case UPDATE_QUESTION_SELECT_SUCCESS: {
      const newUser = {
        ...state.currentUser,
        question_history: action.selectedQuestions
      };
      return {
        ...state,
        currentUser: newUser,
        selectQuestion: true
      };
    }
    case GET_CURRENT_USER_SUCCESS: {
      return {
        ...state,
        currentUser: action.currentUser
      };
    }
    case GET_CURRENT_USER_FAILURE: {
      return {
        ...state,
        currentUser: null
      };
    }
    case SET_FCM_TOKEN: {
      return {
        ...state,
        fcmToken: action.fcmToken
      };
    }
    case REFRESH_PROFILE_IMAGE: {
      return {
        ...state,
        profileImageUpdatedAt: action.profileImageUpdatedAt
      };
    }
    default:
      return state;
  }
}
