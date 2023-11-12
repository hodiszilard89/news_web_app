import  { FC, useCallback} from "react";

import { News } from "../../models/news";
import { useParams } from "react-router-dom";
import { NewsDescription } from "./news-description";
import { Comment } from "../../models/comment";
import { createComment } from "../../utils/create-comment";

import { useAuthUser } from "react-auth-kit";
import { useGetUser } from "../../store/hooks/use-get-user";
import { Footer } from "../../componens/basic-comp/footer";
import { useCreateCommentMutation } from "../../store/news/news-api";

interface prop {
  news?: News;
}

export const NewsDescProvider: FC<prop> = ({ news }) => {

  const { id } = useParams<"id">();

  const auth = useAuthUser();
  const authUserInStorage = auth();
  const { data } = useGetUser(authUserInStorage && authUserInStorage.userId);
  const [addComment] = useCreateCommentMutation();

  const onSubmit = useCallback(async (comment: Comment) => {


    addComment(comment);
  }, []);
  const comment = createComment();

  comment.writer = data!;

  return (
    <>
      <NewsDescription
        key={id}
        id={Number(id)}
        comment={comment}
        onSubmit={onSubmit}
      />
      <Footer />
    </>
  );
};
