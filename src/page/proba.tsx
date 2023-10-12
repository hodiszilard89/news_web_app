import { FC, useState } from "react";
import { Text, Box, Container, Link } from "@chakra-ui/react";
import { useMultiStyleConfig, useSafeLayoutEffect } from "@chakra-ui/react";

import { Genre } from "../models/genre";

export const Proba: FC = () => {
  const style = useMultiStyleConfig("GenreLabel");
  const [list, setList] = useState<Genre[] | undefined>();
  const genreList = Object.values(Genre);

  const onClick = (value: string) => {
    console.log("provider", value);
  };

  return (
    <Box position={"absolute"} w={"200px"} h={"50"} >
      <Link
      backgroundColor={"yellow"}
        href="hello.hu"
      >
        szavak mentén tördel vajon?
      </Link>
    </Box>
  );

  {
    /* <Text
        as="span"
          sx={{
            position: "relative",
            display: "inline-block",
            _after: {
              content: "''",
              position: "absolute",
              bottom: "-1px",
              height: "2px",
              width: "100%",
              left: "0",
              backgroundColor: "black",
              transition: "transform 0.3s ease-in-out",
              transform: "scaleX(0)",
              transformOrigin: "left",
            },
            _hover: {
              
              cursor: "pointer",
              position:"relative",
              _after: {
               
                transform: "scaleX(1)",
              },
            },
          }}

          // sx={{
          //   color:"black",
          //   position: "relative",
          //   display: "inline-block",
          //   _after: {
          //     content: "''",
          //     position: "absolute",
          //     bottom: "-1px",
          //     height: "2px",
          //     width: "100%",
          //     left: "0",
          //     backgroundColor: "black",
          //     transition: "0.3s",
          //     //transitionTimingFunction:"ease-in-out",
          //     transform: "scaleX(0)",
          //     transformOrigin: "left",
          //   },
          //   _hover: {
          //     //backgroundColor: "black",
          //     cursor: "pointer",
          //     position: "relative",

          //     _after: {
          //       transform: "scaleX(1)",
          //     },
          //   },
          // }}
        >
          sdfasdfasdfasdddddddddddddddd
        </Text> */
  }
};
