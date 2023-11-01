import React, {
  FC,
  useCallback,
  useState,
  useEffect,
  useDeferredValue,
} from "react";

import { Row, Col } from "react-bootstrap";
import {
  Card,
  Box,
  CardBody,
  CardHeader,
  Image,
  Text,
  Flex,
} from "@chakra-ui/react";
import { FaNewspaper, FaThumbsUp, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthUser, useSignOut } from "react-auth-kit";
import { News } from "../../models/news";
import { useDispatch, useSelector } from "react-redux";
import {
  showEditor,
  setNews as setNewsEditSlice,
} from "../../store/news/editor-slice";
import { serializNews } from "../../utils/news_factory";
import { NewsItemMenu } from "./news-item-menu";
import {
  authUserSlice,
  selectAuthUser,
} from "../../store/news/auth-user-slice";
import { User } from "../../models/user";

import { useCreateLikeMutation } from "../../store/news/news-api";

export interface NewsListItemProps {
  news: News;
  stateId: number;
}

export const NewsListItem: FC<NewsListItemProps> = ({
  news: fromState,
  stateId,
}) => {
  const dispach = useDispatch();
  const auth = useAuthUser();
  const authUser = auth();
  const [news, setNews] = useState<News>(fromState);
  const userInState = useSelector(selectAuthUser).user;
  const [user, setUser] = useState<User | undefined>(userInState);
  //useEffect(()=>{setNews(fromState)},[fromState])
  const [addLike] = useCreateLikeMutation();

  const onClick = useCallback(() => {
    dispach(setNewsEditSlice(serializNews(news)));
  }, [news]);

  useEffect(() => {
    setUser(userInState);
  }, [userInState]);

  //useCallback(() => user && setLoggedUser(user), []);
  const menu = useCallback(() => {
    //  console.log("state id",stateId)
    if (authUser !== null && authUser.role.includes("ADMIN")) {
      return (
        <NewsItemMenu
          stateId={stateId}
          //newsId={news.id!}
          placement="bottom-end"
        />
      );
    }
    return <></>;
  }, [authUser, stateId]);

  const userDidLike = useCallback(
    (news: News) => {
      setNews({
        ...news,
        likes: news.likes?.find((item) => item.id === user?.id)
          ? news.likes.filter((item) => item.id !== user?.id)
          : news.likes?.concat(user!),
      });

      setUser({
        ...user!,
        likednews: user?.likednews.find((item) => item.id === news.id)
          ? user!.likednews.filter((item) => item.id !== news.id)
          : user!.likednews.concat(news),
      });
      if (user) {
        addLike({ user: user, news: serializNews(news) });
      } else {
        window.confirm("jelentkezz be");
      }
      //updateUser(loggedUser)
      //console.log("Like", {user:loggedUser,news:serializNews(news)} as Like);
    },
    [user?.likednews, news, user]
  );

  const likeButton = useCallback(() => {
    return (
      <Box display={"inline-flex"}>
        <Link to="/">
          <FaThumbsUp
            className="me-2 fs-5 "
            style={
              news.likes?.find((item) => item.id === user?.id)
                ? { color: "blue" }
                : { color: "gray" }
            }
            onClick={() => {
              user ? userDidLike(news) : window.confirm("jelentkezz be!");
            }}
          />
        </Link>
        {news.likes!.length}
      </Box>
    );
  }, [user?.likednews, userInState]);

  return (
    <Card padding={0}>
      {menu()}
      <CardBody margin={0}>
        <Link to={`/news`} onClick={onClick}>
          <CardHeader padding={0}>
            <h4>
              <b>{news.title}</b>
            </h4>
          </CardHeader>
          {/* <Link to={`/edit`}> */}
          {news.imgPath && (
            <Image
              src={news.imgPath}
              onClick={onClick}
              style={{ width: "100%", height: "150px" }}
            />
          )}
          {/* </Link> */}

          {news?.subtitle ? news.subtitle : ""}
          <Text>{news.text?.substring(0, 50)}...</Text>
        </Link>

        <Flex justifyItems="center" justify="space-between" margin={0}>
          {likeButton()}
          <Text>szerző: {news.writer?.chatName}</Text>
        </Flex>
      </CardBody>
    </Card>
  );
};
