import React from "react";
import CardContainer from "../CardContainer";
import MyCarusel from "../../components/MyCarusel";
import { Container, Row, Col } from "react-bootstrap";

const HomePage = () => {
  return (
    <Container>
      <Row>
        <MyCarusel />
      </Row>
      <Row>
        <Col>
          <CardContainer />
        </Col>
        <Col>
          <CardContainer />
        </Col>
        <Col>
          <CardContainer />
        </Col>
        <Col>
          <CardContainer />
        </Col>
      </Row>
    </Container>
  );
};
export default HomePage;
