import { FC, useEffect, useState } from "react";
import {
  Grid,
  GridItem,
  ListItem,
  OrderedList,
  Box,
  Button,
  Flex,
} from "@chakra-ui/react";

import { NewsListItem } from "./news-list-item";
import { RawNews } from "../../models";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTypeId,
  setNews,
  setPriorityNews,
} from "../../store/news/news-slice";
import { useGetNewsByType } from "../../store/hooks/use-get-news-by-type";
import { serializNews } from "../../utils/news_factory";
import { newsFactory } from "../../utils/news_factory";
import { selectSearchText } from "../../store/news/search-slice";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const NewsList: FC = () => {
  const itemsPerPage = 12;
  const [id, setId] = useState<number>(-1);
  const dispatch = useDispatch();
  const { news: allNews } = useGetNewsByType(id);
  const [newsDataState, setNewsDataState] = useState<RawNews[]>([]);
  //LAPOZÁS

  //const currentNews = newsDataState.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(newsDataState.length / itemsPerPage);
  const [pageIndex, setPageIndex] = useState(0);

  //...LAPOZÁS VÉGE
  const searchText = useSelector(selectSearchText);
  const idFromState = useSelector(selectTypeId);
  //const [pageIndex, setPageIndex] = useState(0)
  const prioritis = allNews?.filter((news) => news.priority);

  useEffect(() => {
    setId(idFromState!);
  }, [idFromState]);
  useEffect(() => {
    setPageIndex(0);
    if (!searchText) {
      allNews && setNewsDataState(allNews.map(serializNews));
      allNews && dispatch(setNews(allNews.map(serializNews)));
    } else {
      allNews &&
        setNewsDataState(
          allNews
            ?.filter((news) => news.title.includes(searchText))
            .map(serializNews)
        );
      allNews &&
        dispatch(
          setNews(
            allNews
              ?.filter((news) => news.title.includes(searchText))
              .map(serializNews)
          )
        );
    }

    prioritis && dispatch(setPriorityNews(prioritis.map(serializNews)));
  }, [allNews, dispatch, id, searchText]);
  return (
    <Box>
      <Grid
        as={OrderedList}
        templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" }}
        sx={{
          gap: 12,
          listStyleType: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {newsDataState
          .slice(
            pageIndex * itemsPerPage,
            pageIndex * itemsPerPage + itemsPerPage
          )
          .map((news, id) => (
            <GridItem as={ListItem} key={id}>
              <NewsListItem
                key={news.id}
                stateId={id}
                news={newsFactory(news)}
              />
            </GridItem>
          ))}
      </Grid>
      <Box mt={10} textAlign={"center"}>
        <Flex justifyItems="center" justify="space-between">
          <Button
            isDisabled={pageIndex === 0}
            onClick={() => {
              setPageIndex(pageIndex - 1);
            }}
            m={2}
            pe={5}
            leftIcon={<FaArrowLeft />}
          >
            Előző
          </Button>
          <Box ms={5} me={5} justifyContent={"center"}>
            {pageIndex + 1} .oldal
          </Box>

          <Button
            ps={5}
            isDisabled={pageIndex + 1 === totalPages}
            onClick={() => {
              setPageIndex(pageIndex + 1);
            }}
            rightIcon={<FaArrowRight />}
          >
            Következő
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};
