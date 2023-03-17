interface QueryList {
  GET_RECOMMENDED_QUESTIONS: undefined;
  GET_FRIEND_POST_LIST: undefined;
}

const getQueryKey = <T extends keyof QueryList>(
  ...[key, params]: undefined extends QueryList[T]
    ? [T]
    : [T, QueryList[T] | 'KEY_ONLY']
) => {
  if (params === 'KEY_ONLY') return [key];
  return params ? [key, params] : [key];
};

export default getQueryKey;
