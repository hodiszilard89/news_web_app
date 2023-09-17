import { useCallback } from "react";


import {useCreateCommentMutation, useCreateNewsMutaion, useDeleteNewsMutaion, useUpdateNewsMutaion} from "../news/news-api";
import {News} from "../../models/news"
import {serializNews } from "../../utils/news_factory";


export const useNewsChancages = () =>{
    const [addComment] = useCreateCommentMutation();
    const [createNews]  = useCreateNewsMutaion();
    const [deleteNews] = useDeleteNewsMutaion();
    const [updateNews] = useUpdateNewsMutaion();


    const save = useCallback(
        async (news: News) => {
          const mutation = news.id ? updateNews : createNews;
          //const rawMovie = serializeMovie(movie);
          const rawNews = serializNews(news);
          const result = await mutation(rawNews);
          if ("error" in result) {
       
            throw result.error;
          }
 
          //return newsFactory(result.data);
        },
        [updateNews, createNews]
      );
    //update
    //console.log(createNews);
     
    return{
        deleteNews,
        save,
        addComment,
    };
}