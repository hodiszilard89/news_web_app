import { newsApi, useGetNewsByTypeQuery } from "../news/news-api"

import { useSelector } from "react-redux";
import { Type } from "../../models/type"; 


export const useGetNewsByType =  (typeId:Type["id"])=>{

   
    const { isLoading, isFetching, error } = useGetNewsByTypeQuery({id:-1,limit:12,side:0});
      const select = newsApi.endpoints.getNewsByType.select({id:-1,limit:12,side:0} );
      const { data } = useSelector(select);

     
      return {
        isLoading,
        isFetching,
        error,
        news:data

      };

}