// import React from "react";
// import { Formik, Form, Field } from "formik";
// import FromJS from "immutable";
// //import { FormLabel } from "@chakra-ui/react";
// const initialValues = {
//   title: "",
//   completed: false,
// };

// const TodoItem = ({ todo, onSubmit, onAddTodo }) => {
//   const handleSubmit = (values, actions) => {
//     //console.log(FromJS(values));
//     console.log("billentyű");
//     // onSubmit();

//     actions.resetForm();
//     actions.setSubmitting(false);
//   };

//   return (
//     <Formik>
//       {/* <FormLabel>hello</FormLabel> */}
//       {({ values, isSubmitting }) => (
//         <Form>
//           <Field name="titel" />
//           <Field name="completed" type="checkbox" />
//           <button type="submit" disabled={isSubmitting}>
//             Save
//           </button>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// const NewTodo = ({ onAddTodo }) => {
//   // onAddTodo("asdasdasd");
//   // console.log(onAddTodo);

//   return (
//     <div>
//       <h1>Todo List</h1>
//       <TodoItem onAddTodo={onAddTodo} />
//     </div>
//   );
// };

// export default NewTodo;

import React from "react";
import { Formik, Field, Form } from "formik";
import { Link } from "react-router-dom";

const initialValues = {
  firstName: "asdaasd",
  lastName: "asdasd",
  email: "asdasdas",
};

const onSubmit = (values, action) => {
  console.log(action.onAddTodo);
};

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Kötelező mező";
  }
  if (!values.lastName) {
    errors.lastName = "Kötelező mező";
  }
  if (!values.email) {
    errors.email = "Kötelező mező";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Érvénytelen email cím";
  }
  return errors;
};

const NewTodo = ({ myData, onAddTodo }) => {
  console.log(myData);
  return (
    <div>
      <h1>Formik űrlap példa</h1>
      <Formik
        initialValues={{ value: "" }}
        onSubmit={(e) => onAddTodo(e)}
        // validate={validate}
      >
        {({ errors, touched }) => (
          <Form>
            <div>
              <label htmlFor="firstName">Vezetéknév:</label>
              <Field name="value" />
              {errors.firstName && touched.firstName && (
                <div>{errors.firstName}</div>
              )}
            </div>
            <Link to="/">Back</Link>
            {/* <div>
              <label htmlFor="color">Keresztnév:</label>
              <Field name="color" />
              {errors.lastName && touched.lastName && (
                <div>{errors.lastName}</div>
              )}
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <Field name="email" type="email" />
              {errors.email && touched.email && <div>{errors.email}</div>}
            </div> */}

            <button type="submit">Beküldés</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default NewTodo;
