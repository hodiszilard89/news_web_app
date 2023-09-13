import {
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { User } from "../../models/user";
import { Comment } from "../../models/comment";
import { RawNews, News } from "../../models";

import { RootState } from "../../store/store";
import { useAuthUser } from "react-auth-kit";
import { useSelector, useDispatch } from "react-redux";
import { Type } from "../../models/type";
import { Token } from "../../models/token";

import { BaseQueryApi, BaseQueryFn } from "@reduxjs/toolkit/dist/query/baseQueryTypes";

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
  username: string;
  password: string;
}
export interface GetNewsQueryParams {
  type?: Type[];
  offset?: number;
  sortBy?: string;
  // filter?:Type[];
  limit?: number;
  id?: number;
  search?: string;
  searchBy?: "titel";
}

export const storage = window.localStorage;
const newsTag: string = "NEWS";
const userTag: string = "USER";
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
  }) as BaseQueryFn<string | FetchArgs, unknown, customError,{}>,
  tagTypes: [newsTag, userTag],

  endpoints: (builder) => ({
    getToken: builder.query<Token, GetTokenQueryParams>({
      query: (params: GetTokenQueryParams) => ({
        url: "/authentication",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: {
          username: params.username,
          password: params.password,
        },
      }),
      //transformResponse:(response:{data:[]})=>response.data;
    }),
    getNewsList: builder.query<
      RawNews[] | undefined,
      GetNewsQueryParams | undefined
    >({
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

    getNewsByType: builder.query<News[], Type["id"]>({
      query: (typeId: Type["id"]) => ({
        url: `/news/type/${typeId}`,
        method: "GET",
      }),
      providesTags: (result?: News[]) => {
        return result && Array.isArray(result)
          ? [
              ...result.map(({ id }) => ({ type: newsTag, id })),
              { type: newsTag, id: "LIST" },
            ]
          : [{ type: newsTag, id: "LIST" }];
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
    }),
    getTypes: builder.query<Type[], void>({
      query: () => ({
        url: `/news/gettypes`,
      }),
      //providesTags: (_result, _error, id) => ([{ type: MovieTag, id }]),
    }),
    createNews: builder.mutation<RawNews, RawNews>({
      query: (news: RawNews) => ({
        url: "/news",
        method: "POST",
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          Accept: "text/plain; charset=utf-8",
        },
        body: JSON.stringify(news),
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
    updateUser: builder.mutation<User, User>({
      query: (user: User) => ({
        url: "/users",
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json; charset=utf-8",
        },
        body: user,
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
          "Content-Type": "text/plain; charset=utf-8",
          accept: "text/plain; charset=utf-8",
        },

        body: JSON.stringify(user),
      }),
    }),
    addComment: builder.mutation<void, Comment>({
      //első paraméter amit visszakapunk 2. amit küldünk

      query: (comment: Comment) => ({
        url: "/comment",
        method: "POST",
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          accept: "text/plain; charset=utf-8",
        },

        body: JSON.stringify(comment),
      }),
    }),
    // addUser: builder.mutation<User, User>({
    //   //első paraméter amit visszakapunk 2. amit küldünk
    //   query: (user: User) => ({
    //     url: "/users",
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "text/plain",
    //       accept: "text/plain; charset=utf-8",
    //     },

    //     body: JSON.stringify(user),
    //   }),
    // }),
  }),
});

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
export const useCreateUserMutation = newsApi.endpoints.createUser.useMutation;
export const useCreateNewsMutaion = newsApi.endpoints.createNews.useMutation;
export const useDeleteNewsMutaion = newsApi.endpoints.deleteNews.useMutation;
export const useUpdateNewsMutaion = newsApi.endpoints.updateNews.useMutation;
export const useUpdateUserMutaion = newsApi.endpoints.updateUser.useMutation;

export const newsReducer = newsApi.reducer;
export const newsPath = newsApi.reducerPath;
export const newsMiddleware = newsApi.middleware;
