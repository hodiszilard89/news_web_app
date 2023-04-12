import { Formik } from "formik";
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  const handleSubmit = (values: { email: string; password: string }) => {
    // Implement registration logic here
  };

  return (
    <Container className="mt-5">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Register
            </Button>

            <Form.Text className="ml-3">
              Already have an account? <Link to="/login">Login here</Link>
            </Form.Text>
          </Form>
        )}
      </Formik>
    </Container>
  );
};
