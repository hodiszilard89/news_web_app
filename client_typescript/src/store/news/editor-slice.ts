import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { News } from "../../models/news";
import { RawNews } from "../../models/raw-news";
import { RootState } from "../store";
import { createRawNews } from "../../utils/create-raw-news";

interface NewsEditorState{
    news:RawNews | null;
    newsId:News["id"];
    showEditor:boolean;
}

const initialState:NewsEditorState ={
    news: null,
    newsId: undefined,
    showEditor:false,
}
export const newsEditorSlice = createSlice({
    
    name: "newsEditor",
    initialState,
    reducers:{
        showEditor: (state: NewsEditorState,
                     action: PayloadAction<News["id"]>
                     ) => {
                        state.newsId=action.payload;   
                        if(!action.payload){
                            state.news = createRawNews()
                        }
            },
        setNews: (
            state:NewsEditorState, 
            action: PayloadAction<RawNews>)=>{     
                state.news={...action.payload}  
             }
    }
});


export const {setNews, showEditor} = newsEditorSlice.actions;
export const newsEditorReducer = newsEditorSlice.reducer;
export const newsEditorPath = newsEditorSlice.name;

export const selectShowEditor = (state:RootState) => state.newsEditor.showEditor;
export const selectNewsId = (state: RootState) => state.newsEditor.newsId;
export const selectNews = (state: RootState) => state.newsEditor.news;
export const selectEditor = (state: RootState) => state.newsEditor;  
