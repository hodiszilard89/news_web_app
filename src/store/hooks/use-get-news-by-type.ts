import { newsApi, useGetNewsByTypeQuery } from "../news/news-api"
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Type } from "../../models/type"; 


export const useGetNewsByType =  (typeId:Type["id"])=>{
    //console.log(typeId)
   
    const { isLoading, isFetching, error } = useGetNewsByTypeQuery(typeId);
      const select = newsApi.endpoints.getNewsByType.select(typeId );
      const { data } = useSelector(select);
    
      const news = useMemo(
        ()=>
           data ,
        [data]);
    
      // console.log("getnewsbytype",data);
      // console.log("isLoading",isLoading);
      // console.log("isFeatching",isFetching);
      //const user = data as User;
     
      return {
        isLoading: isLoading || (!data && isFetching),
        error,
        news
        //news: data?? data,
      };
    // const {isLoading,isFetching, error} = useGetNewsByTypeQuery(typeId,{skip:!typeId});
    // const select =  newsApi.endpoints.getNewsByType.select(typeId);

    // console.log(error)
    // const { data } = useSelector(select);   
    
    // let newsByType:News[]=[];
    // if (data) {
    //   newsByType = data
      
    // } else {
      
    // }
    // return {
    //     isLoading: isLoading || (!data && isFetching),
    //     error,
    //     newsByType,
    //   };
}