import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RawNews } from "../../models/raw-news";
import { RootState } from "../store";



interface NewsState {
  priority: RawNews[];
  news: RawNews[];
  typeId?: number;
  side:number
}

const initialState: NewsState = {
  priority: [],
  news: [],
  typeId: -1,
  side:0,
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
    setSide:(state: NewsState, action: PayloadAction<number>)=>{
      state.side=action.payload;
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
export const {setSide, setNews, setNewsTypeId, updateNewsItem, setPriorityNews } = newsSlice.actions;
export const newsSliceReducer = newsSlice.reducer;
export const newsSlicePath = newsSlice.name;

export const selectSide = (state:RootState) => state.newsSlice.side;
export const selectPrioritis  = (state: RootState)=>state.newsSlice.priority; 
export const selectNews = (state: RootState) => state.newsSlice.news;
export const selectTypeId = (state: RootState) => state.newsSlice.typeId;
