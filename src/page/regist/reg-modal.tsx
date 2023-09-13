import React, { FC, useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decodeJwt } from "jose";
import { Modal, Form, Button, Container } from "react-bootstrap";
import { showLogin, selectLogin } from "../../store/news/login-slice";
import { closeReg, selectReg } from "../../store/news/reg-slice";
import { useFormik } from "formik";
//import AuthService from "../../../login-auth/auth-service";

import { useSignIn } from "react-auth-kit";
import { setToken } from "../../store/news/auth-user-slice";
import { useAddUser } from "../../store/hooks/useAddUser";
import { create } from "domain";
import { createUser } from "../../utils/create-user";

export interface Token {
  role: string;
  iss: string;
  username: string;
  id: number;
}

const RegModal: FC = () => {
  const [showModal, setShowModal] = useState(false);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const { showReg } = useSelector(selectReg);
  const dispatch = useDispatch();
  const singIn = useSignIn();
  const { addUser } = useAddUser();
  //formik
  const { errors, values, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
      repassword: "",
      chatname: "",
      secname: "",
      firstname: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const user = createUser();
        user.chatName = values.chatname;
        user.email = values.email;
        user.firstName = values.firstname;
        user.secName = values.secname;
        user.password = values.password;
        const response = async () => {
          await addUser(user);
        };
        response();
        //console.log(response);
        // //await AuthService.login(values.email, values.password);
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
        // const token = await response.text();
        // const { role, id: userId } = decodeJwt(token) as unknown as Token;
        // dispatch(setToken(token));
        // console.log("role ", role);
        // singIn({
        //   token,
        //   expiresIn: 36000,
        //   tokenType: "Bearer",
        //   authState: { email: values.email, role, userId },
        // });
        // console.log(response.json());
      } catch (e) {
        console.error(e);
      }

      dispatch(closeReg());
    },
  });

  const onClose = useCallback(() => {
    dispatch(closeReg());
  }, [dispatch]);

  const onOpenLogin = useCallback(() => {
    dispatch(closeReg());
    dispatch(showLogin());
  }, []);

  useEffect(() => setShowModal(showReg), []);

  return (
    <Container>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton onClick={onClose}>
          <Modal.Title>Regisztráció</Modal.Title>
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
            <Form.Group controlId="formRePassword">
              <Form.Label>Jelszó újra</Form.Label>
              <Form.Control
                type="repassword"
                autoComplete="repassword"
                placeholder="Adja meg a jelszavát újra"
                value={values.repassword}
                onChange={(event) =>
                  setFieldValue("repassword", event.target.value)
                }
              />
            </Form.Group>
            <Form.Group controlId="formChatname">
              <Form.Label>Kiválasztott chat név</Form.Label>
              <Form.Control
                type="text"
                autoComplete="text"
                placeholder="Adja meg a chat nevét"
                value={values.chatname}
                onChange={(event) =>
                  setFieldValue("chatname", event.target.value)
                }
              />
            </Form.Group>
            <Form.Group controlId="formSecName">
              <Form.Label>Adja meg vezetéknevét</Form.Label>
              <Form.Control
                type="password"
                autoComplete="password"
                placeholder="Adja meg a vezetéknevét"
                value={values.secname}
                onChange={(event) =>
                  setFieldValue("secname", event.target.value)
                }
              />
            </Form.Group>
            <Form.Group controlId="formFirstName">
              <Form.Label>Adja meg keresztnevét</Form.Label>
              <Form.Control
                type="text"
                autoComplete="text"
                placeholder="Adja meg a keresztnevét"
                value={values.firstname}
                onChange={(event) =>
                  setFieldValue("firstname", event.target.value)
                }
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Regisztráció
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onOpenLogin}>
            Bejelentkezés
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Bezárás
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default RegModal;
