import { Formik } from "formik";
<<<<<<< HEAD
//import { Container, Form, Button } from "react-bootstrap";
import {Box, FormControl, FormLabel, Input, Text, Button} from "@chakra-ui/react" 
=======
import {Button, FormControl, FormLabel, Input, Text} from "@chakra-ui/react"
>>>>>>> 03_17
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  const handleSubmit = (values: { email: string; password: string }) => {
    // Implement registration logic here
  };

  return (
<<<<<<< HEAD
    <Box>
=======
   
>>>>>>> 03_17
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleSubmit }) => (
          <FormControl>
<<<<<<< HEAD
           
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="Enter email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
         

           
              <FormLabel>Password</FormLabel>
=======
            
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            placeholder="Enter email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />

            <FormLabel>Password</FormLabel>
>>>>>>> 03_17
              <Input
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
<<<<<<< HEAD
          
=======
           
>>>>>>> 03_17

            <Button variant="primary" type="submit">
              Register
            </Button>

            <Text>
              Already have an account? <Link to="/login">Login here</Link>
            </Text>
          </FormControl>
        )}
      </Formik>
<<<<<<< HEAD
    </Box>
=======
  
>>>>>>> 03_17
  );
};
