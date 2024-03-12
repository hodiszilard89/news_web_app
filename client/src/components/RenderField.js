import React from "react";

export default ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    {console.log("input" + JSON.stringify(input))}
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched &&
        ((error && <spam>{error}</spam>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);
