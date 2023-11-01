import React from "react";

import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import {
  FC,
  useCallback,
  useMemo,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";

import {
  Skeleton,
  Button,
  useMultiStyleConfig,
  position,
} from "@chakra-ui/react";
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
import { setNews as setEditNews } from "../../../store/news/editor-slice";

import { selectLogin, showLogin } from "../../../store/news/login-slice";
import { setNews, setNewsTypeId } from "../../../store/news/news-slice";

import {
  selectAuthUser,
  selectOnlineUser,
} from "../../../store/news/auth-user-slice";
// import AuthService from "../../../login-auth/auth-service";
import { setUser, outUser } from "../../../store/news/auth-user-slice";
import { UserMenu } from "./user_menu";
import { useGetNewsByType } from "../../../store/hooks/use-get-news-by-type";
import { Type } from "../../../models/type";
import { createRawNews } from "../../../utils/create-raw-news";
import { setEditUser } from "../../../store/news/users-slice";
import { setSearchText } from "../../../store/news/search-slice";

export const MyNavbar: FC = () => {
  const { searchQuery, onChange, onSubmit } = useHeaderSearch();
  const { isLoading, error, types } = useNewsTypes();
  const style = useMultiStyleConfig("MovueItemMenu", {});
  const singOut = useSignOut();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [id, setId] = useState<number>(-1);
  //const {  news:newsByType } = useGetNewsByType(id);

  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   console.log(user);
  // };
  //-------------------------------------

  const auth = useAuthUser();
  const authUser = auth();
  const user = useSelector(selectOnlineUser);

  useEffect(() => {
    console.log(user);
    user&&dispatch(setEditUser(user))
  }, [user]);



  const addNews = useCallback(() => {
    if (
      authUser !== null &&
      (authUser.role.includes("USER") || authUser.role.includes("ADMIN"))
    ) {
      return (
        <Nav.Link as={Link} to="/edit" onClick={openEditor} className={"fs-5"}>
          Add News
        </Nav.Link>
      );
    }
    return <></>;
  }, [authUser]);

  const usersList = () => {
    return (
      <Nav.Link
         as={Link}
        to="/users"
        onClick={openEditor}
        className={"fs-5"}
        // sx={style.menuButton}
      >
        Users
      </Nav.Link>
    );
  };

  const openLogin = useCallback(() => {
    dispatch(showLogin());
  }, []);

  const kiir = useCallback(() => {
    return (
      <>
        <Nav.Item className="m-md-2">Üdvüzöllek,{authUser?.email}</Nav.Item>

        {authUser ? (
          <UserMenu
            showProfile={ () => {
              navigate("/user");
            }}
            onExit={() => {
              singOut();
              dispatch(outUser());
            }}
            userId={1}
          />
        ) : (
          <FaSignInAlt
            size="1em"
            className="ms-3"
            onClick={() => {
              //console.log("klikkk");
              openLogin();
            }}
          />
        )}
      </>
    );
  }, [authUser]);

  const openEditor = useCallback(() => {
    dispatch(setEditNews(createRawNews()));
    //dispatch(showEditor());
  }, []);

  
  return (
    <div>
   
      {["md"].map((expand) => (
        <Navbar
          style={{ position: "sticky", zIndex:1}}
          key={expand}
          bg="light"
          expand={expand}
          className="mb-1, mt-2"
        >
          <Container className="fluid fs-4 align-items-center">
            <FaNewspaper className="me-2 fs-5" />
            <Navbar.Brand
              className="fs-5"
              as={Link}
              onClick={() => {
                dispatch(setNewsTypeId(-1));
                dispatch(setSearchText(""));
                //setId(-1)
              }}
              to="/"
            >
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
                            onClick={() => {
                              dispatch(setNewsTypeId(item.id));
                            }}
                            key={key}
                          >
                            {item.title}
                          </NavDropdown.Item>
                        );
                      })}
                    </NavDropdown>
                  </Skeleton>

                  {addNews()}

                  { user?.laws?.find((law)=>law.title==="ADMIN")?usersList():""}
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
