import { date } from "yup";
import { RawNews, News, Comment, RawComment } from "../models";

export const newsFactory = (rawNewsData: RawNews) => {
    const releaseDatE = new Date();

    if (rawNewsData.releasedate) {
      const [year, month, day] = rawNewsData.releasedate.split("-");
      releaseDatE.setFullYear(Number(year));
      releaseDatE.setMonth(Number(month) - 1);
      releaseDatE.setDate(Number(day));
  
      
    }
    
    return {
      ...rawNewsData,
     releasedate: releaseDatE,
     
    } as News;
  };


  export const serializeNews = (news: News): RawNews => {
   
    return {
      ...news,
      releasedate: news.releasedate && news.releasedate.toISOString(),
    }
  };

  // export const serializeComment = (comment: Comment): RawComment => {

  //   return {
  //     ...comment,
  //     releasedate: comment.releasedate.toISOString(),
  //   }
  // };