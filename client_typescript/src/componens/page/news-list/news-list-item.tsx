import React, { FC, useCallback, useState, useEffect } from "react";

import { Card, Row, Col } from "react-bootstrap";
import { FaNewspaper, FaThumbsUp, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthUser, useSignOut } from "react-auth-kit";
import { News } from "../../../models/news";
import { useDispatch, useSelector } from "react-redux";
import { showEditor, setNews } from "../../../store/news/editor-slice";
import { serializeNews } from "../../../utils/news_factory";
import { NewsItemMenu } from "./news-item-menu";
import {
  authUserSlice,
  selectAuthUser,
} from "../../../store/news/auth-user-slice";
import { User } from "../../../models/user";
import { createUser } from "../../../utils/create-user";

export interface NewsListItemProps {
  news: News;
}

export const NewsListItem: FC<NewsListItemProps> = ({ news }) => {
  const id = news.id;
  const dispach = useDispatch();
  const auth = useAuthUser();
  const authUser = auth();
  const { user, token } = useSelector(selectAuthUser);
  const [loggedUser, setLoggedUser] = useState<User>(createUser());

  const onClick = () => {
    dispach(setNews(serializeNews(news)));
  };

  useCallback(() => user && setLoggedUser(user), []);
  const menu = useCallback(() => {
    if (authUser !== null && authUser.role.includes("ADMIN")) {
      return (
        <NewsItemMenu
          //onDelete={onDelete}
          //sx={style.menu}
          newsId={news.id!}
          news={news!}
          placement="bottom-end"
        />
      );
    }
    return <></>;
  }, [authUser]);

  const userDidLike = async () => {
    const newLikes = user && [...user?.likes, news];
    //console.log(newLikes);
    await setLoggedUser((prevState) => ({
      ...prevState,
      likes: newLikes ? newLikes : [],
    }));
    console.log("loggedUser", loggedUser);
  };

  //useEffect(() => console.log(loggedUser), [loggedUser]);

  return (
    <Card>
      {menu()}
      <Card.Body>
        <Card.Title>
          <h4>
            <b>{news.title}</b>
          </h4>
        </Card.Title>
        <Link to={`/edit/${news.id}`}>
          <Card.Img
            src={news.imgPath}
            onClick={onClick}
            style={{ width: "300px", height: "150px" }}
          />
        </Link>
        <Link to={`/news/${news.id}`}>
          <Card.Subtitle className="my-2 text-muted"></Card.Subtitle>
          {news.subtitle}
          <Card.Text>{news.text.substring(0, 50)}...</Card.Text>
        </Link>
        <Row>
          <Col>
            <Link to="/">
              <FaThumbsUp
                className="me-2 fs-5 "
                style={{ color: "gray" }}
                onClick={userDidLike}
              />
            </Link>
            ({news.likes && news.likes.length})
          </Col>
          <Col className="text-end">
            {}
            <p>szerző: {news.writer?.chatName}</p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
