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
  selectSide,
  selectTypeId,
  setNews,
  setSide,
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
    //LAPOZÁS

  //const currentNews = newsDataState.slice(indexOfFirstItem, indexOfLastItem);
  const [newsDataState, setNewsDataState] = useState<RawNews[]>([]);
 //const totalPages = Math.ceil(newsDataState.length / itemsPerPage);
  const [pageIndex, setPageIndex] = useState(useSelector(selectSide));

  const { news: allNews } = useGetNewsByType({limit:15, typeId:id, side:pageIndex});


  //...LAPOZÁS VÉGE
  const searchText = useSelector(selectSearchText);
  const idFromState = useSelector(selectTypeId);
  //const [pageIndex, setPageIndex] = useState(0)
  const prioritis = allNews?.newsList.filter((news) => news.priority);
  //const prioritis = allNews?.news;
  useEffect(() => {
    setId(idFromState!);
    setPageIndex(0);
  }, [idFromState]);
  useEffect(() => {
    //const c = useSelector(selectSide);
    //setPageIndex(c)
    if (!searchText) {
      allNews && setNewsDataState(allNews.newsList.map(serializNews));
      allNews && dispatch(setNews(allNews.newsList.map(serializNews)));
    } else {
      allNews &&
        setNewsDataState(
          allNews.newsList
            ?.filter((news) => news.title.includes(searchText))
            .map(serializNews)
        );
      allNews &&
        dispatch(
          setNews(
            allNews.newsList
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
              //dispatch(setSide(pageIndex))
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
            isDisabled={allNews?.lastSide}
            onClick={() => {
              setPageIndex(pageIndex + 1);
             // dispatch(setSide(pageIndex))
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
