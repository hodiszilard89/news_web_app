import { FC } from "react";
import {
  Grid,
  Box,
  Text,
  HStack,
  VStack,
  Link,
  Icon,
  GridItem,
} from "@chakra-ui/react";
import {
  FaCopyright,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
export const Footer: FC = () => {
  return (
    <div>
      <Box marginTop={10} padding={15} backgroundColor={"lightgray"}>
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
          //alignItems={"center"}
          justifyItems={"center"}
          padding={"15"}

          // fontWeight="bold"
        >
          <GridItem>
            <Box justifyItems={"center"}>
              <Text fontWeight="bold">SZOLGÁLTATÁSOK</Text>
              <VStack>
                <Link>Lorem text</Link>
                <Link>Lorem text</Link>
                <Link>Lorem text</Link>
                <Link>Lorem text</Link>
              </VStack>
            </Box>
          </GridItem>
          <GridItem>
            <Box>
              <Text fontWeight="bold">ÜZLET</Text>
              <VStack>
                <Link>Lorem text</Link>
                <Link>Lorem text</Link>
              </VStack>
            </Box>
          </GridItem>
          <GridItem>
            <Text fontWeight="bold">KÖZÖSSÉGI OLDALAK</Text>
            <HStack spacing={8}>
              <Link href="https://de-de.facebook.com/">
                <FaFacebook fontSize={"24"} />
              </Link>
              <Link href="https://www.instagram.com/">
                <FaInstagram fontSize={"24"} />
              </Link>
              <Link href="https://twitter.com/">
                <FaTwitter fontSize={"24"} />
              </Link>
            </HStack>
          </GridItem>
        </Grid>
        <hr />
        <Text display={"flex"}>
          {" "}
          <Icon
            marginEnd={2}
            as={FaCopyright}
          /> {new Date().getFullYear()} Fake News
        </Text>
      </Box>
    </div>
  );
};
