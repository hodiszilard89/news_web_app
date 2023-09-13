import React, { FC, useEffect, useCallback, FormEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectEditor,
  selectNews,
  setNews,
} from "../../store/news/editor-slice";
import { useOneNews } from "../../store/hooks/use-one-news";
import { newsFactory, serializNews } from "../../utils/news_factory";
import NewsEditor from "./news-editor";
import { createNews } from "../../utils/create-news";
import { RawNews } from "../../models/raw-news";
import { News } from "../../models/news";
import { useParams } from "react-router-dom";
import { useNewsChancages } from "../../store/hooks/use-news-chancages";
import { selectAuthUser, setUser } from "../../store/news/auth-user-slice";
import { useAuthUser } from "react-auth-kit";
import { useGetUser } from "../../store/hooks/use-get-user";

import {selectId, updateNewsItem} from "../../store/news/news-slice"
import { selectNewsId } from "../../store/news/editor-slice";
import { createRawNews } from "../../utils/create-raw-news";

export const NewsEditorProvider: FC = () => {
  //const { id: newsId } = useParams<"id">();
 const newsId=useSelector(selectNewsId)
  const dispatch = useDispatch();
  // const edited = newsFactory(useSelector(selectNews));
  // const [editedNews, setEditedNews] = useState(edited&&createNews());
  const { save } = useNewsChancages();
  


  const auth = useAuthUser();
  const authUserInStorage = auth();
  const { isLoading, user } = useGetUser(
    authUserInStorage && authUserInStorage.userId
  );

  useEffect(() => {
    //setAuthUser(user);
    // dispach(setNews(news));
    if (!isLoading) dispatch(setUser(user));
   
  }, [user, dispatch]);

  const onSubmit = useCallback(

    async (id:number,news: News) => {
      //console.log("on Submitban:", news);
      dispatch(setNews(createRawNews()))

      //dispatch(updateNewsItem({index:id, item:serializNews(news)}));
      user && (news.writer = user);
      news.releasedate = new Date();
    await save(news);

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
    // <div>
    //   {edited ? (
    //     <NewsEditor
    //       id={newsId? Number(newsId):0}
    //       //news={edited ? edited : createNews()}
    //       onSubmit={onSubmit}
    //     ></NewsEditor>
    //   ) : (
    //     ""
    //   )}
    // </div>
     <div>
      
        <NewsEditor
          id={newsId? Number(newsId):0}
          //news={edited ? edited : createNews()}
          onSubmit={onSubmit}
        ></NewsEditor>

    </div>
  );
};
