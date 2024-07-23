export const setCookie = (name: string, value?: string, days?: number) => {
  let expires = '';

  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }

  document.cookie = `${name}=${value || 0}${expires}; path=/`;
}
export const getCookie = (name: string) => {
  const nameEq = `${name}=`;
  const ca = document.cookie.split(';');

  for(var i = 0; i < ca.length; i++) {
    let c = ca[i];

    while (c.charAt(0) === ' ') c = c.substring(1, c.length);

    if (c.indexOf(nameEq) == 0) return c.substring(nameEq.length, c.length);
  }

  return null;
}
export const deleteCookie = (name: string) => {   
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}