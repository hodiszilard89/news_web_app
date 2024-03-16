import React from "react";
import { Col, Row, Card, Carousel, Container } from "react-bootstrap";
import "./body.css";

const MyCarusel = ({ news }) => {
  const items = [
    { id: 1, name: "Item 1", image: "https://placehold.it/200x100" },
    { id: 2, name: "Item 2", image: "https://placehold.it/200x100" },
    { id: 3, name: "Item 3", image: "https://placehold.it/200x100" },
  ];

  return (
    <Container>
      <Row style={{ margin: "2% 0 0 0" }}>
        <Col md={8}>
          <Carousel indicators={false}>
            {items.map((item, id) => (
              <Carousel.Item
                key={id}
                className=""
                style={{
                  marginBlockStart: "20px",
                }}
              >
                <img
                  className="d-block w-100"
                  src={item.image}
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
                  <h3>{item.name}</h3>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col md={4}>
          <Row style={{ height: "75px" }} className="mt-3">
            <Col className="text-end">
              <h3>Névnap</h3>
            </Col>
            <Col>
              <div>
                <h3> </h3>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="text-end">
              <h3>Friss hírek</h3>
            </Col>
            <Col>
              <div className="vertical-scroll">
                <h3 className="scroll-text text-right">Beúszó szöveg</h3>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default MyCarusel;
// <Col md={8}>
//   <Carousel indicators={false}>
//     <Carousel.Item
//       className=""
//       style={{
//         marginBlockStart: "20px",
//       }}
//     >
//       <img
//         className="d-block w-100"
//         src="https://picsum.photos/800/400?text=Slide+1"
//         alt="First slide"
//       />
//       <Carousel.Caption
//         className="text-start ps-3"
//         style={{
//           fontSize: "18px",
//           backgroundColor: "black",
//           height: "100px",
//           padding: "10px",
//         }}
//       >
//         <h3>First slide label</h3>
//         <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//       </Carousel.Caption>
//     </Carousel.Item>
//     <Carousel.Item>
//       <img
//         className="d-block w-100"
//         src="https://picsum.photos/800/400?text=Slide+2"
//         alt="First slide"
//       />
//       <Carousel.Caption className="left-align-caption">
//         <h4>First slide label</h4>
//         <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//       </Carousel.Caption>
//     </Carousel.Item>
//     <Carousel.Item>
//       <img
//         className="d-block w-100"
//         src="https://picsum.photos/800/400?text=Slide+3"
//         alt="First slide"
//       />
//       <Carousel.Caption className="left-align-caption">
//         <h4>First slide label</h4>
//         <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//       </Carousel.Caption>
//     </Carousel.Item>
//   </Carousel>
// </Col>
