import React, { FC } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { MyCarousel } from "../my-carousel";
import { Container } from "react-bootstrap";

import { News } from "../../models/news";
import { NewsList } from "./news-list/news-list";

import MyNavbar from "../navbar";
//import { PageFooter } from "./page-footer";

export const HomePage: FC = () => {
  return (
    <Container>
      <Flex marginX="auto" maxWidth="7xl" flexDir="column" height="full">
        <Box flexGrow={1}>
          <MyNavbar />
          <MyCarousel />
          <NewsList />
        </Box>
      </Flex>
    </Container>
  );
};
