export const SET_SCROLL_Y = 'scroll/SET_SCROLL_Y';
export const SET_IS_BACK = 'scroll/SET_IS_BACK';

type ScrollState = {
  scrollY: number;
  isBack: boolean;
};

const initialState: ScrollState = {
  scrollY: 0,
  isBack: false
};

export const setScrollY = (y: number) => ({
  type: SET_SCROLL_Y,
  payload: y
});

export const setIsBack = (isBack: boolean) => ({
  type: SET_IS_BACK,
  payload: isBack
});

type ScrollAction =
  | ReturnType<typeof setScrollY>
  | ReturnType<typeof setIsBack>;

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
    case SET_IS_BACK:
      return {
        ...state,
        isBack: action.payload
      };
    default:
      return state;
  }
}
