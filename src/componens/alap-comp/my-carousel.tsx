import { Button as StrapButton, Carousel, Row, Col } from "react-bootstrap";
import { Link as ChakraLink, useMultiStyleConfig } from "@chakra-ui/react";
import { Flex, Box, background, Text, Image } from "@chakra-ui/react";
import { FC } from "react";
import { setNews } from "../../store/news/editor-slice";
import {News} from "../../models/news"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectPrioritis } from "../../store/news/news-slice";
import { NewsDescProvider } from "../../page/singlenews/news-desc-provider";
import { serializNews } from "../../utils/news_factory";


interface MyCaruselProps{
  arr:News[]
}

export const MyCarousel: FC<MyCaruselProps> = ({arr}) => {
 // const prioritis = useSelector(selectPrioritis);
  const dispatch = useDispatch();
  const style = useMultiStyleConfig("CaroselLabel", {});

  return (
    <Row className={""}>
      <Col md={8}>
        <Box sx={{ padding: "5%" }}>
          <Carousel indicators={false}>
            {arr.map((news, id) => (
              <Carousel.Item
                key={id}
                //className="mb-3"
                style={
                  {
                    // marginBlockStart: "20px",
                  }
                }
              >
                <Image
                  sx={style.image}
                  //className="d-block w-100"
                  src="https://picsum.photos/1100/600?text=Slide+2"
                  alt="First slide"
                />
                <Carousel.Caption
                  className="text-start ps-3   "
                  style={{
                    outline: "1px solid back",
                    fontSize: "24px",

                    height: "100px",
                    padding: "10px",
                  }}
                >
                  <Box position={"absolute"} w={"450px"}>
                    {/* <Text onClick={()=>(<NewsDescProvider news={news}/>)}>proba</Text> */}
                    <ChakraLink
                      as={Link}
                      to={`/news/0`}
                      backgroundColor={"rgba( 0, 0, 0, 0.5)"}
                     // onClick={() => dispatch(setNews(news))}
                     onClick={()=>(dispatch(setNews(serializNews(news))))}
                    >
                      {news.title}
                    </ChakraLink>
                  </Box>

                  {/* <br />
                <Text mt={2} sx={style.proba}>
                  sdasdfasfasdfasdfasdf
                </Text> */}
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Box>
      </Col>
      <Col md={4}></Col>
    </Row>
  );
};
