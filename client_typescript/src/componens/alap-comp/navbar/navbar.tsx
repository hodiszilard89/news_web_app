import React from "react";
import { Dropdown, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import {
  FC,
  useCallback,
  useMemo,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import { Skeleton, Button } from "@chakra-ui/react";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaNewspaper, FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useHeaderSearch } from "../use-header-search";
import { useNewsTypes } from "../../../store/hooks/use-news-types";
import { User } from "../../../models/user";
import { useSignIn } from "react-auth-kit";
import { useAuthUser, useSignOut, useAuthHeader } from "react-auth-kit";

import { selectLogin, showLogin } from "../../../store/news/login-slice";

import { selectAuthUser } from "../../../store/news/auth-user-slice";
import AuthService from "../../../login-auth/auth-service";
import { setUser, outUser } from "../../../store/news/auth-user-slice";
import { UserMenu } from "./user_menu";

export const MyNavbar: FC = () => {
  const { searchQuery, onChange, onSubmit } = useHeaderSearch();
  const { isLoading, error, types } = useNewsTypes();
  const singOut = useSignOut();
  const dispatch = useDispatch();

  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   console.log(user);
  // };
  //-------------------------------------

  const auth = useAuthUser();

  const authUser = auth();

  const addNews = useCallback(() => {
    if (authUser !== null && authUser.role.includes("USER")) {
      return (
        <Nav.Link as={Link} to="/edit" onClick={openEditor} className={"fs-5"}>
          Add News
        </Nav.Link>
      );
    }
    return <></>;
  }, [authUser]);

  const openLogin = useCallback(() => {
    dispatch(showLogin());
    console.log("sadfasdf");
    //kiir();
  }, []);

  const kiir = useCallback(() => {
    return (
      <>
        <Nav.Item className="m-md-2">Üdvüzöllek,{authUser?.email}</Nav.Item>
        {/* <Button icon={<FaUser />}></Button> */}
        <UserMenu
          onExit={() => {
            singOut();
            dispatch(outUser());
          }}
          userId={1}
        />
        <FaUser size="1em" className="ms-3" onClick={() => {}} />
        <FaSignInAlt
          size="1em"
          className="ms-3"
          onClick={() => {
            //console.log("klikkk");
            openLogin();
          }}
        />
      </>
    );
  }, [authUser]);

  const openEditor = useCallback(() => {
    //dispatch(showEditor());
  }, []);

  //console.log(person);
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
            <FaNewspaper className="me-2 fs-5" />
            <Navbar.Brand className="fs-5" as={Link} to="/">
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
              <Offcanvas.Body className="align-items-center ">
                <Nav className=" flex-grow-1 fs-5">
                  <Skeleton isLoaded={!isLoading}>
                    <NavDropdown
                      title="Kategóriák"
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                      {types.map((item, key) => {
                        //console.log(item as string);
                        return (
                          <NavDropdown.Item
                            to={`#action${key}`}
                            onClick={() => console.log("hello")}
                            key={key}
                          >
                            {item.title}
                          </NavDropdown.Item>
                        );
                      })}
                    </NavDropdown>
                  </Skeleton>

                  {addNews()}
                </Nav>
                <>
                  <Form as="form" className="d-flex " onSubmit={onSubmit}>
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      size="sm"
                      aria-label="Search"
                      value={searchQuery}
                      onChange={onChange}
                    />
                    <Button
                      as="button"
                      type="submit"
                      variant="outline-success"
                      size="sm"
                    >
                      Keresés
                    </Button>
                  </Form>
                  {kiir()}
                </>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </div>
  );
};

export default MyNavbar;
