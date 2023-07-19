import React, { FC, useEffect, useCallback, FormEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectEditor,
  selectNews,
  setNews,
} from "../../../store/news/editor-slice";
import { useOneNews } from "../../../store/hooks/use-one-news";

import { createUser } from "../../../utils/create-user";
import { News } from "../../../models/news";
import { useParams } from "react-router-dom";
import { useNewsChancages } from "../../../store/hooks/use-news-chancages";
import { NewsDescription } from "./news-description";
import { Comment } from "../../../models/comment";
import { createComment } from "../../../utils/create-comment";
import { selectAuthUser, setUser } from "../../../store/news/auth-user-slice";
import { User } from "../../../models/user";
import { useAuthHeader } from "react-auth-kit";
import { useAuthUser } from "react-auth-kit";
import { useGetUser } from "../../../store/hooks/use-get-user";

export const NewsDescProvider: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<"id">();
  const authHeader = useAuthHeader();
  const auth = useAuthUser();
  const authUserInStorage = auth();

  const [authUser, setAuthUser] = useState<User>();

  const { isLoading, user: userFromServer } = useGetUser(
    authUserInStorage && authUserInStorage.userId
  );

  useEffect(() => {
    setAuthUser(userFromServer);

    console.log("lefut");
    dispatch(setUser(userFromServer));
  }, [userFromServer, dispatch]);

  //const { news, newsId, showEditor } = useSelector(selectEditor);
  const { news } = useOneNews(Number(id));
  const { addComment } = useNewsChancages();

  const { user } = useSelector(selectAuthUser);
  //console.log("friss", user);
  useEffect(() => {
    //console.log("from useEffekt", user);
    setAuthUser(user);
  }, [user, authUser]);
  console.log("authUser", authUser);
  // const response = await fetch(`${API_URL}/profile`, {
  //   method: "GET",
  //   headers: {
  //     authorization: authToken ? `Bearer ${authToken}`:"",
  //     "Content-Type": "application/json",
  //     "accept": "application/json"
  //   },
  // });

  const onSubmit = useCallback(
    async (comment: Comment) => {
      comment.writer = authUser!;
      //console.log(comment);
      await fetch(`/comment`, {
        method: "POST",
        headers: {
          authorization: authHeader(),
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(comment),
      });
    },
    [authUser]
  );
  const comment = createComment();
  news && (comment.news = news);
  comment.writer = createUser();
  //végtelen ciklus
  //   useEffect(() => {
  //     if (selectedNews) {
  //       dispatch(setNews(selectedNews));
  //     }
  //   }, [selectedNews, dispatch]);
  return (
    <div>
      {news && (
        <NewsDescription
          id={Number(id)}
          comment={comment}
          onSubmit={onSubmit}
        ></NewsDescription>
      )}
    </div>
  );
};
