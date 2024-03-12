import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface SearchParamsState {
    search: string;
  }
  
  const initialState: SearchParamsState = {
    search: "",
  };
  
  export const searchParamsSlice = createSlice({
    name: "searchParams",
    initialState,
    reducers: {
      setSearchText: (state: SearchParamsState, action: PayloadAction<string>) => {
        state.search = action.payload;
      },
    },
  });
  
  export const { setSearchText } = searchParamsSlice.actions;
  export const selectSearchText = (state: RootState) => state.searchParams.search;
  export const searchReducer = searchParamsSlice.reducer;
  export const searchPath = searchParamsSlice.name;

