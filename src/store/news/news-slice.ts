import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { News } from "../../models/news";
import { RawNews } from "../../models/raw-news";
import { RootState } from "../store";
import { serializNews } from "../../utils/news_factory";
import { User } from "../../models/user";
import { stat } from "fs";

interface NewsState {
  priority: RawNews[];
  news: RawNews[];
  typeId?: number;
}

const initialState: NewsState = {
  priority: [],
  news: [],
  typeId: -1,
};

export const newsSlice = createSlice({
  name: "newsSlice",
  initialState,
  reducers: {
    setNews: (state: NewsState, action: PayloadAction<RawNews[]>) => {
      state.news = [...action.payload];
    },
    setPriorityNews: (state: NewsState, action: PayloadAction<RawNews[]>) => {
      state.priority = [...action.payload];
    },
    setNewsTypeId: (state: NewsState, action: PayloadAction<number>) => {
      state.typeId = action.payload;
    },
    updateNewsItem: (
      state: NewsState,
      action: PayloadAction<{ index: number; item: RawNews }>
    ) => {
      const { index, item } = action.payload;
      state.news[index] = item;
    },
  },
});
export const { setNews, setNewsTypeId, updateNewsItem, setPriorityNews } = newsSlice.actions;
export const newsSliceReducer = newsSlice.reducer;
export const newsSlicePath = newsSlice.name;

export const selectPrioritis  = (state: RootState)=>state.newsSlice.priority; 
export const selectNews = (state: RootState) => state.newsSlice.news;
export const selectTypeId = (state: RootState) => state.newsSlice.typeId;
