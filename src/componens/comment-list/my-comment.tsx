import { MyTimeFormat } from "../alap-comp/my-time.-format";
import React, { FC } from "react";

import { Card, CardHeader, Box, Text, CardBody } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";

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
  console.log(authorImage);
  const bgColor = "lightgray";
  return (
    <Card style={{ backgroundColor: bgColor }}  marginTop={8}>
      <CardHeader height={"fit-content"} padding={2}>
        <Box display={"flex"} alignItems={"center"} mb={3}>
          <Image
            borderRadius={"50%"}
            src={authorImage ? "." + authorImage : ""}
            className="card-img-top"
            style={{ width: "50px", height: "50px" }}
            me={3}
          />
          <Text fontSize={"2xl"}>{author}</Text>
        </Box>
        <section style={{ fontSize: "14px" }}>
          <MyTimeFormat key={Math.random()} date={new Date(date)} />
        </section>
      </CardHeader>
      <CardBody backgroundColor={"white"}>
        {/* <ListGroup variant="flush">
          <section style={{ fontSize: "18px" }}>
            <ListGroup.Item>{text}</ListGroup.Item>
          </section>

        </ListGroup> */}
        <Text variant={"flush"}>
          {text}
        </Text>
      </CardBody>
    </Card>
  );
};

export default Comment;
