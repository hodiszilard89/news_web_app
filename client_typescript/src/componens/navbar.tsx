import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { VFC } from "react";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaNewspaper, FaUser } from "react-icons/fa";

export const MyNavbar: VFC = () => {
  return (
    <div>
      {["md"].map((expand) => (
        <Navbar
          sticky="top"
          key={expand}
          bg="light"
          expand={expand}
          className="mb-1, mt-2"
        >
          <Container className="fluid fs-4 align-items-center">
            <FaNewspaper className="me-3 fs-1" />
            <Navbar.Brand className="fs-1" href="#">
              FAKE NEWS
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="align-items-center">
                <Nav className=" flex-grow-1 ">
                  <Nav.Link href="#action1">Home</Nav.Link>
                  <Nav.Link href="#action2">Link</Nav.Link>
                  <NavDropdown
                    title="Kategóriák"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Belföld</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">Külföld</NavDropdown.Item>
                    <NavDropdown.Item href="#action5">Sport</NavDropdown.Item>
                    <NavDropdown.Item href="#action5">
                      Életviel
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action5">Kúltúra</NavDropdown.Item>
                    <NavDropdown.Item href="#action5">
                      Művészet
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action5">Tech</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Keresés</Button>
                </Form>
                <Link to="/login">
                  <FaUser size="2em" className="ms-5" />
                </Link>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </div>
  );
};

export default MyNavbar;
