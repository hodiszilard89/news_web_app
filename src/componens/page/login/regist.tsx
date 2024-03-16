import { Formik } from "formik";
//import { Container, Form, Button } from "react-bootstrap";
import {Button, FormControl, FormLabel, Input, Text} from "@chakra-ui/react"
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  const handleSubmit = (values: { email: string; password: string }) => {
    // Implement registration logic here
  };

  return (
   
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleSubmit }) => (
          <FormControl>
            
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="Enter email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
          

           
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
           

            <Button variant="primary" type="submit">
              Register
            </Button>

            <Text >
              Already have an account? <Link to="/login">Login here</Link>
            </Text>
          </FormControl>
        )}
      </Formik>
  
  );
};
