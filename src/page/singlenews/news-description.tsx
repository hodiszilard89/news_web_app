import { FC, useState, useEffect, useCallback } from "react";
import { Box, Text } from "@chakra-ui/react";
import { Image, Container, Row, Col, Form, Button } from "react-bootstrap";
import { useOneNews } from "../../store/hooks/use-one-news";
import MyNavbar from "../../componens/alap-comp/navbar/navbar";
import {User} from "../../models/user"
import { useAuthUser } from "react-auth-kit";
import { useFormik } from "formik";
import { useMultiStyleConfig } from "@chakra-ui/react";
import { Comment } from "../../models/comment";
import { useDispatch, useSelector } from "react-redux"; 
import { CommentList } from "../../componens/comment-list/comment-list";
import { Link } from "react-router-dom";
import { selectNews, setNewsTypeId } from "../../store/news/news-slice"; 
import { newsFactory, serializNews } from "../../utils/news_factory";
import { useGetUser } from "../../store/hooks/use-get-user";

export interface NewsDescProps {
  comment: Comment;
  id: number;
  onSubmit: (comment: Comment) => Promise<void>;
}

export const NewsDescription: FC<NewsDescProps> = ({
  comment, 
  onSubmit,
  id,
}) => {
  const dispatch=useDispatch();
  const style = useMultiStyleConfig("GenresLable", {});
 
  const [user, setUser] = useState<User>();
  const auth = useAuthUser();
  const authUser = auth();

 // console.log(authUser)
  const {isLoading, user : userFromServer} = useGetUser(authUser?.id)

 // console.log("userFromServer", userFromServer)
  useEffect(()=>{
    setUser(userFromServer)
  },[userFromServer])



  const news= newsFactory(useSelector(selectNews)[id])
 // console.log(news)
  //const { news } = useOneNews(Number(id));
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    news?.comments && setComments(news.comments);
    // console.log(comments);
  }, []);
  const { values, setFieldValue, handleSubmit, resetForm } = useFormik({
    initialValues: comment,
    
    onSubmit: async (values: Comment, { setSubmitting }) => {
      resetForm();
      // console.log("news? ", news)
      // console.log("komment1 ", comment)
      // comment.news=serializNews(news);
      // console.log("komment2 ", comment)
      values.news=serializNews(news)
      //!!!!!!!!!!!!!!
      values.writer=user!;
      if (authUser !== null) {
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
    <Container>
      <MyNavbar />
      <Row> 
        <Col>
          <Image
            style={{ width: "600px", height: "400px" }}
            src={news?.imgPath ? news?.imgPath : ""}
            fluid
            rounded
            className="mb-3"
          />
          <Box maxWidth={"550px"}>
            {news?.types?.map((type, id) => {
            
              return (
                <Link to="/">
                  <Text sx={style.tag} key={id}
                  onClick={()=>dispatch(setNewsTypeId(type.id))}>
                    #{type.title}
                  </Text>
                </Link>
              );
            })}
          </Box>
          <p>{<small>Szerző: {news && news.writer?.chatName}</small>}</p>
          <h2>{news?.title}</h2>
          <section style={{ fontSize: "18px" }}>{news?.text}</section>
          {/* <pre>{news?.text}</pre> */}
          <Button variant="primary" className="mr-2">
            Tetszik
          </Button>
          <Button variant="secondary">Megosztás</Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <h4>Hozzászólások: ({comments.length})</h4>
        {comments && <CommentList comments={comments} />}

        <Form className="mt-3" as="form" onSubmit={handleSubmit}>
          <Form.Group controlId="commentForm">
            <Form.Label>
              <h4>Írj egy kommentet</h4>
              <section style={{ fontSize: "18px" }}></section>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter article content"
              value={values.text}
              onChange={(event) => {
                setFieldValue("text", event.target.value);
              }}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Küldés
          </Button>
        </Form>
      </Row>
    </Container>
  );

  // console.log(user);
  // return <></>
};
