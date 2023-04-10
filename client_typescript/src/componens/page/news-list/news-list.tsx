import React, { VFC } from "react";
import { Grid, GridItem, ListItem, OrderedList } from "@chakra-ui/react";
import { useNews } from "../../../store/hooks/useNews";
import { User } from "../../../models/user";
import { GetNewsQueryParams } from "../../../store/news/news-api";
import { NewsListItem } from "./news-list-item";

export const NewsList: VFC = () => {
  let query: GetNewsQueryParams;
  query = {};
  const { newsData } = useNews(query);
  console.log(newsData);
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
