import React, { FC } from "react";
import { Comment } from "../../models/comment";
import { Comment as MyComment } from "./my-comment";
export interface CommentListProps {
  comments: Comment[];
}

export const CommentList: FC<CommentListProps> = ({ comments }) => {
  return (
    <>
      {comments.map((comment, id) => {
       
        return (<>
          <MyComment
            key={id}
            authorImage={comment.writer && comment.writer.imagePath}
            author={comment.writer?.chatName}
            date={comment && comment.releasedate}
            text={comment.text}
          />
          </>
        );
      })}
    </>
  );
};
