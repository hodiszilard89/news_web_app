import React, { FC, useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { MyCarousel } from "./alap-comp/my-carousel";
import { Container } from "react-bootstrap";

import { NewsList } from "../page/news-list/news-list";
import { setUser } from "../store/news/auth-user-slice";
import MyNavbar from "./alap-comp/navbar/navbar";
import { useDispatch } from "react-redux";

import { useAuthUser } from "react-auth-kit";

import { useGetUser } from "../store/hooks/use-get-user";
import { User } from "../models/user";

//import { PageFooter } from "./page-footer";

export const HomePage: FC = () => {
  const dispach = useDispatch();
  //const news = createRawNews();
  const auth = useAuthUser();
  const authUserInStorage = auth();

  const [authUser, setAuthUser] = useState<User>();

  const { isLoading, user } = useGetUser(authUserInStorage?.userId);
  //if (!isLoading) console.log(user);
  useEffect(() => {
    setAuthUser(user);
    // dispach(setNews(news));

    dispach(setUser(user));
  }, [user, dispach, authUser]);

  return (
    <>
      <MyNavbar />
      <Container>
        <Flex marginX="auto" maxWidth="auto" flexDir="column" height="full">
          <Box flexGrow={3}>
            <MyCarousel />
            <NewsList />
          </Box>
        </Flex>
      </Container>
    </>
  );
};
