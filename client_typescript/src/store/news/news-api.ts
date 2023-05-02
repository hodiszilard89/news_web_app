import { filter } from '@chakra-ui/react';
import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {News} from "../../models/news"
import {User} from '../../models/user'


export interface GetNewsResponse{
    id:number,
    img_path:string,
    text:string,
    title:string,
    writer:User,
    likes?:User[]
}

export interface GetNewsQueryParams{
    limit?:number; 
}

export const newsApi = createApi({
    reducerPath:"newsPath",
    baseQuery:fetchBaseQuery({baseUrl:"/news"}),
    endpoints:(builder)=>({
        getNews:builder.query<GetNewsResponse []| undefined, GetNewsQueryParams | undefined>({
            query:(filter:GetNewsQueryParams)=>{
                return{
                    url:"",
                }
            }
        })
    })
})

export const useGetNewsQuery = newsApi.endpoints.getNews.useQuery;

export const newsReducer = newsApi.reducer;
export const newsPath = newsApi.reducerPath;
export const newsMiddleware = newsApi.middleware;