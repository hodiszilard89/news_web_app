import { GetNewsQueryParams, useGetNewsQuery, newsApi } from "../news/news-api";
import {useSelector} from 'react-redux'
import { News } from "../../models/news"
import { selectSearchText } from "../news/search-slice";
import { newsFactory } from "../../utils/news_factory";
import { RawNews } from "../../models";

export const useNewsList = (query: GetNewsQueryParams) => {
  

  const select = newsApi.endpoints.getNewsList.select(query)
  const {data} = useSelector(select);
  const searchQuery = useSelector(selectSearchText)
  const queryParams = {
    ...query,
  }

  if (searchQuery){
    queryParams.search = searchQuery;
    queryParams.searchBy = "titel"
  }

  const {isLoading, isFetching, error} = useGetNewsQuery(query);
  let newsData:News[]=[];
  if (data) {
    newsData=data.map(newsFactory);
    //newsData = data.map(newsFactory)
  } else {
    newsData=[]
  }


  return {
    isLoading: isLoading || (!data && isFetching),
    isFetching,
    error,
    newsData,
  };
};
 