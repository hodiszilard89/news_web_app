import React, { useState, useRef } from "react";

import { Formik, Field, Form } from "formik";
import { Row, Col } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Link } from "react-router-dom";
function NewsEditor() {
  const initialValues = {};

  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <div style={{ alignItems: "center", margin: "auto" }}>
      <Row>
        <Col md={2}> </Col>
        <Col md={8}>
          <h1>Újságírói nézet</h1>
          <h3>Cikk címe</h3>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ values, handleChange }) => (
              <Form className="m-10">
                <Field name="title">
                  {({ field }) => (
                    <CKEditor
                      editor={ClassicEditor}
                      data={values.title} //fontos
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        handleChange({
                          target: { name: "title", value: data },
                        });
                      }}
                    />
                  )}
                </Field>
                <br />
                <br />
                <br />
                <h3>Rövid leítás (minél inkább clickbaites legyen )</h3>
                <Field name="sortNews">
                  {({ field }) => (
                    <CKEditor
                      editor={ClassicEditor}
                      data={values.sortNews}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        handleChange({
                          target: { name: "sortNews", value: data },
                        });
                      }}
                    />
                  )}
                </Field>
                <br />
                <br />
                <br />
                <h3>Tartalom</h3>
                <Field name="text">
                  {({ field }) => (
                    <CKEditor
                      editor={ClassicEditor}
                      data={values.text}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        handleChange({
                          target: { name: "text", value: data },
                        });
                      }}
                    />
                  )}
                </Field>
                <button type="submit">Submit</button>
              </Form>
            )}
          </Formik>
          <Link to="/">
            <h3>Back</h3>
          </Link>
        </Col>

        <Col md={2}> </Col>
      </Row>
    </div>
  );
}

export default NewsEditor;
