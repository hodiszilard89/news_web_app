import React, { FC, useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decodeJwt } from "jose";
import { Modal, Form, Button, Container } from "react-bootstrap";
import { closeLogin, selectLogin } from "../../../store/news/login-slice";
import { showReg, selectReg } from "../../../store/news/reg-slice";
import { useFormik } from "formik";
import AuthService from "../../../login-auth/auth-service";
import { useSignIn } from "react-auth-kit";
import { setToken } from "../../../store/news/auth-user-slice";

export interface Token {
  role: string;
  iss: string;
  username: string;
  id: number;
}

const LoginModal: FC = () => {
  const [showModal, setShowModal] = useState(false);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const { showLogin } = useSelector(selectLogin);
  console.log(showLogin);
  const dispatch = useDispatch();
  const singIn = useSignIn();

  //formik
  const { errors, values, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // await AuthService.login(values.email, values.password);
        const response = await fetch(`/authentication`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({
            username: values.email,
            password: values.password,
          }),
        });
        const token = await response.text();
        const { role, id: userId } = decodeJwt(token) as unknown as Token;
        dispatch(setToken(token));
        console.log("role ", role);
        singIn({
          token,
          expiresIn: 36000,
          tokenType: "Bearer",
          authState: { email: values.email, role, userId },
        });

        console.log(response.json());
      } catch (e) {
        console.error(e);
      }
      // singIn({
      //   token: response.data,
      // });

      dispatch(closeLogin());
    },
  });

  const onOpenReg = useCallback(() => {
    dispatch(showReg());
    dispatch(closeLogin());
    console.log("close");
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
            <Button variant="primary" type="submit">
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
