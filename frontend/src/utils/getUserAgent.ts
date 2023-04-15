export const isMac = (userAgent?: string) => {
  if (!userAgent) return false;
  return userAgent.indexOf('Mac') !== -1;
};
