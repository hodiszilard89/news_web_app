import { useSelector } from "react-redux";
import { GetTokenQueryParams, useGetTokenQuery, newsApi } from "../news/news-api";
import { isConstructorDeclaration } from "typescript";
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useEffect, useMemo } from "react";

export interface Token {
    role: string;
    iss: string;
    username: string;
    id: number;
  }

export const useGetToken = (params:GetTokenQueryParams)=>{
    const {isLoading,isFetching, error}=useGetTokenQuery(params, {skip:params.email==""})
    
    const select = newsApi.endpoints.getToken.select(params);
    const {data} = useSelector(select);
    let  serverErrors;
    if (error&&('data'in error)) serverErrors=error;

    const tokenValue = useMemo(()=>data?.value,[data])



    return {
        tokenValue,
        serverErrors, isFetching, isLoading
    }
}