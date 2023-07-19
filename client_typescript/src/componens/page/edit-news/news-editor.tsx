import React, { useState, useCallback, FormEvent, FC } from "react";
import { Form, Button, Container, FormLabel } from "react-bootstrap";
import { MyNavbar } from "../../alap-comp/navbar/navbar";
import { selectNews } from "../../../store/news/editor-slice";
import { Genre } from "../../../models/genre";
import { useSelector } from "react-redux";
import { useOneNews } from "../../../store/hooks/use-one-news";
import { useParams } from "react-router-dom";
import { News } from "../../../models/news";
import { useNewsTypes } from "../../../store/hooks/use-news-types";
import { useNewsChancages } from "../../../store/hooks/use-news-chancages";
import { useFormik } from "formik";
import { GenreSelector } from "../../alap-comp/genre-selector";

export interface NewsEditorProps {
  news: News;
  onSubmit: (news: News) => Promise<void>;
}

export const NewsEditor: FC<NewsEditorProps> = ({ news, onSubmit }) => {
  const { isLoading, error, types } = useNewsTypes();
  // const [genres, setGenres] = useState<Genre[]>([]);
  // const [mufaj, setMufaj] = useState<string[]>();
  const { values, setFieldValue, handleSubmit, handleReset } = useFormik({
    initialValues: news,
    onSubmit: async (values: News, { setSubmitting }) => {
      try {
        const validatedNews = { ...values };
        //validatedNews.releasedate = new Date();
        await onSubmit(validatedNews);
      } catch (e) {
        console.error(e);
      }
    },
    validationSchema: null,
  });

  return (
    <>
      <Container>
        <MyNavbar />
        <Form as="form" onSubmit={handleSubmit}>
          {values.imgPath && (
            <img src={values.imgPath} alt="Italian Trulli"></img>
          )}
          <Form.Group>
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image URL (optional)"
              value={values?.imgPath}
              onChange={(event) => setFieldValue("imgPath", event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={values?.title}
              onChange={(event) => setFieldValue("title", event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Subtitle</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter subtitle"
              value={values.subtitle ? values.subtitle : ""}
              onChange={(event) =>
                setFieldValue("subtitle", event.target.value)
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter article content"
              value={values?.text}
              onChange={(event) => setFieldValue("text", event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Genres</Form.Label>
            {types ? (
              <GenreSelector
                value={values?.types}
                types={types}
                onChange={(genres) => setFieldValue("types", genres)}
              />
            ) : (
              ""
            )}
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button variant="primary" type="reset" onClick={handleReset}>
            Reset
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default NewsEditor;
