import React, { FC } from "react";
import { Box, Flex } from "@chakra-ui/react";
import  NewCarousel  from "../basic-comp/new-carousel";


import { News } from "../../models/news";
import { NewsList } from "./news-list/news-list";

import {NewNavbar} from "../basic-comp/navbar/new-navbar";


export const HomePage: FC = () => {
  return (
    <div>
      <Flex marginX="auto" maxWidth="7xl" flexDir="column" height="full">
        <Box flexGrow={1}>
          <NewNavbar />
          <NewCarousel news ={[]} />
          <NewsList news={[]} />
        </Box>
      </Flex>
    </div>
  );
};
