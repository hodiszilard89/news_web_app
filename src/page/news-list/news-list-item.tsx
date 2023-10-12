import React, {
  FC,
  useCallback,
  useState,
  useEffect,
  useDeferredValue,
} from "react";

import { Card, Row, Col } from "react-bootstrap";
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
import { createUser } from "../../utils/create-user";
import { setNewsTypeId } from "../../store/news/news-slice";
import { useUserChancages } from "../../store/hooks/use-user-chancages";
import { useCreateLikeMutation } from "../../store/news/news-api";
import { KeyLike } from "jose";
import { Like } from "../../models/like";

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
  const userInState= useSelector(selectAuthUser).user
  const [user, setUser] =useState<User|undefined>(userInState);
//useEffect(()=>{setNews(fromState)},[fromState])
  const [addLike] = useCreateLikeMutation();


  const onClick = useCallback(() => {
    dispach(setNewsEditSlice(serializNews(news)));
  }, [news]);


  useEffect(()=>{setUser(userInState)},[userInState])

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
      // console.log("user likolt hírei ", user?.likednews.map(serializNews));
      // console.log("hírei amit keresek ", serializNews(news));
      //const newLikes = user && [...user?.likes, news];
      //belső state manuipulálása
      // await setLoggedUser((prevState) => ({
      //   ...prevState,
      //   likes: [],
      // }));
       setNews({ ...news, likes: news.likes?.find((item)=>item.id===user?.id)
          ? news.likes.filter((item)=>item.id!==user?.id)
          :news.likes?.concat(user!)});

  
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
    // console.log(user)
    
    // console.log(
    //   "feltétel kiértékelés ",
    //   user!.likednews.find((item) => item.id === news.id)
    // );
 
    return (
      <Col>
        <Link to="/">
          <FaThumbsUp
            className="me-2 fs-5 "
            style={
              news.likes?.find((item) => item.id === user?.id)
                ? { color: "blue" }
                : { color: "gray" }
            }
            onClick={() =>{ user?userDidLike(news):window.confirm("jelentkezz be!")}}
          />
        </Link>
        {news.likes!.length}
      </Col>
    );
  }, [user?.likednews, userInState]);

  return (
    <Card>
      {menu()}
      <Card.Body>
        {"newsID: "+news.id+"  stateID:"}
        {stateId}
        <Link to={`/news/${stateId}`} onClick={onClick}>
          <Card.Title>
            <h4>
              <b>{news.title}</b>
            </h4>
          </Card.Title>
          {/* <Link to={`/edit/${news.id}`}> */}
          <Card.Img
            src={news.imgPath}
            onClick={onClick}
            style={{ width: "00px", height: "150px" }}
          />
          {/* </Link> */}

          <Card.Subtitle className="my-2 text-muted"></Card.Subtitle>
          {news.subtitle}
          <Card.Text>{news.text.substring(0, 50)}...</Card.Text>
        </Link>
        <Row>
          <Col>{likeButton()}</Col>
          <Col className="text-end">
            {}
            <p>szerző: {news.writer?.chatName}</p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
