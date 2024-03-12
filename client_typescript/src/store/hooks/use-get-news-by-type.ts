import { GetRequestParamsForNewsQuery, newsApi, useGetNewsByTypeQuery } from "../news/news-api"

import { useSelector } from "react-redux";
import { Type } from "../../models/type"; 


export const useGetNewsByType =  (params:GetRequestParamsForNewsQuery)=>{

   
    const { isLoading, isFetching, error } = useGetNewsByTypeQuery(params);
      const select = newsApi.endpoints.getNewsByType.select(params );
      const { data } = useSelector(select);

     
      return {
        isLoading,
        isFetching,
        error,
        news:data

      };

}