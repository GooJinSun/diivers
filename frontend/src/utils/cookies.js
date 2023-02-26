export const setCookie = (name, value, days) => {
  document.cookie = `${name}=${value};max-age=${60 * 60 * 24 * days}`;
};

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

export const deleteCookie = (name) => {
  if (getCookie(name)) {
    document.cookie = `${name}=;max-age=-1`;
  }
};
