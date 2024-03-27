
import {
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { Like } from "../../models/like";
import { User } from "../../models/user";
import { Comment } from "../../models/comment";
import { RawNews, News } from "../../models";

import { Type } from "../../models/type";
import { Token } from "../../models/token";

import {
  BaseQueryApi,
  BaseQueryFn,
} from "@reduxjs/toolkit/dist/query/baseQueryTypes";


interface updateParam {
  user: User;
  image: string;
}

interface customError {
  data: {
    messages: string;
    stack: string;
  };
  status: number;
}

export interface GetNewsResponse {
  id: number;
  imgPath: string;
  text: string;
  title: string;
  subtitle: string;
  writer: User;
  likes?: User[];
  comments?: Comment[];
  releasedate: Date;
}
export interface GetTokenQueryParams {
  email: string;
  password: string;
}
export interface GetNewsQueryParams {
  type?: Type[];
  offset?: number;
  sortBy?: string;

  limit?: number;
  id?: number;
  search?: string;
  searchBy?: "titel";
}

export interface GetRequestParamsForNewsQuery {
  typeId: Type["id"];
  limit: number;
  side: number;
}

export interface ResponseForNewsQuery{
  lastSide:boolean;
  newsList:News[];
}
 
export const storage = window.localStorage;
const SERVERHOST = "localhost";
const newsTag: string = "NEWS";
const userTag: string = "USER";
const commentTag: string = "COMMENT";
export const newsApi = createApi({
  reducerPath: "newsPath",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    prepareHeaders: (headers, { getState }) => {
      const token = storage.getItem("_auth");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, customError, {}>,
  tagTypes: [newsTag, userTag],

  endpoints: (builder) => ({
    getToken: builder.query<Token, GetTokenQueryParams>({
      query: (params: GetTokenQueryParams) => ({
        url: `http://${SERVERHOST}:8080/authentication`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: {
          username: params.email,
          password: params.password,
        },
      }),
    
    }),
    getNewsList: builder.query<RawNews[] | undefined, GetNewsQueryParams>({
      query: (filter: GetNewsQueryParams) => ({ url: "/news", method: "GET" }),
      providesTags: (result?: RawNews[]) => {
        return result && Array.isArray(result)
          ? [
              ...result.map(({ id }) => ({ type: newsTag, id })),
              { type: newsTag, id: "LIST" },
            ]
          : [{ type: newsTag, id: "LIST" }];
      },
    }),

    getNewsByType: builder.query<ResponseForNewsQuery, GetRequestParamsForNewsQuery>({
      query: (params: GetRequestParamsForNewsQuery) => ({
        url: `http://${SERVERHOST}:8080/news/type/${params.typeId}/${params.limit}/${params.side}`,
        method: "GET",
      }),
      providesTags: (result?: ResponseForNewsQuery) => {
        return result?.newsList && Array.isArray(result.newsList)
          ? [
              ...result.newsList.map(({ id }) => ({ type: newsTag, id }))
            ]
          : [{ type: newsTag, id:"LIST" }];
      },
    }),
    getOneNews: builder.query<RawNews, RawNews["id"]>({
      query: (newsId: RawNews["id"]) => ({
        url: `/news/${newsId}`,
      }),
    }),
    getUsers: builder.query<User[], void>({
      query: () => ({
        url: "/users",
      }),
      providesTags: (result?: User[]) => {
        return result && Array.isArray(result)
          ? [
              ...result.map(({ id }) => ({ type: userTag, id })),
              { type: userTag, id: "LIST" },
            ]
          : [{ type: userTag, id: "LIST" }];
      },
    }),

    getUser: builder.query<User, User["id"]>({
      query: (userId: User["id"]) => ({
        url: `/users/${userId}`,
      }),
      providesTags: [{ type: userTag, id: "LIST" }],
    }),
    getTypes: builder.query<Type[], void>({
      query: () => ({
        url: `http://${SERVERHOST}:8080/news/gettypes`,
        method: "GET",
      }),
      //providesTags: (_result, _error, id) => ([{ type: MovieTag, id }]),
    }),
    createNews: builder.mutation<RawNews, RawNews>({
      query: (news: RawNews) => ({
        url: `http://${SERVERHOST}:8080/news`,
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "text/plain; charset=utf-8",
        },
        body: news,
      }),
      invalidatesTags: [{ type: newsTag, id: "LIST" }],
    }),
    updateNews: builder.mutation<News, RawNews>({
      query: (news: RawNews) => ({
        url: "/news",
        method: "PUT",
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          Accept: "application/json; charset=utf-8",
        },
        body: JSON.stringify(news),
      }),
      invalidatesTags: [{ type: newsTag, id: "LIST" }],
    }),

    checkUniqueEmail: builder.query<boolean, string>({
      query: (email: string) => ({
        url: "/user/checkemail",
        method: "GET",
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          Accept: "text/plain; charset=utf-8",
        },
        body: JSON.stringify({ email: { email } }),
      }),
    }),

    uploadImage: builder.mutation<void, string>({
      query: (image: string) => ({
        url: "news/uploadimage",
        method: "POST",
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          Accept: "text/plain; charset=utf-8",
        },

        //{image:image} a szerverszámára
        body: image,
      }),
    }),
    updateUser: builder.mutation<void, updateParam>({
      query: ({ user, image }) => ({
        url: "/users",
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json; charset=utf-8",
        },
        body: JSON.parse(JSON.stringify({ usersDTO: user, image: image })),
        invalidatesTags: [{ type: userTag, id: user.id }],
        // invalidatesTags: [{ type: userTag, id: user.id }],
      }),
      invalidatesTags: [{ type: userTag, id: "LIST" }],
    }),
    deleteNews: builder.mutation<void, number>({
      query: (newsId: number) => ({
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
      },
    }),
    deleteUser: builder.mutation<void, number>({
      query: (userId: number) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_resut, error, id) => {
        const tags = [];
        if (!error) {
          tags.push({ type: userTag, id });
        }
        tags.push({ type: userTag, id: "LIST" });
        return tags;
      },
    }),
    createUser: builder.mutation<void, User>({
      //első paraméter amit visszakapunk 2. amit küldünk

      query: (user: User) => ({
        url: "/users",
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          accept: "application/json; charset=utf-8",
        },

        body: JSON.parse(JSON.stringify(user)),
      }),
    }),
    addComment: builder.mutation<void, Comment>({
      //első paraméter amit visszakapunk 2. amit küldünk

      query: (comment: Comment) => ({
        url: "/comment",
        method: "POST",
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          accept: "application/json; charset=utf-8",
        },

        body: JSON.stringify(comment),
      }),
      invalidatesTags: [{ type: newsTag, id: "LIST" }],
    }),
    addLike: builder.mutation<void, Like>({
      //első paraméter amit visszakapunk 2. amit küldünk

      query: (like: Like) => ({
        url: "news/addlike",
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json; charset=utf-8",
        },

        body: JSON.parse(JSON.stringify(like)),
      }),

      invalidatesTags: [
        { type: userTag, id: "LIST" },
        { type: newsTag, id: "LIST" },
      ],
    }),
  }),
});

