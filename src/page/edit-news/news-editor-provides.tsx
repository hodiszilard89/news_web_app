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
import { createUser } from "../../utils/create-user";
import { RawNews } from "../../models/raw-news";
import { News } from "../../models/news";
import { useParams } from "react-router-dom";
import { useNewsChancages } from "../../store/hooks/use-news-chancages";
import { selectAuthUser, setUser } from "../../store/news/auth-user-slice";
import { useAuthUser } from "react-auth-kit";
import { useGetUser } from "../../store/hooks/use-get-user";

import {selectTypeId} from "../../store/news/news-slice"
import { selectNewsId } from "../../store/news/editor-slice";
import { createRawNews } from "../../utils/create-raw-news";
import {User} from "../../models/user"
export const NewsEditorProvider: FC = () => {
  //const { id: newsId } = useParams<"id">();
 const newsId=useSelector(selectNewsId)
  const dispatch = useDispatch();
  const { save } = useNewsChancages();
  
//   const auth = useAuthUser();
//   const authUserInStorage = auth();

//   const { isLoading, error, user } = useGetUser(authUserInStorage?.id);
//   console.log("szervertől érkező response: \n",useGetUser(
//     authUserInStorage?.id
//  ));
//   const [authUser, setMyAuthUser] = useState<User>();

//   useEffect(() => {
    
//     user&&setMyAuthUser(user);
//     console.log("effect lefut  \n user", user, "   authUser ", authUser)
//   }, [user, setMyAuthUser]);


  const onSubmit = useCallback(

    async (id:number,news: News) => {
    
      dispatch(setNews(createRawNews()))
     // console.log("USER ",user)
    //  news.writer = user
      news.releasedate = new Date();
    await save(news);

    },
    [save,dispatch]
  );

  return (
     <div>
      
        <NewsEditor
          id={newsId? Number(newsId):0}
          //news={edited ? edited : createNews()}
          onSubmit={onSubmit}
        ></NewsEditor>

    </div>
  );
};
