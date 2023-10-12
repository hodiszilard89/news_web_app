import React, { FC, useEffect, useState, useMemo, useCallback } from "react";
import { Grid, GridItem, ListItem, OrderedList } from "@chakra-ui/react";
import { useNewsList } from "../../store/hooks/use-news-list";

import { GetNewsQueryParams } from "../../store/news/news-api";
import { NewsListItem } from "./news-list-item";
import { News, RawNews } from "../../models";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTypeId,
  selectNews,
  setNews,
  setPriorityNews,
} from "../../store/news/news-slice";
import { useGetNewsByType } from "../../store/hooks/use-get-news-by-type";
import { serializNews } from "../../utils/news_factory";
import { newsFactory } from "../../utils/news_factory";
import { selectSearchText } from "../../store/news/search-slice";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

export const NewsList: FC = () => {
  let query: GetNewsQueryParams;
  const [newsDataState, setNewsDataState] = useState<RawNews[]>();
  query = {};
  const [id, setId] = useState<number>(-1);

  const dispatch = useDispatch();
  const text = useSelector(selectSearchText);
  console.log("search text", text)
  const idFromState = useSelector(selectTypeId);
  const { news, isLoading, isFetching } = useGetNewsByType(id);
  //const data = useMemo(() => news, [news]);

  const prioritis = news?.filter((news) => news.priority);
 

  useEffect(()=>{setId(idFromState!)},[idFromState])
  useEffect(() => {
    
   
    if (!text)
          {news && setNewsDataState(news.map(serializNews))
            news && dispatch(setNews(news.map(serializNews)))}
          else
          {setNewsDataState(news?.filter((news)=>(news.title.includes(text))).map(serializNews))
            news && dispatch(setNews(news?.filter((news)=>(news.title.includes(text))).map(serializNews)))}
    
    prioritis && dispatch(setPriorityNews(prioritis.map(serializNews)));
  }, [news, dispatch, id, text]);
  // useEffect(()=>{console.log("newsdataState ",newsDataState)},[newsDataState])
  console.log("news Data State,",newsDataState);
  return (

        <Grid
          as={OrderedList}
          templateColumns="repeat(4, 1fr)"
          sx={{
            gap: 12,
            listStyleType: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {newsDataState &&
            newsDataState.map((news, id) => (
              <GridItem as={ListItem} key={id}>
                <NewsListItem key={news.id} stateId={id} news={newsFactory(news)} />
              </GridItem>
            ))}
        </Grid>
    
  );
};
