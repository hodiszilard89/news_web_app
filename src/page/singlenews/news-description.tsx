import { FC, useState, useEffect } from "react";
import { Box, Text, FormControl, Input, FormLabel, Button, Image } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useMultiStyleConfig } from "@chakra-ui/react";
import { Comment } from "../../models/comment";
import { useDispatch, useSelector } from "react-redux";
import { CommentList } from "../../componens/comment-list/comment-list";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setNewsTypeId } from "../../store/news/news-slice";
import { selectNews } from "../../store/news/editor-slice";
import { newsFactory, serializNews } from "../../utils/news_factory";

import { selectAuthUser } from "../../store/news/auth-user-slice";
import { News } from "../../models/news";
import { NewNavbar } from "../../componens/basic-comp/navbar/new-navbar";


export interface NewsDescProps {
  comment: Comment;
  id: number;
  news?: News;
  onSubmit: (comment: Comment) => Promise<void>;
}

export const NewsDescription: FC<NewsDescProps> = ({
  comment,
  onSubmit,
  id,
  news,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const style = useMultiStyleConfig("GenresLable", {});

  const user = useSelector(selectAuthUser).user;

  const newsFromState = newsFactory(useSelector(selectNews));
  useEffect(() => {
    if (!newsFromState.id) navigate("/");
  }, []);

  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    newsFromState?.comments && setComments(newsFromState.comments);
  }, []);
  const { values, setFieldValue, handleSubmit, resetForm } = useFormik({
    initialValues: comment,

    onSubmit: async (values: Comment, { setSubmitting }) => {
      resetForm();
      comment.releasedate = new Date();
      values.news = serializNews(newsFromState);

      values.writer = user!;
      if (user !== undefined) {
        try {
          setComments([...comments, values]);

          await onSubmit(values);
        } catch (e) {
          console.error(e);
        }
      } else {
        window.confirm("Jelentkezz be!");
      }
    },
    validationSchema: null,
  });


  return (
    <Box margin={"auto"} w={"80%"}>
      
        <NewNavbar />
        <Box>
          <Box>
            <Image
              style={{ width: "600px", height: "400px" }}
              src={newsFromState?.imgPath ? newsFromState?.imgPath : ""}
              borderRadius={"3"}
              className="mb-3"
            />
            <Box maxWidth={"550px"}>
              {newsFromState?.types?.map((type, id) => {
                return (
                  <Link to="/" key={id}>
                    <Text
                      sx={style.tag}
                      key={id}
                      onClick={() => dispatch(setNewsTypeId(type.id))}
                    >
                      #{type.title}
                    </Text>
                  </Link>
                );
              })}
            </Box>
            <Text>
              
          
                  Szerző: {newsFromState && newsFromState.writer?.chatName}
               
            </Text>
            <Text fontSize={"2xl"} fontWeight={"bold"}>{newsFromState?.title}</Text>
            <section style={{ fontSize: "18px" }}>
              {newsFromState?.text}
            </section>
          </Box>
        </Box>
        <Box width={"75%"}>
          <h4>Hozzászólások: ({comments.length})</h4>
          {comments && <CommentList comments={comments} />}

          <form onSubmit={handleSubmit}>
            <FormControl >
              <FormLabel>
                <h4>Írj egy kommentet</h4>
                <section style={{ fontSize: "18px" }}></section>
              </FormLabel>
              <Input
                h={"100"}
                as="textarea"
                backgroundColor={"white"}
                rows={3}
                placeholder="Enter article content"
                value={values.text}
                onChange={(event) => {
                  setFieldValue("text", event.target.value);
                }}
              />
            </FormControl>
            <Button colorScheme='teal' variant='solid'size={"lg"} type="submit">
              Küldés
            </Button>
          </form>
        </Box>
     
    </Box>
  );


};
