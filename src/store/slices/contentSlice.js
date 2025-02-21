import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { mockMovies } from '../../mockData';  // Import mock data

export const fetchMovies = createAsyncThunk('content/fetchMovies', async () => {
  const response = await axios.get('/api/movies');
  return response.data;
});

// const contentSlice = createSlice({
//   name: 'content',
//   initialState: {
//     movies: [],
//     tvShows: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchMovies.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchMovies.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.movies = action.payload;
//       });
//   },
// });
const contentSlice = createSlice({
  name: 'content',
  initialState: {
    movies: mockMovies,  // Use mock data directly
    status: 'succeeded'
  },
  reducers: {}
});


export default contentSlice.reducer;