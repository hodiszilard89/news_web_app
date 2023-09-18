import { MyTimeFormat } from "../alap-comp/my-time.-format";
import React, { FC } from "react";
import { Card, ListGroup } from "react-bootstrap";

interface CommentProps {
 // key:number;
  authorImage: string;
  author: string;
  date: Date;
  text: string;
}


export const Comment: FC<CommentProps> = ({
  
  author,
  date,
  text,
  authorImage,
}) => {
  // console.log(new Date(date).toISOString());
  const bgColor = "#b99f9f";
  return (
    <Card className="mt-4 card" style={{ backgroundColor: bgColor }}>
      <h4>
        <Card.Header>
          <img
            src={
              authorImage
                ? authorImage
                : "https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
            }
            className="card-img-top"
            style={{ width: "50px", height: "50px" }}
          />
          {author}
          <section style={{ fontSize: "14px" }}>
             <MyTimeFormat key={Math.random()} date={new Date(date)}/>

           
          </section>
        </Card.Header>
      </h4>

      <ListGroup variant="flush">
        <section style={{ fontSize: "18px" }}>
          <ListGroup.Item>{text}</ListGroup.Item>
        </section>

        <ListGroup.Item>
          <section style={{ fontSize: "14px" }}></section>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default Comment;
