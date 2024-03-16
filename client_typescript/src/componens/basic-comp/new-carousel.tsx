import React from "react";
import Slider from "react-slick";
import {
  Box,
  IconButton,
  Text,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { setNews } from "../../store/news/editor-slice";
import { News } from "../../models/news";
import { useDispatch } from "react-redux";
import { serializNews } from "../../utils/news_factory";
import { useNavigate } from "react-router-dom";

interface ImageSliderProps {
  news: News[];
}

const MyCarousel: React.FC<ImageSliderProps> = ({ news }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleImageClick = (news: News) => {

    dispatch(setNews(serializNews(news)));
    navigate("/news");
  };

  const [slider, setSlider] = React.useState<Slider | null>(null);

  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });
  return ( 
    <Box
  
      position={"relative"}
      height={"600px"}
      width={"full"}
      overflow={"hidden"}
    >
     
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt size="40px" />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton>
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {news.map((item, index) => (
          <Box
            onClick={() => handleImageClick(item)}
            key={index}
            height={"550px"}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${item.imgPath})`}
          >
           
            <Box
              padding={2}
              height="100px"
              width={"80%"}
              position="relative"
              top={"70%"}
              left={"10%"}
              backgroundColor={"rgba( 0, 0, 0, 0.5)"}
            >
              <Heading
                color={"white"}
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
              >
                {item.title}
              </Heading>
              <Text color={"white"} fontSize={{ base: "lg", lg: "xl" }}>
                {item.subtitle}
              </Text>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default MyCarousel;
