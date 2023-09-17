import React, { FC, useEffect, useCallback, FormEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectEditor,
  selectNews,
  setNews,
} from "../../store/news/editor-slice";
import { useOneNews } from "../../store/hooks/use-one-news";

import { createUser } from "../../utils/create-user";
import { News } from "../../models/news";
import { useParams } from "react-router-dom";
import { useNewsChancages } from "../../store/hooks/use-news-chancages";
import { NewsDescription } from "./news-description";
import { Comment } from "../../models/comment";
import { createComment } from "../../utils/create-comment";
import { selectAuthUser, setUser } from "../../store/news/auth-user-slice";
import { User } from "../../models/user";
import { useAuthHeader } from "react-auth-kit";
import { useAuthUser } from "react-auth-kit";
import { useGetUser } from "../../store/hooks/use-get-user";
import { serializeComment } from "../../utils/news_factory";

export const NewsDescProvider: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<"id">();
  const authHeader = useAuthHeader();
//   const auth = useAuthUser();
//   const authUserInStorage = auth();
// console.log(authUserInStorage);

const auth = useAuthUser();
const authUserInStorage = auth();
const { isLoading, user } = useGetUser(
  authUserInStorage && authUserInStorage.userId
);
  const [authUser, setAuthUser] = useState<User>();

  // const { isLoading, user: userFromServer } = useGetUser(
  //   authUserInStorage && authUserInStorage.userId
  // );

  useEffect(() => {
    setAuthUser(user);

   // console.log("lefut");
    dispatch(setUser(user));
  }, [user, dispatch]);


  const { addComment } = useNewsChancages();


  console.log("user from server",user)

  useEffect(() => {

    setAuthUser(user);
  }, [user, authUser]);

  const onSubmit = useCallback(
    
    async (comment: Comment) => {
      console.log("comment", comment);
      // console.log("comment", comment)
      // console.log("szerializált kommnet",serializeComment(comment))
      console.log("auth", authUser)
      //comment.writer = !;
      //console.log(comment);
     
      await fetch(`/comment`, {
        method: "POST",
        headers: {
          authorization: authHeader(),
          "Content-Type": "text/plan",
          accept: "text/plan",
        },
        body: JSON.stringify(serializeComment(comment)),
      });
    },
    [authUser]
  );
  const comment = createComment();
 // news && (comment.news = news);
  comment.writer = user!;
  //végtelen ciklus
  //   useEffect(() => {
  //     if (selectedNews) {
  //       dispatch(setNews(selectedNews));
  //     }
  //   }, [selectedNews, dispatch]);
  return (
    <div>
      {(
        <NewsDescription
        key={id}
          id={Number(id)}
          comment={comment}
          onSubmit={onSubmit}
        ></NewsDescription>
      )}
    </div>
  );
};
