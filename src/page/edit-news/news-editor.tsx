import React, { useState, FC, useEffect } from "react";

import {
  Box,
  Input,
  FormLabel,
  Button,
  FormErrorMessage,
  FormControl,
  Checkbox,
  Text,
  
} from "@chakra-ui/react";


import { selectNews } from "../../store/news/editor-slice";
import { useSelector } from "react-redux";
import { News } from "../../models/news";
import { useNewsTypes } from "../../store/hooks/use-news-types";
import {  useFormik } from "formik";
import { GenreSelector } from "../../componens/basic-comp/genre-selector";
import { Image } from "@chakra-ui/react";
import { newsEditValidationSchema } from "./news-edit-validation.schema";
import { newsFactory } from "../../utils/news_factory";
import { selectAuthUser } from "../../store/news/auth-user-slice";
import { NewNavbar } from "../../componens/basic-comp/navbar/new-navbar";
import { createNews } from "../../utils/create-news";

export interface NewsEditorProps {
  id: News["id"];
  onSubmit: (id: number, news: News) => Promise<void>;
}

export const NewsEditor: FC<NewsEditorProps> = ({ onSubmit, id }) => {
  const user = useSelector(selectAuthUser).user;

  const { types } = useNewsTypes();
  const news = useSelector(selectNews);

  const [updateNews, setUpdateNews] = useState(news);

  const {
    errors,
    values,
    setFieldValue,
    handleSubmit,
    handleReset,

    resetForm,
  } = useFormik({
    initialValues: newsFactory(updateNews),
    onSubmit: async (values: News, { setSubmitting }) => {
      if (user) {
        try {
          const validatedNews = { ...values };
          validatedNews.writer = user;
          await onSubmit(id!, validatedNews);
        } catch (e) {
          console.error(e);
        }
      } else {
        window.confirm("jelentkezz be");
      }
    },
    validationSchema: newsEditValidationSchema,
  });

  useEffect(() => {
    setUpdateNews(news);
    //setValues(newsFactory(news))
    if (!news) resetForm({ values: createNews() });
  }, [news]);

  return (
    <>

      <Box width={"80%"} margin={"auto"}> 
        <NewNavbar />
        <form onSubmit={handleSubmit}>
          {values.imgPath && (
            <Image
              src={values.imgPath}
              style={{ width: "600px", height: "400px" }}
            ></Image>
          )}
          <FormControl isInvalid={!!errors.imgPath}>
            <FormLabel>Image URL</FormLabel>
            <Input
              backgroundColor={"white"}
              type="text"
              placeholder="Enter image URL (optional)"
              value={values.imgPath ? values.imgPath : ""}
              onChange={(event) => setFieldValue("imgPath", event.target.value)}
            />
            <FormErrorMessage>{errors.imgPath}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.title}>
            <FormLabel>Title</FormLabel>
            <Input
              backgroundColor={"white"}
              value={values.title ? values.title : ""}
              type="text"
              placeholder="Enter title"
              // value={values.title&&""}
              onChange={(event) => setFieldValue("title", event.target.value)}
            />
            <FormErrorMessage>{errors.title}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.subtitle}>
            <FormLabel>Subtitle</FormLabel>
            <Input
              backgroundColor={"white"}
              type="text"
              placeholder="Enter subtitle"
              value={values.subtitle ? values.subtitle : ""}
              onChange={(event) =>
                setFieldValue("subtitle", event.target.value)
              }
            />
            <FormErrorMessage>{errors.subtitle}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.text}>
            <FormLabel>Content</FormLabel>
            <Input
              as="textarea"
              type="text"
              backgroundColor={"white"}
              rows={3}
              placeholder="Enter article content"
              value={values.text ? values.text : ""}
              onChange={(event) => setFieldValue("text", event.target.value)}
            />

            <FormErrorMessage>{errors.text}</FormErrorMessage>
          </FormControl>
          <Text display={"flex"}>
            <FormLabel> Vezető hír</FormLabel>
            <Checkbox
              paddingLeft={3}
              border={"1px black"}
              display={"flex"}
              size="lg"
              isChecked={values.priority}
              value={""}
              defaultChecked={false}
              onChange={(event) => {
                
                setFieldValue("priority", event.currentTarget.checked);
              }}
            ></Checkbox>
          </Text>

          <FormControl isInvalid={!!errors.types}>
            <FormLabel>Genres</FormLabel>
            {types ? (
              <GenreSelector
                value={values.types}
                types={types}
                onChange={(genres) => {
          
                  return setFieldValue("types", genres);
                }}
              />
            ) : (
              ""
            )}
            <FormErrorMessage>{errors.types}</FormErrorMessage>
          </FormControl>
          <Button colorScheme="teal" variant="solid" type="submit" isDisabled={(Object.keys(errors).length>0)}>
            Küldés
          </Button>
          <Button
            m={2}
            colorScheme="teal"
            variant="solid"
            type="reset"
            onClick={() => handleReset(undefined)}
          >
            Reset
          </Button>
        </form>
      </Box>
    </>
  );
};

export default NewsEditor;
