import React, { FC, useEffect, useCallback, FormEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectEditor, setNews } from "../../store/news/editor-slice";
import { useOneNews } from "../../store/hooks/use-one-news";

import { createUser } from "../../utils/create-user";
import { News } from "../../models/news";
import { selectNews, updateNewsItem } from "../../store/news/news-slice";
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
import { createRawNews } from "../../utils/create-raw-news";


export const NewsDescProvider: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<"id">();
  const authHeader = useAuthHeader();


  const auth = useAuthUser();
  const authUserInStorage = auth();
  const { isLoading, data } = useGetUser(
    authUserInStorage && authUserInStorage.userId
  );
  const [authUser, setAuthUser] = useState<User>();

  useEffect(() => {
    setAuthUser(data);
    //dispatch(setUser(user));
  }, [data, dispatch]);



  const onSubmit = useCallback(
    async (comment: Comment) => {
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
  comment.writer = data!;

  return (
    <div>
      {
        <NewsDescription
          key={id}
          id={Number(id)}
          comment={comment}
          onSubmit={onSubmit}
        ></NewsDescription>
      }
    </div>
  );
};
