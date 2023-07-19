
import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

import {User} from '../../models/user'
import { Comment } from '../../models/comment';
import { RawNews, News } from '../../models';

import {RootState} from '../../store/store'
import { useAuthUser} from "react-auth-kit";
import { useSelector, useDispatch } from "react-redux";
import {Type } from '../../models/type';



export interface GetNewsResponse{
    id:number,
    imgPath:string,
    text:string,
    title:string,
    subtitle:string,
    writer:User,
    likes?:User[],
    comments?:Comment[]
    releasedate:Date,
}

export interface GetNewsQueryParams{
    type?:Type[];
    offset?:number;
    sortBy?:string;
   // filter?:Type[];
    limit?:number; 
    id?:number; 
    search?:string;
    searchBy?:"titel"
}

export const storage = window.localStorage;
const newsTag: string = "NEWS";
export const newsApi = createApi({
    reducerPath:"newsPath",
    baseQuery:fetchBaseQuery({
      baseUrl:"",
      prepareHeaders: (headers, { getState }) => {
        const token = storage.getItem("_auth")
             
        if (token) {
          headers.set('authorization', `Bearer ${token}`)
        }
        return headers;
      },
    }, ),
    tagTypes: [newsTag], 
    
    endpoints:(builder)=>({
        getNewsList:builder.query< GetNewsResponse[]| undefined, GetNewsQueryParams | undefined>({
            query:(filter:GetNewsQueryParams)=>(
             { url:"/news",
             method:"GET",}
             
            
            ),
            providesTags: (result?: GetNewsResponse[]) => {
              return result && Array.isArray(result)
                ?
                  [
                    ...(result).map(
                      ({ id }) => ({ type: newsTag, id })
                    ),
                    { type: newsTag, id: "LIST" }
                  ]
                : [{ type: newsTag, id: "LIST" }]
            },
        }),
        getOneNews: builder.query<RawNews, RawNews["id"]>({
            query: (newsId: RawNews["id"]) => ({
              url: `/news/${newsId}`
            }),
          
          }),

        getUser: builder.query<User,User["id"]>({
            query:(userId: User["id"])=>({
              url:`/users/${userId}`
            })
        }),
        getTypes: builder.query<Type[],void>({
            query: () => ({
              url: `/news/gettypes`
            }),
            //providesTags: (_result, _error, id) => ([{ type: MovieTag, id }]),
          }),
        createNews: builder.mutation<RawNews, RawNews>({
          query:(news:RawNews)=>({
            url: "/news",
            method: "POST",
            headers:{
              "Content-Type":"text/plain; charset=utf-8",
              "Accept":"text/plain; charset=utf-8",
            },
            body: JSON.stringify(news),
        }),
        invalidatesTags: [{ type: newsTag, id: "LIST" }],
      }),
        updateNews: builder.mutation<News,RawNews>({
          
          query:(news:RawNews)=>({
            url:"/news",
            method:"PUT",
            headers:{
              "Content-Type":"text/plain; charset=utf-8",
              "Accept":"application/json; charset=utf-8",
            },
            body:JSON.stringify(news),
          })
        }),
        deleteNews: builder.mutation<void, number>({
          query:(newsId:number)=>({
            url: `/news/${newsId}`,
            method: "DELETE",
        }), 
          invalidatesTags: (_resut, error, id) => {
            const tags = [];
            if (!error) {
              tags.push({ type: newsTag, id });
            }
            tags.push({ type: newsTag, id: "LIST" });
            return tags;
        },}),
        addComment: builder.mutation<void, Comment>({    //első paraméter amit visszakapunk 2. amit küldünk
  
              query: (comment: Comment) => ({
              url: "/comment",
              method: "POST",
              headers:{
                
                "Content-Type":"text/plain; charset=utf-8",
                "accept":"text/plain; charset=utf-8",
              },
             
              body:JSON.stringify(comment),
            }),
           
          }),
        addUser: builder.mutation<User, User>({    //első paraméter amit visszakapunk 2. amit küldünk
            query: (user: User) => ({
            url: "/users",
            method: "POST",
            headers:{   
              "Content-Type":"text/plain",
              "accept":"text/plain; charset=utf-8",
            },
           
            body:JSON.stringify(user),
          }),
         
        }),
    })
})


export const useGetTypesQuery = newsApi.endpoints.getTypes.useQuery;
export const useGetUserQuery = newsApi.endpoints.getUser.useQuery;
export const useGetNewsQuery = newsApi.endpoints.getNewsList.useQuery;
export const useGetOneNewsQuery = newsApi.endpoints.getOneNews.useQuery; 
export const useCreateCommentMutation=newsApi.endpoints.addComment.useMutation;
export const useCreateUserMutation=newsApi.endpoints.addUser.useMutation;
export const useCreateNewsMutaion = newsApi.endpoints.createNews.useMutation; 
export const useDeleteNewsMutaion = newsApi.endpoints.deleteNews.useMutation; 
export const useUpdateNewsMutaion = newsApi.endpoints.updateNews.useMutation; 

export const newsReducer = newsApi.reducer;
export const newsPath = newsApi.reducerPath;
export const newsMiddleware = newsApi.middleware;