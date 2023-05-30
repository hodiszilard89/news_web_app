 import {combineReducers, configureStore} from "@reduxjs/toolkit"
import { newsPath, newsReducer, newsMiddleware } from "./news/news-api"
import { searchPath, searchReducer } from "./news/search-slice"
import {newsEditorPath, newsEditorReducer} from "./news/editor-slice"

 
 const appReducer = combineReducers({
    [newsPath] : newsReducer,
    [searchPath]: searchReducer,
    [newsEditorPath]: newsEditorReducer,
 }) 



 export const store=configureStore({
    reducer:appReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([newsMiddleware])
 })

 export type RootState = ReturnType<typeof store.getState>
 export type AppDispach = typeof store.dispatch;