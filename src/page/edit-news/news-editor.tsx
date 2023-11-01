import React, { useState, useCallback, FormEvent, FC, useEffect } from "react";

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
import { createRawNews } from "../../utils/create-raw-news";
import { MyNavbar } from "../../componens/alap-comp/navbar/navbar";
import { selectNews } from "../../store/news/editor-slice";
import { useDispatch, useSelector } from "react-redux";
import { News } from "../../models/news";
import { useNewsTypes } from "../../store/hooks/use-news-types";
import { useFormik } from "formik";
import { GenreSelector } from "../../componens/alap-comp/genre-selector";
import { Image } from "@chakra-ui/react";
import { newsEditValidationSchema } from "./news-edit-validation.schema";
import { newsFactory } from "../../utils/news_factory";
import { selectAuthUser } from "../../store/news/auth-user-slice";
import { NewNavbar } from "../../componens/alap-comp/navbar/new-navbar";
import { createNews } from "../../utils/create-news";
import { Footer } from "../../componens/alap-comp/footer";

export interface NewsEditorProps {
  id: News["id"];
  onSubmit: (id: number, news: News) => Promise<void>;
}

export const NewsEditor: FC<NewsEditorProps> = ({ onSubmit, id }) => {
  const dispatch = useDispatch();

  const user = useSelector(selectAuthUser).user;

  const { isLoading, error, types } = useNewsTypes();
  const news = useSelector(selectNews);

  const [updateNews, setUpdateNews] = useState(news);
  

  const {
    errors,
    values,
    setFieldValue,
    handleSubmit,
    handleReset,
    setValues,
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

  useEffect(()=>{
    setUpdateNews(news)
    //setValues(newsFactory(news))    
    if (!news)
        resetForm({values:createNews()});
  }, [news])


  console.log(updateNews?.priority)
  return (
    <>
      <Box width={"80%"} margin={"auto"}>
        <NewNavbar />
        <form onSubmit={handleSubmit}>
          {values?.imgPath && (
            <Image
              src={values?.imgPath}
              style={{ width: "600px", height: "400px" }}
            ></Image>
          )}
          <FormControl>
            <FormLabel>Image URL</FormLabel>
            <Input
              backgroundColor={"white"}
              type="text"
              placeholder="Enter image URL (optional)"
              value={values?.imgPath}
              onChange={(event) => setFieldValue("imgPath", event.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              backgroundColor={"white"}
              type="text"
              placeholder="Enter title"
              value={values?.title}
              onChange={(event) => setFieldValue("title", event.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Subtitle</FormLabel>
            <Input
              backgroundColor={"white"}
              type="text"
              placeholder="Enter subtitle"
              value={values?.subtitle}
              onChange={(event) =>
                setFieldValue("subtitle", event.target.value)
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Content</FormLabel>
            <Input
              as="textarea"
              backgroundColor={"white"}
              rows={3}
              placeholder="Enter article content"
              value={values?.text}
              onChange={(event) => setFieldValue("text", event.target.value)}
            />
          </FormControl>
          <Text display={"flex"}>
            <FormLabel> Vezető hír</FormLabel>
            <Checkbox
              paddingLeft={3}
              border={"1px black"}
              display={"flex"}
              size="lg"
              isChecked={values?.priority}
              // checked={values?.priority}
              onChange={(event) => {
                console.log(event.currentTarget.checked);
                setFieldValue("priority", event.currentTarget.checked);
              }}
            ></Checkbox>
          </Text>

          <FormControl isInvalid={!!errors.types}>
            <FormLabel>Genres</FormLabel>
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
            <FormErrorMessage>{errors.types}</FormErrorMessage>
          </FormControl>
          <Button colorScheme="teal" variant="solid" type="submit">
            Submit
          </Button>
          <Button
            m={2}
            colorScheme="teal"
            variant="solid"
            type="reset"
            onClick={()=>handleReset(undefined)}
          >
            Reset
          </Button>
          <Button
            m={2}
            colorScheme="teal"
            variant="solid"
            onClick={() => {
              resetForm({values:createNews()})
            }}
          >
            törlés
          </Button>
        </form>
       
      </Box>
    </>
  );
};

export default NewsEditor;
