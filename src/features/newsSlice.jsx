import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  newsList: [],
  loading: true,
};

export const getNews = createAsyncThunk('news/getNews', async () => {
  const url = `https://newsapi.org/v2/top-headlines?country=tr&apiKey=87d4c06c0c7c4ae1bd9894f630f62e62`;
  try {
    const { data } = await axios(url);
    return data.articles;
  } catch (error) {
    console.log(error);
  }
});

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    clearNewsList: state => {
      state.newsList = [];
    },
  },
  extraReducers: {
    [getNews.pending]: (state, action) => {
      state.loading = true;
    },
    [getNews.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.newsList = payload;
    },
    [getNews.rejected]: state => {
      state.loading = false;
    },
  },
});

export const { clearNewsList } = newsSlice.actions;

export default newsSlice.reducer;
