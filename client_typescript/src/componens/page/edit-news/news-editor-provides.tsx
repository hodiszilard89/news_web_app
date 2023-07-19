import React, { FC, useEffect, useCallback, FormEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectEditor,
  selectNews,
  setNews,
} from "../../../store/news/editor-slice";
import { useOneNews } from "../../../store/hooks/use-one-news";
import { newsFactory, serializeNews } from "../../../utils/news_factory";
import NewsEditor from "./news-editor";
import { createNews } from "../../../utils/create-news";
import { RawNews } from "../../../models/raw-news";
import { News } from "../../../models/news";
import { useParams } from "react-router-dom";
import { useNewsChancages } from "../../../store/hooks/use-news-chancages";
import { selectAuthUser, setUser } from "../../../store/news/auth-user-slice";
import { useAuthUser } from "react-auth-kit";
import { useGetUser } from "../../../store/hooks/use-get-user";

export const NewsEditorProvider: FC = () => {
  const { id: newsId } = useParams<"id">();
  const [editedNews, setEditedNews] = useState<News | undefined>();
  const dispatch = useDispatch();

  const { news: edited } = useOneNews(Number(newsId));

  // const { news, newsId, showEditor } = useSelector(selectEditor);
  //const { user } = useSelector(selectAuthUser);

  console.log("flow");
  const editNews = newsId ? edited : createNews();
  const { save } = useNewsChancages();

  const auth = useAuthUser();
  const authUserInStorage = auth();
  const { isLoading, user } = useGetUser(
    authUserInStorage && authUserInStorage.userId
  );

  // useEffect(() => {
  //   setEditedNews(edited);
  // }, [edited]);

  console.log("flow", edited);
  useEffect(() => {
    //setAuthUser(user);
    // dispach(setNews(news));
    if (!isLoading) dispatch(setUser(user));
    console.log("user bejelentkeztetés");
  }, [user, dispatch]);

  const onSubmit = useCallback(
    async (news: News) => {
      user && (news.writer = user);
      news.releasedate = new Date();
      console.log("news", news);

      await save(news);

      //dispatch(closeEditor());
    },
    [save, user]
  );

  //végtelen ciklus
  // useEffect(() => {
  //   if (selectedNews) {
  //     dispatch(setNews(serializeNews(selectedNews)));
  //   }
  // }, [selectedNews, dispatch]);

  return (
    <div>
      {editNews ? (
        <NewsEditor
          news={editNews ? editNews : createNews()}
          onSubmit={onSubmit}
        ></NewsEditor>
      ) : (
        ""
      )}
    </div>
  );
};
