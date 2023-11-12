import { FC } from "react";
import { Box, ChakraProvider, Flex, Grid } from "@chakra-ui/react";

import { NewsList } from "./news-list/news-list";

import { useSelector } from "react-redux";

import { selectNews } from "../store/news/news-slice";
import { newsFactory } from "../utils/news_factory";
import { Footer } from "../componens/basic-comp/footer";
import { NewNavbar } from "../componens/basic-comp/navbar/new-navbar";

import MyCarousel from "../componens/basic-comp/new-carousel";

export const HomePage: FC = () => {
  const priority = useSelector(selectNews)
    .filter((news) => news.priority)
    .map(newsFactory);

  return (
    <ChakraProvider>
      <Box margin={"auto"} w={"80%"}>
        <NewNavbar />

        <Box>
          <Flex maxWidth="auto" flexDir="column" height="full">
            <Box flexGrow={3}>
           
              {!!priority.length &&
                <Box display={{ base: "none", md: "block" }}>
                  <Grid
                    marginBottom={10}
                    h={"550px"}
                    templateColumns={{ md: "1fr", lg: "3fr 1fr" }}
                  >
                    <MyCarousel news={priority} />
                  </Grid>
                </Box>
              }
              <NewsList />
              <Footer />
            </Box>
          </Flex>
        </Box>
      </Box>
    </ChakraProvider>
  );
};
