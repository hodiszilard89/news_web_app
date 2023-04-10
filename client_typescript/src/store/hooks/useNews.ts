import { GetNewsQueryParams, useGetNewsQuery, newsApi } from "../news/news-api";
import {useSelector} from 'react-redux'
import { News } from "../../models/news"
import { GetNewsResponse } from "../news/news-api"

export const useNews = (query: GetNewsQueryParams) => {
  
  const {isLoading, isFetching, error} = useGetNewsQuery(query);
  const select = newsApi.endpoints.getNews.select(query)
  const {data} = useSelector(select);
 
  const newsFactory=(rawNewsData:GetNewsResponse)=>{
    return{
      ...rawNewsData
    }
  }


  let newsData:News[]=[];


  if (data) {
    
    newsData = data
  } else {
    
  }


  return {
    isLoading: isLoading || (!data && isFetching),
    isFetching,
    error,
    newsData,
  };
};
 