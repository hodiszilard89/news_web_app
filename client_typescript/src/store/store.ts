 import {combineReducers, configureStore} from "@reduxjs/toolkit"
import { newsPath, newsReducer, newsMiddleware } from "./news/news-api"
import { searchPath, searchReducer } from "./news/search-slice"
import {newsEditorPath, newsEditorReducer} from "./news/editor-slice"
import { loginModalPath, loginModalReducer } from "./news/login-slice"
import { authUserPath, authUserReducer } from "./news/auth-user-slice"
import { regModalPath, regModalReducer } from "./news/reg-slice"
import { newsSliceReducer, newsSlicePath } from "./news/news-slice"
import {usesSlicePath, usesSliceReducer} from "./news/users-slice"
//import { securityPath, securityReducer } from "./security/security-api"

 
 const appReducer = combineReducers({
    [newsPath] : newsReducer,
    //[securityPath]:securityReducer,
    [searchPath]: searchReducer,
    [newsEditorPath]: newsEditorReducer,
    [loginModalPath]: loginModalReducer,
    [regModalPath]:regModalReducer,
    [newsSlicePath]:newsSliceReducer, 
    [usesSlicePath] : usesSliceReducer,
    authUser:authUserReducer,
 }) 



 export const store=configureStore({
    reducer:appReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([newsMiddleware])
 })

 export type RootState = ReturnType<typeof store.getState>
 export type AppDispach = typeof store.dispatch;