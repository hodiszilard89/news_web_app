import React, { FC, useState, useCallback, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decodeJwt } from "jose";
import { FormErrorMessage } from "@chakra-ui/react";
import axios from "axios";
import { User } from "../../models/user";
import { Modal, Form, Button, Container, FormLabel } from "react-bootstrap";
import { closeLogin, selectLogin } from "../../store/news/login-slice";
import { showReg } from "../../store/news/reg-slice";
import { useFormik } from "formik";
import { useAuthUser } from "react-auth-kit";
import { useSignIn } from "react-auth-kit";
import { useGetUser } from "../../store/hooks/use-get-user";
import { setUser } from "../../store/news/auth-user-slice";
import { useGetToken } from "../../store/hooks/use-get-token";
import { GetTokenQueryParams } from "../../store/news/news-api";
export interface Token {
  role: string;
  iss: string;
  email: string;
  id: number;
}

interface LoginModalParam {
  onSubmit: (param: GetTokenQueryParams) => {};
}

const LoginModal: FC<LoginModalParam> = ({ onSubmit }) => {
  const [showModal, setShowModal] = useState(false);
  const initialToken: Token = {
    role: "",
    iss: "",
    email: "",
    id: 0,
  };
  const initParam: GetTokenQueryParams = {
    email: "",
    password: "",
  };

  const { showLogin } = useSelector(selectLogin);
  //console.log(showLogin);
  const dispatch = useDispatch();
  const singIn = useSignIn();

  //token kérés paraméterei
  const [tokenParams, setTokenParams] =
    useState<GetTokenQueryParams>(initParam);

  const dispach = useDispatch();
 const [responseErrors, setResponseErrors] = useState<string|undefined>(undefined)
  const auth = useAuthUser();
  const authUserInStorage = auth();

  const [authUser, setMyAuthUser] = useState<User>();

  const { isLoading: Loading, data } = useGetUser(authUserInStorage?.id);

  useEffect(() => {
    setMyAuthUser(data);
    console.log(authUser);
    // dispach(setNews(news));

    dispach(setUser(data));
  }, [data]);

  const { serverErrors, isLoading, isFetching, tokenValue } =
    useGetToken(tokenParams);

    // const { serverErrors, isLoading, isFetching, tokenValue } = tokenParams
    // ? useGetToken(tokenParams)
    // : { serverErrors: null, isLoading: false, isFetching: false, tokenValue: null };

    console.log(serverErrors);
  useEffect(() => {
    if (tokenValue) {
      const { role, id } = decodeJwt(tokenValue) as unknown as Token;

      //ALKALMAZÁSON BELÜLI FH BEÁLLÍTÁS A LOCALSTOREBA
      tokenValue &&
        singIn({
          token: tokenValue,
          expiresIn: 36000,
          tokenType: "Bearer",
          authState: { email: values.email, role, id },
        });
        dispatch(closeLogin());
      // globál stateba rakni a frlhasználót
    } else {
      setResponseErrors(serverErrors?.data.messages)
      console.log("server Error", serverErrors?.data);
    }
  }, [tokenValue, tokenParams]);

  //FORMIK RÉSZ
  const { errors, values, setFieldValue, handleSubmit, setValues} = useFormik({
    initialValues: tokenParams,
    onSubmit: async (values, { setSubmitting }) => {
      await setTokenParams({
        email: values.email,
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

      //dispatch(closeLogin());
    },
  });

  const onOpenReg = useCallback(() => {
    dispatch(closeLogin());
    dispatch(showReg());

    //dispatch(showReg());
  }, []);

  const onClose = useCallback(() => {
    dispatch(closeLogin());
    setResponseErrors(undefined)
    //setValues({email:"", password:""})
  }, [dispatch]);

  useEffect(() => {
    setShowModal(showLogin);
  }, [showLogin]);

  useEffect(() => {
    // return () => {
    //   dispach(closeLogin());
    // };
  });

  return (
    <Container>
        
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        onExit={() => {
          console.log("bezásás");
          dispach(closeLogin());
        }}
      >
       
        <Modal.Header closeButton onClick={onClose}>
          <Modal.Title>Bejelentkezés</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       
          <Form as="form" onSubmit={handleSubmit} >
            <FormLabel>{responseErrors?`Error ${responseErrors}`:""}</FormLabel>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                //type="email"
                type="text"
                
                placeholder="Adja meg az email címét"
                value={values.email}
                autoComplete="new-email"
                onChange={(event) => setFieldValue("email", event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Jelszó</Form.Label>
              <Form.Control
                type="password"
                autoComplete="new-password"
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
                  email: values.email,
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
