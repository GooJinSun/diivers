/**
 * value를 체크하면서 userTagQuery로 적당한 값이 있는지 찾는 함수
 */
export const extractTagQuery = (value: string) => {
  // 입력값 value에서 '@'로 시작하는 문자열을 추출하여 matches 배열에 저장한다.
  const matches = value.match(/@(\w+)/g);
  // matches 배열이 존재하는 경우 마지막 요소의 tagQuery를 추출하여 반환한다.
  if (matches) {
    const lastMatch = matches[matches.length - 1];
    return lastMatch.substring(1);
  }
  // matches 배열이 존재하지 않는 경우 null을 반환한다.
  return null;
};
