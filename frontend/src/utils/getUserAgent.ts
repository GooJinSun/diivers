export const isMac = (userAgent = window?.navigator.userAgent) => {
  if (!userAgent) return false;
  return userAgent.indexOf('Mac') !== -1;
};
