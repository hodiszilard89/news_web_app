import { useMemo } from "react";
import { useSelector} from "react-redux";
import {GetNewsQueryParams, newsApi, useGetTypesQuery} from "../news/news-api";
import { Type } from "../../models/type";

 export const useNewsTypes = ()=>{
    const select =  newsApi.endpoints.getTypes.select();
    const { isLoading, isFetching, error } = useGetTypesQuery();
    const { data } = useSelector(select);   
    
    let types:Type[]=[];
    if (data) {
      types = data
      
    } else {
      
    }

   // types.map(type => console.log("use "+type))
    return {
        isLoading: isLoading || (!data && isFetching),
        error,
        types,
      };
 }