import React from "react";
import CardContainer from "../CardContainer";
import MyCarusel from "../../components/MyCarusel";
import { Container, Row, Col, Button } from "react-bootstrap";
import NavBar from "../../components/NavBar";

const HomePage = () => {
  const items = [
    { id: 1, number: 2 },
    { id: 2, number: 23 },
    { id: 3, number: 230 },
    { id: 4, number: 230 },
  ];
  const handleClick1 = (e) => {
    e.preventDefault();
    const law = { id: 2, title: "próbaaa" };
    console.log(law);
    fetch("/law", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(law),
    }).then(() => {
      console.log("New Student added");
    });
  };

  const handleClick2 = (e) => {
    e.preventDefault();
    fetch("/news")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleClick3 = (e) => {
    e.preventDefault();

    fetch("/law/4", {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleClick4 = (e) => {
    e.preventDefault();

    fetch("/news/" + 1)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Container>
      <NavBar />
      <Row>
        <MyCarusel />
      </Row>
      <Row>
        {items.map((item, id) => (
          <Col key={id}>
            <CardContainer />
          </Col>
        ))}
      </Row>
      <Button me={2} onClick={handleClick1}>
        hozzzáadás
      </Button>
      <Button me={2} onClick={handleClick2}>
        lekérdezés
      </Button>
      <Button me={2} onClick={handleClick3}>
        törlés
      </Button>
      <Button me={2} onClick={handleClick4}>
        get id alapján
      </Button>
    </Container>
  );
};
export default HomePage;
