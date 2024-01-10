export default function getCookie(document) {
  const allCookies = document.cookie;

  const cookiesArray = allCookies.split('; ');

  let jwtCookie;
  for (let i = 0; i < cookiesArray.length; i++) {
    const cookie = cookiesArray[i];
    if (cookie.startsWith('jwt=')) {
      jwtCookie = cookie.slice(4, cookie.length);
      break;
    }
  }
  return jwtCookie;
}
