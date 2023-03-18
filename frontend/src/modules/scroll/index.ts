export const SET_SCROLL_Y = 'scroll/SET_SCROLL_Y';

export type PathnameType = '/home' | '/anonymous' | '/questions';

type ScrollState = Record<string, number>;

const initialState: ScrollState = {};

export const setScrollY = (y: number, location: string) => {
  return {
    type: SET_SCROLL_Y,
    payload: { y, location }
  };
};

export default function scrollReducer(
  state: ScrollState = initialState,
  action: any
) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case SET_SCROLL_Y:
      return {
        ...state,
        [action.payload.location]: action.payload.y
      };
    default:
      return state;
  }
}
