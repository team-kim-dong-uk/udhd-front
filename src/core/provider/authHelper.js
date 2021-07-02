import Router from 'next/router';

const saveTokenInCookies = (cookieName, value, days) => {
  const exdate = new Date();
  exdate.setDate(exdate.getDate() + days);

  const cookieValue = escape(value);
  document.cookie = `${cookieName} = ${cookieValue}`;
};

const removeTokenFromCookies = () => {
  saveTokenInCookies('userInfo', '');
};

const logout = () => {
  removeTokenFromCookies();
  Router.reload();
};

export { logout, saveTokenInCookies };
