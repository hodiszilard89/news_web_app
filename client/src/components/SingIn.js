import React from "react";
import { useParams } from "react-router-dom";

const SignIn = ({ data }) => {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <h1>Hello {id}</h1>
    </div>
  );
};
export default SignIn;
