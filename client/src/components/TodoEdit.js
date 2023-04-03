import React from "react";
import { Link } from "react-router-dom";

import { Field, reduxForm } from "redux-form/immutable";
import RenderField from "./RenderField";

let TodoEditForm = (props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="value"
        type="text"
        placeholder="value"
        component={RenderField}
        label="value"
      />
      <Field
        name="color"
        type="text"
        placeholder="color"
        component={RenderField}
        label="color"
      />
      <button type="submit">
        <b>Add</b>
      </button>
    </form>
  );
};

let TodoEditFormContainer = reduxForm({
  form: "TodoEditFormContainer",
})(TodoEditForm);

function EditTodo({ myData }) {
  return (
    <div>
      <div>
        <h3>{myData.get("value")}</h3>
        <TodoEditFormContainer
          initialValues={{
            value: "asdasdad",
            color: "blue",
          }}
          onSubmit={(e) => console.log(e)}
        />
      </div>
      <Link to="/">Back</Link>
    </div>
  );
}
export default EditTodo;
