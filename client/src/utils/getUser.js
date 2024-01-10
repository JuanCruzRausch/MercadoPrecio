import getCookie from '@/utils/getCookie';
import axios from 'axios';

export default async function getUser(document, apiUrl, setUser) {
  const jwtCookie = getCookie(document);

  if (jwtCookie) {
    const axiosInstance = axios.create({
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${jwtCookie}`,
      },
    });

    const response = await axiosInstance.get(`${apiUrl}/api/v1/user`);

    const { name, email, surname, photo, role, id } = response.data.data.user;

    setUser({ name, email, surname, photo, role, id });
  } else {
    console.log('La cookie jwt no existe');
  }
}
