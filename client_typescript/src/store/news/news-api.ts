import { filter } from '@chakra-ui/react';
import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {News} from "../../models/news"
import {User} from '../../models/user'
import { Comment } from '../../models/comment';
//import {Type } from '../../models/type';
export interface Type{
    title:string,
    writer:User,
}

export interface GetNewsResponse{
    id:number,
    imgPath:string,
    text:string,
    title:string,
    writer:User,
    likes?:User[],
    comments?:Comment[]
}

export interface GetNewsQueryParams{
    type?:Type[];
    offset?:number;
    sortBy?:string;
    limit?:number; 
    id?:number; 
    search?:string;
    searchBy?:"titel"
}

export const newsApi = createApi({
    reducerPath:"newsPath",
    baseQuery:fetchBaseQuery({baseUrl:"/news"}), 
    endpoints:(builder)=>({
        getNewsList:builder.query<GetNewsResponse []| undefined, GetNewsQueryParams | undefined>({
            query:(filter:GetNewsQueryParams)=>{
                return{
                    url:"",
                }
            }
        }),
        getOneNews: builder.query<News, News["id"]>({
            query: (newsId: News["id"]) => ({
              url: `/${newsId}`
            }),
            //providesTags: (_result, _error, id) => ([{ type: MovieTag, id }]),
          }),
        getTypes: builder.query<Type[],void>({
            query: () => ({
              url: `/gettypes`
            }),
            //providesTags: (_result, _error, id) => ([{ type: MovieTag, id }]),
          }),
        addComment: builder.mutation<Comment, Comment>({
            query: (comment: Comment) => ({
              url: "/addcomment",
              method: "POST",
              body: comment,
            }),
            //invalidatesTags: [{ type: MovieTag, id: "LIST" }],
          }),
    })
})

export const useGetTypes = newsApi.endpoints.getTypes.useQuery;
export const useGetNewsQuery = newsApi.endpoints.getNewsList.useQuery;
export const useGetOneNewsQuery = newsApi.endpoints.getOneNews.useQuery;
export const newsReducer = newsApi.reducer;
export const newsPath = newsApi.reducerPath;
export const newsMiddleware = newsApi.middleware;