export const useCheckUniqueEmail = newsApi.endpoints.checkUniqueEmail.useQuery;
export const useGetTokenQuery = newsApi.endpoints.getToken.useQuery;
export const useGetTypesQuery = newsApi.endpoints.getTypes.useQuery;
export const useGetUsersQuery = newsApi.endpoints.getUsers.useQuery;
export const useGetNewsByTypeQuery = newsApi.endpoints.getNewsByType.useQuery;
export const useGetUserQuery = newsApi.endpoints.getUser.useQuery;
export const useGetNewsQuery = newsApi.endpoints.getNewsList.useQuery;
export const useGetOneNewsQuery = newsApi.endpoints.getOneNews.useQuery;
export const useDeleteUserMutation = newsApi.endpoints.deleteUser.useMutation;
export const useCreateCommentMutation =
  newsApi.endpoints.addComment.useMutation;
export const useUploadImageMutation = newsApi.endpoints.uploadImage.useMutation;
export const useCreateLikeMutation = newsApi.endpoints.addLike.useMutation;
export const useCreateUserMutation = newsApi.endpoints.createUser.useMutation;
export const useCreateNewsMutaion = newsApi.endpoints.createNews.useMutation;
export const useDeleteNewsMutaion = newsApi.endpoints.deleteNews.useMutation;
export const useUpdateNewsMutaion = newsApi.endpoints.updateNews.useMutation;
export const useUpdateUserMutaion = newsApi.endpoints.updateUser.useMutation;

export const newsReducer = newsApi.reducer;
export const newsPath = newsApi.reducerPath;
export const newsMiddleware = newsApi.middleware;
