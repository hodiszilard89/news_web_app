import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
// const laws = [
//   { value: "admin" },
//   { value: "íro" },
//   { value: "bizbaz" },
//   { value: "olvasó" },
// ];
let laws;

// fetch("/users")
//   .then((response) => response.json())
//   .then((data) => {
//     // console.log(data);
//     laws = data;
//   })
//   .catch((error) => {
//     console.error(error);
//   });
//console.log(users);
const CreateAccunt = ({ users, onSetUsers }) => {
  // const [items, setItems] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("/users")
  //     .then((response) => setItems(response.data))
  //     .catch((error) => console.log(error));
  // }, []);
  // console.log(items);
  const handleClick = () => {
    onSetUsers();
  };

  return (
    <Container>
      <Row>
        <Col md={3} />
        <Col>
          <h1>Regisztráció</h1>
          <Formik
            initialValues={{
              firstName: "",
              chatName: "",
              secName: "",
              password: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.name) {
                errors.name = "Name is required";
              }
              // if (!values.email) {
              //   errors.email = "Email is required";
              // } else if (!/\S+@\S+\.\S+/.test(values.email)) {
              //   errors.email = "Invalid email format";
              // }
              if (!values.password) {
                errors.password = "Password is required";
              } else if (values.password.length < 6) {
                errors.password = "Password must be at least 6 characters long";
              }
              // return errors;
              return;
            }}
            onSubmit={(values) => {
              fetch("/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
              }).then(() => {
                console.log("New user added");
              });

              console.log(values);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <FormGroup>
                  <Label for="chatName">ChatNév</Label>
                  <Field
                    name="chatName"
                    id="chatName"
                    as={Input}
                    className={`form-control ${
                      errors.name && touched.name ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="invalid-feedback"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="firstName">Vezetéknév</Label>
                  <Field
                    name="firstName"
                    id="firstName"
                    as={Input}
                    className={`form-control ${
                      errors.name && touched.name ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="invalid-feedback"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="secName">Keresztnév</Label>
                  <Field
                    name="secName"
                    id="secName"
                    as={Input}
                    className={`form-control ${
                      errors.name && touched.name ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="invalid-feedback"
                  />
                </FormGroup>
                {/* <FormGroup>
                <Label for="email">Email</Label>
                <Field
                  name="email"
                  id="email"
                  as={Input}
                  className={`form-control
                   ${errors.email && touched.email ? "is-invalid" : ""}
                  `}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />
              </FormGroup> */}
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Field
                    name="password"
                    id="password"
                    type="password"
                    as={Input}
                    className={`form-control ${
                      errors.password && touched.password ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="invalid-feedback"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="selectOption">Jogosultság</Label>
                  <Field
                    as={Input}
                    type="select"
                    name="selectOption"
                    id="selectOption"
                    className={
                      errors.selectOption && touched.selectOption
                        ? "is-invalid"
                        : ""
                    }
                  >
                    <option value="">válassz</option>

                    {/* {items.map((law, id) => {
                      return (
                        <option key={id} value={law.chatName}>
                          {law.chatName}
                        </option>
                      );
                    })} */}
                  </Field>
                  {errors.selectOption && touched.selectOption ? (
                    <div className="invalid-feedback">
                      {errors.selectOption}
                    </div>
                  ) : null}
                </FormGroup>
                <Button color="primary" type="submit">
                  Submit
                </Button>
                <Button color="primary" onClick={(e) => handleClick()}>
                  Add Users
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
        <Col md={3} />
      </Row>
      <Link to="/">
        <h3>Back</h3>
      </Link>
    </Container>
  );
};
export default CreateAccunt;
