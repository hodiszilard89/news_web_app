import React, { FC } from "react";
import { Grid, GridItem, ListItem, OrderedList } from "@chakra-ui/react";
import { useNewsList } from "../../../store/hooks/use-news-list";

import { GetNewsQueryParams } from "../../../store/news/news-api";
import { NewsListItem } from "./news-list-item";
import { News } from "../../../models/news";

interface NewsListItemProps {
  news: News[];
}

export const NewsList: FC<NewsListItemProps> = ({ news }) => {
  let query: GetNewsQueryParams;
  query = {};
  const { newsData } = useNewsList(query);
  //console.log();
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
      {newsData.map((news) => (
        <GridItem as={ListItem} key={news.id}>
          <NewsListItem key={news.id} news={news} />
        </GridItem>
      ))}
    </Grid>
  );
};
