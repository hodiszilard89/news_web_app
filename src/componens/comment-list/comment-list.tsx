import React, { FC } from "react";
import { Comment } from "../../models/comment";
import { Comment as MyComment } from "../alap-comp/my-comment";
export interface CommentListProps {
  comments: Comment[];
}

export const CommentList: FC<CommentListProps> = ({ comments }) => {
  return (
    <>
      {comments.map((comment, id) => {
        // console.log("comment ");
        // console.log(comment);
        // console.log(new Date(comment.releaseDate));
        return (
          <MyComment
            key={id}
            authorImage={comment.writer && comment.writer.imagePath}
            author={comment.writer?.chatName}
            date={comment && comment.releasedate}
            text={comment.text}
          />
        );
      })}
    </>
  );
};
