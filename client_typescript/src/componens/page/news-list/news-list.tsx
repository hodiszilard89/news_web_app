import React, { FC, useEffect, useState, useMemo } from "react";
import { Grid, GridItem, ListItem, OrderedList } from "@chakra-ui/react";
import { useNewsList } from "../../../store/hooks/use-news-list";

import { GetNewsQueryParams } from "../../../store/news/news-api";
import { NewsListItem } from "./news-list-item";
import { News } from "../../../models";

export const NewsList: FC = () => {
  let query: GetNewsQueryParams;
  const [newsDataState, setNewsDataState] = useState<News[]>();
  query = {};
  const { newsData } = useNewsList(query);
  //const { newsData } = useNewsList(query);

  const data = useMemo(() => newsData, [newsData]);

  useEffect(() => {
    console.log(data);
    setNewsDataState(data);
  }, [data]);

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
        newsDataState.map((news) => (
          <GridItem as={ListItem} key={news.id}>
            <NewsListItem key={news.id} news={news} />
          </GridItem>
        ))}
    </Grid>
  );
};
