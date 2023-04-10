 import {combineReducers, configureStore} from "@reduxjs/toolkit"
import { newsPath, newsReducer, newsMiddleware } from "./news/news-api"
import { type } from "os"
 
 const appReducer = combineReducers({
    [newsPath] : newsReducer,
 }) 



 export const store=configureStore({
    reducer:appReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([newsMiddleware])
 })

 export type RootState = ReturnType<typeof store.getState>
 export type AppDispach = typeof store.dispatch;