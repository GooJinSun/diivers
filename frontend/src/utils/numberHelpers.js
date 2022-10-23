/**
  Math.random(n)과 같은 역할을 하는 함수
  Math.random은 cryptographically unsecure함
 */
export const getRandomNumber = (max) => {
  const typedArray = new Uint32Array(1);
  crypto.getRandomValues(typedArray);
  const res = typedArray % (max + 1);
  return res;
};
