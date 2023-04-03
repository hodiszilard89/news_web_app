import React from "react";
import { Formik, Field, Form } from "formik";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTodo } from "../actions/todos";
import { fromJS } from "immutable";

const initialValues = {
  firstName: "asdaasd",
  lastName: "asdasd",
  email: "asdasdas",
};

// const onSubmit = (values, actions) => {
//   console.log(values);
// };

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

const EditTodo2 = ({ item, update }) => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    //event.preventDefault();
    console.log(event.id);
    dispatch(updateTodo(fromJS(event)));
    // további adatkezelési logika...
  };

  return (
    <div>
      <h1>Formik űrlap példa</h1>
      <Formik
        // initialValues={myData.toJS()}
        initialValues={item.toJS()}
        onSubmit={handleSubmit}
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

            <div>
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
            </div>

            <button type="submit">Beküldés</button>
          </Form>
        )}
      </Formik>
      <Link to="/"> Back</Link>
    </div>
  );
};
export default EditTodo2;
