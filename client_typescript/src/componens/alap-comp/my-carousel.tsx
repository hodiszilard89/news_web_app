import {
  Button as StrapButton,
  Carousel,
  Container,
  Row,
  Col,
} from "react-bootstrap";

import { Flex, Box } from "@chakra-ui/react";

export const MyCarousel = () => {
  return (
    <>
      <Row className={"mb-3"}>
        <Col md={8}>
          <Carousel indicators={false} variant="dark" data-interval="1000">
            {/* {items.map((item, id) => ( */}
            <Carousel.Item
              key={2}
              className="mb-3"
              style={{
                marginBlockStart: "20px",
              }}
            >
              <img
                className="d-block w-100"
                src="https://picsum.photos/800/400?text=Slide+1"
                alt="First slide"
              />
              <Carousel.Caption
                className="text-start ps-3"
                style={{
                  fontSize: "18px",

                  height: "100px",
                  padding: "10px",
                }}
              >
                <h3>asdasdasdasd</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item
              key={3}
              className="mb-3"
              style={{
                marginBlockStart: "20px",
              }}
            >
              <img
                className="d-block w-100"
                src="https://picsum.photos/800/400?text=Slide+2"
                alt="First slide"
              />
              <Carousel.Caption
                className="text-start ps-3   "
                style={{
                  outline: "1px solid back",
                  fontSize: "18px",

                  height: "100px",
                  padding: "10px",
                }}
              >
                <h3>asdasdasdasd</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            {/* ))} */}
          </Carousel>
        </Col>
        <Col md={4}></Col>
      </Row>
    </>
  );
};
