import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import getCookie from '@/utils/getCookie';

// Definir la acción asincrónica para obtener la información del usuario
export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async () => {
    try {
      const jwtCookie = getCookie(document);

      if (jwtCookie) {
        const axiosInstance = axios.create({
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${jwtCookie}`,
          },
        });

        const response = await axiosInstance.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user`,
        );
        return response.data.data.user;
      } else {
        return null;
      }
    } catch (error) {
      console.error(
        'Error al obtener la información del usuario:',
        error.message,
      );
      throw error;
    }
  },
);

// Definir el estado inicial
const initialState = {
  _id: '',
  name: '',
  surname: '',
  email: '',
  photo: '',
  role: '',
};

// Crear el slice del usuario
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state._id = '';
      state.name = '';
      state.surname = '';
      state.email = '';
      state.photo = '';
      state.role = '';
    },
  },
  extraReducers: (builder) => {
    // Manejar la acción asincrónica para obtener la información del usuario
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      if (action.payload) {
        return { ...state, ...action.payload };
      }
      return state;
    });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
