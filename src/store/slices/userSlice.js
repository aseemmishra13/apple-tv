import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  status: 'idle',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    register: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { login, logout, register } = userSlice.actions;
export default userSlice.reducer;