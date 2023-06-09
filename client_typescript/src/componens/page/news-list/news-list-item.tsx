import React, { FC } from "react";

import { Card, Row, Col } from "react-bootstrap";
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
      <Card.Body>
        <Card.Title>
          <h4>
            <b>{news.title}</b>
          </h4>
        </Card.Title>
        <Link to={`news/${id}`}>
          <Card.Img src={news.imgPath} />

          <Card.Subtitle className="my-2 text-muted">
            Card Subtitle
          </Card.Subtitle>
        </Link>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Row>
          <Col>
            <Link to="/">
              <FaThumbsUp
                className="me-2 fs-5 "
                style={{ color: "gray" }}
                onClick={(e) => console.log("klick")}
              />
            </Link>
            ({news.likes && news.likes.length})
          </Col>
          <Col className="text-end">
            <p>szerző: {news.writer.chatName}</p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
