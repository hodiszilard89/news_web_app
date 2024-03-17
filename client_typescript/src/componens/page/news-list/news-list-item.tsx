import React, { FC } from "react";

<<<<<<< HEAD
//import { Card, Row, Col } from "react-bootstrap";
import {Card, Flex, Box, CardBody, CardHeader, Image, Text} from "@chakra-ui/react" 
=======
import { Card,CardBody,CardHeader, Image, Text, Flex, Box } from "@chakra-ui/react";
>>>>>>> 03_17
import { FaNewspaper, FaThumbsUp, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

import { News } from "../../../models/news";

export interface NewsListItemProps {
  news: News;
}

export const NewsListItem: FC<NewsListItemProps> = ({ news }) => {
  const id = news.id;

  return (
    <Card>
<<<<<<< HEAD
      <CardHeader>
        <Text>
          <h4>
            <b>{news.title}</b>
          </h4>
        </Text>
        <Link to={`news/${id}`}>
          <Image src={news.imgPath} />

          <Text className="my-2 text-muted">
            Card Subtitle
          </Text>
        </Link>
        <Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Text>
        <Flex>
          <Box>
            <Link to="/">
              <FaThumbsUp
                className="me-2 fs-5 "
                style={{ color: "gray" }}
                onClick={(e) => console.log("klick")}
              />
            </Link>
            ({news.likes && news.likes.length})
          </Box>
          <Box>
            <p>szerző: {news.writer?.chatName}</p>
          </Box>
        </Flex>
      </CardHeader>
    </Card>
=======
     
    <CardHeader>
      <h4>
        <b>{news.title}</b>
      </h4>
    </CardHeader>
    <CardBody>
    <Link to={`news/${id}`}>
      <Image src={news.imgPath} />

      <Text className="my-2 text-muted">
        Card Subtitle
      </Text>
    </Link>
    <Text>
      Some quick example text to build on the card title and make up the
      bulk of the card's content.
    </Text>
    <Flex>
      <Box>
        <Link to="/">
          <FaThumbsUp
            className="me-2 fs-5 "
            style={{ color: "gray" }}
            onClick={(e) => console.log("klick")}
          />
        </Link>
        ({news.likes && news.likes.length})
      </Box>
      <Box className="text-end">
        <p>szerző: {news.writer?.chatName}</p>
      </Box>
    </Flex>
  </CardBody>
</Card>
>>>>>>> 03_17
  );
};
