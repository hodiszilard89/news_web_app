import React, { FC } from "react";
import { Box, Flex } from "@chakra-ui/react";

import MyCarousel from "../basic-comp/new-carousel";

import { News } from "../../models/news";
import { NewsList } from "./news-list/news-list";

import {NewNavbar} from "../basic-comp/navbar/new-navbar";
//import { PageFooter } from "./page-footer";

export const HomePage: FC = () => {
  return (
    <Box>
      <Flex marginX="auto" maxWidth="7xl" flexDir="column" height="full">
        <Box flexGrow={1}>
          <NewNavbar />
          <MyCarousel news={[]}/>
          <NewsList news={[]} />
        </Box>
      </Flex>
    </Box>
  );
};
