
export const securityApi = (()=>{}) 

//import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { newsApi } from "../news/news-api";
// import { RootState } from "../store";

// export interface GetTokenQueryParams {
//   username: string;
//   password: string;
// }

// export interface GetTokenResponse {
//   token:string
// }

// export const securityApi = createApi({
//   //reducerPath: "securityApi",
//   baseQuery: fetchBaseQuery(),
//   endpoints: (builder) => ({
//     getToken: builder.query<string, GetTokenQueryParams>({
//       query: (params: GetTokenQueryParams) => ({
//         url: "/authentication",
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Accept": "text/plain; charset=utf-8",
//         },
//         body:{
//           username: params.username,
//           password: params.password,
//         },
//       }),
//     }),
//   }),
// });

// export const useGetTokenQuery = securityApi.endpoints.getToken.useQuery;


// //SELECTOROK
// //export const selectGetToken = (state:RootState) => state.securityApi;

// // export const securityReducer = securityApi.reducer;
// // export const securityPath = securityApi.reducerPath;
// // export const securityMiddleware = securityApi.middleware;
