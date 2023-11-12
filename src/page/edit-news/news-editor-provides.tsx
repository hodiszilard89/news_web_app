import React, { FC, useCallback} from "react";
import { useSelector, useDispatch } from "react-redux";
import {

  setNews,
} from "../../store/news/editor-slice";

import NewsEditor from "./news-editor";

import { News } from "../../models/news";

import { useNewsChancages } from "../../store/hooks/use-news-chancages";

import { selectNewsId } from "../../store/news/editor-slice";
import { createRawNews } from "../../utils/create-raw-news";

export const NewsEditorProvider: FC = () => {
  const newsId = useSelector(selectNewsId);
  const dispatch = useDispatch();
  const { save } = useNewsChancages();

  const onSubmit = useCallback(
    async (id: number, news: News) => {
      dispatch(setNews(createRawNews()));

      news.releasedate = new Date();
      await save(news);
    },
    [save, dispatch]
  );

  return (
    <>
      <NewsEditor
        id={newsId ? Number(newsId) : 0}
        onSubmit={onSubmit}
      ></NewsEditor>
    </>
  );
};
