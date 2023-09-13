import React, { FC, useEffect, useState, useMemo, useCallback } from "react";
import { Grid, GridItem, ListItem, OrderedList } from "@chakra-ui/react";
import { useNewsList } from "../../store/hooks/use-news-list";

import { GetNewsQueryParams } from "../../store/news/news-api";
import { NewsListItem } from "./news-list-item";
import { News, RawNews } from "../../models";
import { useDispatch, useSelector } from "react-redux";
import { selectId, selectNews, setNews } from "../../store/news/news-slice";
import { useGetNewsByType } from "../../store/hooks/use-get-news-by-type";
import { serializNews } from "../../utils/news_factory";
import { newsFactory } from "../../utils/news_factory";


export const NewsList: FC = () => {
  let query: GetNewsQueryParams;
  const [newsDataState, setNewsDataState] = useState<News[]>();
  query = {};
   const [id, setId] = useState<number>(0);
  //const { newsData } = useNewsList(query);
  //const [ news ] = useGetNewsByType(0);
  const dispatch = useDispatch();
  //const data:News[] = useMemo(() => newsData, [newsData]);

  const idFromState = useSelector(selectId);

  

  const globalStateNews = useSelector(selectNews);
  const {news} = useGetNewsByType(id);
  const data = useMemo(() => news, [news]);
  // useEffect(()=>{
   //const {news as news2} = useSelector(selectNews);
  // },[id])
  //const data= useMemo(() => news, [news]);
  //const data:News[]=[]
 
  //console.log("news ",news)
   
  //console.log("data ",data)
  useEffect(() => {
    //console.log("változik");
    //NEM KELL EZ A SOR MERT NEM INNNEN ÁLLÍTOM!!!!!!!!!!!!!!
    //dispatch(setNews(data))
    setId(idFromState!)
    data&&setNewsDataState(data);
    data&&dispatch(setNews(data.map(serializNews)))
  }, [data,idFromState]);
 // useEffect(()=>{console.log("newsdataState ",newsDataState)},[newsDataState])
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
      {
       // console.log(newsDataState);
     // newsDataState &&
        globalStateNews.map((news, id) => (
          // <GridItem as={ListItem} key={news.id}>
          //   <NewsListItem key={news.id} news={news} />
          // </GridItem>
          <GridItem as={ListItem} key={id}>
            <NewsListItem key={id} stateId={id} news={newsFactory(news)} />
          </GridItem>
        ))}
    </Grid>
  );
};
