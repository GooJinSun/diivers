export const SET_SCROLL_Y = 'scroll/SET_SCROLL_Y';
export const SET_IS_BACK = 'scroll/SET_IS_BACK';

type ScrollState = {
  scrollY: number;
};

const initialState: ScrollState = {
  scrollY: 0
};

export const setScrollY = (y: number) => ({
  type: SET_SCROLL_Y,
  payload: y
});

type ScrollAction = ReturnType<typeof setScrollY>;

export default function scrollReducer(
  state: ScrollState = initialState,
  action: ScrollAction
) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case SET_SCROLL_Y:
      return {
        ...state,
        scrollY: action.payload
      };
    default:
      return state;
  }
}
