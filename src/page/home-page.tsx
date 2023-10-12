import React, { FC, useEffect, useState } from "react";
import { Box, Flex, position } from "@chakra-ui/react";
import { MyCarousel } from "../componens/alap-comp/my-carousel";
import { Container } from "react-bootstrap";

import { NewsList } from "./news-list/news-list";
import { setUser } from "../store/news/auth-user-slice";
import MyNavbar from "../componens/alap-comp/navbar/navbar";
import { useDispatch, useSelector } from "react-redux";

import { useAuthUser } from "react-auth-kit";

import { useGetUser } from "../store/hooks/use-get-user";
import { User } from "../models/user";
import { selectNews } from "../store/news/news-slice";
import { newsFactory } from "../utils/news_factory";

export const HomePage: FC = () => {
  const dispach = useDispatch();

  // const auth = useAuthUser();
  // const authUserInStorage = auth();

  // const [authUser, setMyAuthUser] = useState<User>();

  // const { isLoading, data } = useGetUser(authUserInStorage?.id);

  // useEffect(() => {
  //   setMyAuthUser(data);
  //   console.log(authUser);
  //     dispach(setUser(data));
  // }, [data]);

  // let arr=[] as number[];
  const priority = useSelector(selectNews).filter(news=>news.priority).map(newsFactory);
  // for (let i = 0; i < priority.length; i++) {
  //   if (priority[i].priority) {
  //     arr.push(priority[i].id!);
  //   }
  // }

  return (
    <>
      <MyNavbar/>
      <Container >
        <Flex marginX="auto" maxWidth="auto" flexDir="column" height="full">
          <Box flexGrow={3}>
            <MyCarousel arr={priority} />
            <NewsList />
          </Box>
        </Flex>
      </Container>
    </>
  );
};
