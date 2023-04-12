import { useState } from "react";

export const LoginPage = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/authentication", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          username: "test2",
          password: "password",
        }),
      });

      if (response.ok) {
        const data1 = await response.text();
        console.log(data1);
        sessionStorage.setItem("token", data1);
      } else {
        console.error(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }

    console.log(sessionStorage.getItem("token"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input type="text" name="username" />

      <label htmlFor="password">Password</label>
      <input type="password" name="password" />

      <button type="submit">Submit</button>
    </form>
  );
};

// import { VFC } from "react";
// import { Formik } from "formik";
// import { Container, Form, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { useState } from "react";

// const API_URL = "/authentication";
// export const LoginPage: VFC = () => {
//   const [token, setToken] = useState<string | null>(
//     localStorage.getItem("token")
//   );
//   const handleSubmit = async (username: string, password: string) => {
//     const response = await fetch("/api/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ username, password }),
//     });
//     if (response.ok) {
//       const { token } = await response.json();
//       setToken(token);
//       localStorage.setItem("token", token); // a token mentése a localStorage-ban
//     }
//   };

// const handleSubmit = (values: { username: string; password: string }) => {
//   (async (username, password) => {
//     const response = await fetch(API_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         accept: "application/json",
//       },
//       body: JSON.stringify({
//         username: "test",
//         password: "password",
//       }),
//     });
//     if (response.status != 200) {
//       console.log("hiba");
//       //throw new ValidationError ("invalid username or password")
//     }
//     console.log(await response);
//     const { authToken } = await response.json();
//     console.log(authToken);
//   })();

// public async login(username:string, password:string):  Promise<void>{
//   const response = await fetch(API_URL,{
//       method:"POST",
//       headers:{
//           "Content-Type":"application/json",
//           "accept":"application/json"
//       },
//       body:JSON.stringify({
//           username,
//           password
//       })
//   })

//   if (response.status!=200)
//   {
//       throw new ValidationError ("invalid username or password")
//   }
//   const {authToken} = await response.json()
//   this.authToken=authToken;

//   return (
//     <Container className="mt-5">
//       <Formik
//         initialValues={{ username: "", password: "" }}
//         onSubmit={handleSubmit}
//       >
//         {({ values, handleChange, handleSubmit }) => (
//           <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="formBasicEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter email"
//                 name="email"
//                 value={values.username}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="formBasicPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder="Password"
//                 name="password"
//                 value={values.password}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Button variant="primary" type="submit">
//               Login
//             </Button>

//             <Form.Text className="ml-3">
//               Don't have an account? <Link to="/register">Register here</Link>
//             </Form.Text>
//           </Form>
//         )}
//       </Formik>
//     </Container>
//   );
// };
