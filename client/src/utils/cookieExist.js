export default function cookieExist(document) {
  const allCookies = document.cookie;

  const cookiesArray = allCookies.split('; ');

  for (let i = 0; i < cookiesArray.length; i++) {
    const cookie = cookiesArray[i];
    if (cookie.startsWith('jwt=')) {
      return true;
    }
  }
  return false;
}
