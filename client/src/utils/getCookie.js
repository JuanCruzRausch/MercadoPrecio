export default function getCookie(document) {
  const allCookies = document.cookie;

  // Dividir las cookies en un array
  const cookiesArray = allCookies.split('; ');

  // Buscar la cookie específica por nombre ("jwt" en este caso)
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
