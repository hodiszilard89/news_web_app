import React, { useState, useCallback, FormEvent, FC, useEffect } from "react";
import { Form, Button, Container, FormLabel } from "react-bootstrap";
import { FormErrorMessage, FormControl } from "@chakra-ui/react";
import { MyNavbar } from "../../componens/alap-comp/navbar/navbar";
import { selectNews } from "../../store/news/editor-slice";
import { Genre } from "../../models/genre";
import { RawNews } from "../../models";
import { useDispatch, useSelector } from "react-redux";
import { useOneNews } from "../../store/hooks/use-one-news";
import { useParams } from "react-router-dom";
import { News } from "../../models/news";
import { useNewsTypes } from "../../store/hooks/use-news-types";
import { useNewsChancages } from "../../store/hooks/use-news-chancages";
import { useFormik } from "formik";
import { GenreSelector } from "../../componens/alap-comp/genre-selector";
import { Box, Image } from "@chakra-ui/react";
import { setNews } from "../../store/news/editor-slice";
import { newsEditValidationSchema } from "./news-edit-validation.schema";
import { newsFactory } from "../../utils/news_factory";
import { createNews } from "../../utils/create-news";
import { createRawNews } from "../../utils/create-raw-news";

export interface NewsEditorProps {
  id: News["id"];
  onSubmit: (id: number, news: News) => Promise<void>;
}

export const NewsEditor: FC<NewsEditorProps> = ({ onSubmit, id }) => {
  const dispatch = useDispatch();

  const { isLoading, error, types } = useNewsTypes();

  const { id: pathID } = useParams<"id">();

  //lekérem a globális stateből a szerkesztendő hírt
  const [updateNews, setUpdateNews] = useState(useSelector(selectNews));
  //const [formikNews, setformikNews] = useState<News>(newsFactory(updateNews));

  console.log(id);

  //useEffect(()=>{setUpdateNews(createRawNews())},[])

  const { errors, values, setFieldValue, handleSubmit, handleReset, setValues } =
    useFormik({
      initialValues: newsFactory(updateNews),
      onSubmit: async (values: News, { setSubmitting }) => {
        try {
          const validatedNews = { ...values };
          //validatedNews.releasedate = new Date();
          await onSubmit(id!, validatedNews);
        } catch (e) {
          console.error(e);
        }
      },
      validationSchema: newsEditValidationSchema,
    });

  return (
    <>
      <Container>
        <MyNavbar />
        <Form as="form" onSubmit={handleSubmit}
      
        >
          {values?.imgPath && (
            <Image
              src={values?.imgPath}
              style={{ width: "600px", height: "400px" }}
            ></Image>

            // <img src={values.imgPath} alt="Italian Trulli"></img>
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
              value={values?.subtitle}
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
          <FormControl isInvalid={!!errors.types}>
            <Form.Label>Genres</Form.Label>
            {types ? (
              <GenreSelector
                value={values?.types}
                types={types}
                onChange={(genres) => {
                 
                  return setFieldValue("types", genres);
                }}
              />
            ) : (
              ""
            )}
            <FormErrorMessage>{!!errors.types}</FormErrorMessage>
          </FormControl>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button variant="primary" type="reset" onClick={handleReset}>
            Reset
          </Button>
          <Button
            variant="primary"
            onClick={() => 
              {
                //setUpdateNews(createRawNews())
            }}
          >
            új
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default NewsEditor;
