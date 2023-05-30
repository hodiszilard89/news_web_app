import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FaNewspaper, FaThumbsUp, FaUser } from "react-icons/fa";
import LikeButton from "../atom/LikeButton";
import { Link } from "react-router-dom";

const MyCard = ({ news }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <h4>
            <b>{news.title}</b>
          </h4>
        </Card.Title>
        <Card.Img src="https://picsum.photos/200/100" />
        <Card.Subtitle className="my-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Row>
          <Col>
            <Link>
              <LikeButton />
            </Link>
            (123)
            {/* <Card.Link> Another Link</Card.Link> */}
          </Col>
          <Col className="text-end">
            <p>szerző</p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default MyCard;
