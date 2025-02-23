import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   currentUser: null,
//   status: 'idle',
// };

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    status: 'idle'
  },
  reducers: {
    login: (state, action) => {
      state.currentUser = {
        id: action.payload.id,
        email: action.payload.email,
        username: action.payload.username
      };
      state.status = 'succeeded';
    },
    logout: (state) => {
      state.currentUser = null;
      state.status = 'idle';
    },
    register: (state, action) => {
      state.currentUser = {
        id: action.payload.id,
        email: action.payload.email,
        username: action.payload.username,
        password: action.payload.password
      };
      state.status = 'registered';
    },
  },
});

export const { login, logout, register } = userSlice.actions;
export default userSlice.reducer;