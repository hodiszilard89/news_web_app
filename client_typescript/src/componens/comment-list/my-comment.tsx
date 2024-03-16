import { MyTimeFormat } from "../basic-comp/my-time.-format";
import { FC } from "react";

import { Comment as CommentDTO } from "../../models";

import {
  Card,
  CardHeader,
  Box,
  Text,
  CardBody,

} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";


interface CommentProps {
  comment:CommentDTO
}

export const MyComment: FC<CommentProps> =({
 comment
}) => {

  const bgColor = "lightgray";
  return (
 
      <Card style={{ backgroundColor: bgColor }} marginTop={8}>
        <CardHeader height={"fit-content"} padding={2}>
          <Box display={"flex"} alignItems={"center"} mb={3}>
            <Image
              borderRadius={"50%"}
              src={comment.writer.imagePath ? "." + comment.writer.imagePath : ""}
              className="card-img-top"
              style={{ width: "50px", height: "50px" }}
              me={3}
            />
            <Text fontSize={"2xl"}>{comment.writer.chatName}</Text>
          </Box>
          <section style={{ fontSize: "14px" }}>
            <MyTimeFormat key={Math.random()} date={new Date(comment.releasedate)} />
          </section>
        </CardHeader>
        <CardBody backgroundColor={"white"}>

          <Text variant={"flush"}>{comment.text}</Text>
        </CardBody>
      </Card>
    
  );
};


