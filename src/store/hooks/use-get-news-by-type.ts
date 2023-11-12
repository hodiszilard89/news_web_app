import { newsApi, useGetNewsByTypeQuery } from "../news/news-api"

import { useSelector } from "react-redux";
import { Type } from "../../models/type"; 


export const useGetNewsByType =  (typeId:Type["id"])=>{

   
    const { isLoading, isFetching, error } = useGetNewsByTypeQuery(typeId);
      const select = newsApi.endpoints.getNewsByType.select(typeId );
      const { data } = useSelector(select);

     
      return {
        isLoading,
        isFetching,
        error,
        news:data

      };

}