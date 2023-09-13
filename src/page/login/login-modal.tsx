import React, { FC, useState, useCallback, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decodeJwt } from "jose";
import axios from "axios";
import { Modal, Form, Button, Container } from "react-bootstrap";
import { closeLogin, selectLogin } from "../../store/news/login-slice";
import { showReg, selectReg } from "../../store/news/reg-slice";
import { useFormik } from "formik";
//import AuthService from "../../../login-auth/auth-service"; // kikommentelve az osztály
import { useSignIn } from "react-auth-kit";
//import { selectLogin } from "../../../store/news/login-slice";
import { useGetToken } from "../../store/hooks/use-get-token";
import { GetTokenQueryParams } from "../../store/news/news-api";
export interface Token {
  role: string;
  iss: string;
  username: string;
  id: number;
}

// interface initialToken{
//   role:"",
//   iss:"",
//   username:"",
//   id:0
// }
interface LoginModalParam {
  onSubmit: (param: GetTokenQueryParams) => {};
}

const LoginModal: FC<LoginModalParam> = ({ onSubmit }) => {
  const [showModal, setShowModal] = useState(false);
  const initialToken: Token = {
    role: "",
    iss: "",
    username: "",
    id: 0,
  };
  const initParam: GetTokenQueryParams = {
    username: "",
    password: "",
  };

  const { showLogin } = useSelector(selectLogin);
  //console.log(showLogin);
  const dispatch = useDispatch();
  const singIn = useSignIn();

  //token kérés paraméterei
  const [tokenParams, setTokenParams] =
    useState<GetTokenQueryParams>(initParam);

  //maga a token
  //const [token, setToken] = useState<string>("");

  //token lekérés a szervertől
  const { serverErrors, isLoading, isFetching, tokenValue } =
    useGetToken(tokenParams);
  useEffect(() => {
    console.log("lefut a submit");
    if (tokenValue) {
      //setToken(tokenValue)
  
      if (tokenValue) {
        const { role, id } = decodeJwt(tokenValue) as unknown as Token;
        tokenValue &&
          singIn({
            token: tokenValue,
            expiresIn: 36000,
            tokenType: "Bearer",
            authState: { email: values.email, role, id },
          });
      }
    } else {
      //  console.log("server Error", serverErrors?.data.messages);
    }
  }, [tokenValue, tokenParams]);

  // useEffect(() => {
  //   //lefut a token regisztráció
  //   console.log("lefut a token regisztrálás");
  //   if (tokenValue) {
  //     const { role, id } = decodeJwt(tokenValue) as unknown as Token;
  //     tokenValue &&
  //       singIn({
  //         token: tokenValue,
  //         expiresIn: 36000,
  //         tokenType: "Bearer",
  //         authState: { email: values.email, role, id },
  //       });
  //   }
  // }, [tokenValue]);

  //FORMIK RÉSZ
  const { errors, values, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, { setSubmitting }) => {

      await setTokenParams({
        username: values.email,
        password: values.password,
      });
      //onSubmit(param)
      // await AuthService.login(values.email, values.password);
      // const response = await fetch(`/authentication`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     accept: "application/json",
      //   },
      //   body: JSON.stringify({
      //     username: values.email,
      //     password: values.password,
      //   }),
      // });
      // //RESPONse Kiírása
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   window.confirm(errorData.messages[0]);
      //   //onsole.log(errorData.messages[0]);S
      // }

      //let token = "";

      //tokenFromServer&&(token=tokenFromServer)

      //KILEHETNE SZERVEZNI A PROVIDERBE
      // console.log(token);

      //console.log(userId);
      //   : initialToken;
      // if (tokenValue !== "") {
      //   console.log("hiba az autentikációban");
      // } else {

      //   tokenValue && dispatch(setToken(tokenValue));
      //   tokenValue &&
      //     singIn({
      //       token: tokenValue,
      //       expiresIn: 36000,
      //       tokenType: "Bearer",
      //       authState: { email: values.email, role, userId },
      //     });
      // }

      //console.log("role ", role);

      // singIn({
      //   token: response.data,
      // });

      dispatch(closeLogin());
    },
  });

  const onOpenReg = useCallback(() => {
    dispatch(showReg());
    dispatch(closeLogin());

    //dispatch(showReg());
  }, []);

  const onClose = useCallback(() => {
    dispatch(closeLogin());
  }, [dispatch]);

  useEffect(() => setShowModal(showLogin), [showLogin]);

  return (
    <Container>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton onClick={onClose}>
          <Modal.Title>Bejelentkezés</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form as="form" onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                //type="email"
                autoComplete="email"
                placeholder="Adja meg az email címét"
                value={values.email}
                onChange={(event) => setFieldValue("email", event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Jelszó</Form.Label>
              <Form.Control
                type="password"
                autoComplete="password"
                placeholder="Adja meg a jelszavát"
                value={values.password}
                onChange={(event) =>
                  setFieldValue("password", event.target.value)
                }
              />
            </Form.Group>
            <Button
              onClick={() => {
                setTokenParams({
                  username: values.email,
                  password: values.password,
                });
              }}
              variant="primary"
              type="submit"
            >
              Bejelentkezés
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onOpenReg}>
            Regisztráció
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Bezárás
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default LoginModal;
