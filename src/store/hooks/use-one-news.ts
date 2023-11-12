import { useMemo } from "react";
import { useSelector } from "react-redux";
import {newsFactory} from "../../utils/news_factory"


import { newsApi, useGetOneNewsQuery } from "../news/news-api";

export const useOneNews = (newsId: number) => {
  const { isLoading, isFetching, error } = useGetOneNewsQuery(newsId, {
    skip: !newsId,
  });
  const select = newsApi.endpoints.getOneNews.select(newsId );
  const { data } = useSelector(select);

  const news = useMemo(
    ()=>
       data && newsFactory(data),
    [data]);


 
  return {
    isLoading: isLoading || (!data && isFetching),
    error,
    news
  };
};
