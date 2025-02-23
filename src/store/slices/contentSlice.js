import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async () => {
    const response = await axios.get('https://6sg271zd-8000.use.devtunnels.ms/api/content');
    return response.data;
  }
);

export const fetchContentDetails = createAsyncThunk(
  'content/fetchContentDetails',
  async (contentId) => {
    const response = await axios.get(`https://6sg271zd-8000.use.devtunnels.ms/api/content/${contentId}`);
    return response.data;
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    items: [],
    currentContent: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.map(item => ({
          id: item._id,
          title: item.title,
          description: item.description,
          genre: item.genre,
          posterURL: item.posterURL,
          backdropURL: item.backdropURL,
          videoURL: item.videoURL,
          director: item.director,
          cast: item.cast,
          releaseDate: item.releaseDate,
          duration: item.duration,
          isFeatured: item.isFeatured,
          isTrending: item.isTrending,
          isOriginal: item.isOriginal,
          rating: item.rating
        }));
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchContentDetails.fulfilled, (state, action) => {
        state.currentContent = {
          id: action.payload._id,
          title: action.payload.title,
          description: action.payload.description,
          genre: action.payload.genre,
          posterURL: action.payload.posterURL,
          backdropURL: action.payload.backdropURL,
          videoURL: action.payload.videoURL,
          director: action.payload.director,
          cast: action.payload.cast,
          releaseDate: action.payload.releaseDate,
          duration: action.payload.duration,
          isFeatured: action.payload.isFeatured,
          isTrending: action.payload.isTrending,
          isOriginal: action.payload.isOriginal,
          rating: action.payload.rating
        };
      });
  }
});

export default contentSlice.reducer;