import React from "react";
import { Link, Navigate, Redirect, NavLink, Navigator } from "react-router-dom";

import { Field, reduxForm } from "redux-form/immutable";
import RenderField from "./RenderField";

function TodoDetail({ item }) {
  if (!item) {
    //return <Link to="/">Hibás oldal</Link>;
    return (
      <Navigate to="/" replace>
        Hibás oldal
      </Navigate>
    );
  }

  return (
    <div>
      <h1>{item.get("value")}</h1>

      <Link to="/">Back</Link>
    </div>
  );
}
export default TodoDetail;
