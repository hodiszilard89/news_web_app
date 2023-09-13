import { FC } from "react";
import { Link as rLink } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Box,
  Link,
  Grid,
  GridItem,
  Image,
  Text,
  VStack,
  HStack,
  Input,
  Flex,
} from "@chakra-ui/react";
//import {Form} from 'react-bootstrap'
import { useFormik } from "formik";
import { Form, useParams } from "react-router-dom";
import { useGetUser } from "../../store/hooks/use-get-user";
import { User } from "../../models/user";
import { Button } from "react-bootstrap";
import { useUserChancages } from "../../store/hooks/use-user-chancages";

export interface UserDescProps {
  user: User;
  onSubmit: (user: User) => Promise<void>;
}

export const UserDesc: FC<UserDescProps> = ({ user, onSubmit }) => {
  const { updateUser } = useUserChancages();
  const { values, setFieldValue, handleSubmit } = useFormik({
    initialValues: user,
    onSubmit: async (values: User) => {
      try {
        const validatedValues = { ...values };
        await updateUser(validatedValues);
       
      } catch (e) {
        console.error(e);
      }
    },
  });
  return (
    <>
      <Box
        margin={"auto"}
        maxWidth={"80%"}
        bg={"white"}
        boxShadow={"md"}
        borderRadius={"15"}
      >
        <Grid templateColumns="repeat(3, 1fr)" gap={4} mb={10}>
          <GridItem bg="">
            <Image
              style={{ height: 300, width: 300 }}
              borderRadius={"50%"}
              src={user?.imagePath}
              padding={3}
            />
          </GridItem>
          <GridItem colSpan={2} bg="">
            <Text mt={"8"} as={"h1"}>
              {}
              {user?.chatName}
            </Text>
            <HStack>
              <Text as={Link} href={user?.email} color={"blue"}>
                {user?.email}
              </Text>
              <Text as={"span"} textAlign={"center"}>
                --Administrator
              </Text>
            </HStack>
          </GridItem>
        </Grid>
      </Box>
      <Box
        padding={"5"}
        margin={"auto"}
        maxWidth={"80%"}
        bg={"white"}
        boxShadow={"md"}
        borderRadius={"15"}
        ps={"150"}
        as="form"
        onSubmit={handleSubmit}
      >
        <FormControl>
          <Grid pt={5} mb={5} templateColumns="repeat(3, 1fr)" gap={4}>
            <GridItem bg="">
              <FormLabel textTransform={"none"}>Chatname</FormLabel>
            </GridItem>
            <GridItem bg="">
              <Input
                type="text"
                value={values?.chatName}
                onChange={(event) => {
                  setFieldValue("chatName", event.target.value);
                }}
                //sx={style.inputField}
              />
            </GridItem>
          </Grid>
        </FormControl>
        <FormControl>
          <Grid mb={5} templateColumns="repeat(3, 1fr)" gap={4}>
            <GridItem bg="">
              <FormLabel textTransform={"none"}>Firstname</FormLabel>
            </GridItem>
            <GridItem bg="">
              <Input
                value={values?.firstName}
                onChange={(event) => {
                  setFieldValue("firstName", event.target.value);
                }}
                //sx={style.inputField}
              />
            </GridItem>
          </Grid>
        </FormControl>
        <FormControl>
          <Grid mb={5} templateColumns="repeat(3, 1fr)" gap={4}>
            <GridItem bg="">
              <FormLabel textTransform={"none"}>Lastname</FormLabel>
            </GridItem>
            <GridItem bg="">
              <Input
                value={values?.secName}
                onChange={(event) => {
                  setFieldValue("secName", event.target.value);
                }}
              />
            </GridItem>
          </Grid>
        </FormControl>
        <FormControl>
          <Grid mb={5} templateColumns="repeat(3, 1fr)" gap={4}>
            <GridItem bg="">
              <FormLabel textTransform={"none"}>Email</FormLabel>
            </GridItem>
            <GridItem bg="">
              <Input
                value={values?.email}
                onChange={(event) => {
                  setFieldValue("email", event.target.value);
                }}
                //sx={style.inputField}
              />
            </GridItem>
          </Grid>
        </FormControl>
        <FormControl>
          <Grid mb={5} templateColumns="repeat(3, 1fr)" gap={4}>
            <GridItem bg="">
              <FormLabel textTransform={"none"}>Password</FormLabel>
            </GridItem>
            <GridItem bg="">
              <Input
                value={values?.password}
                onChange={(event) => {
                  setFieldValue("password", event.target.value);
                }}
                //sx={style.inputField}
              />
            </GridItem>
          </Grid>
        </FormControl>
        <FormControl>
          <Grid mb={5} templateColumns="repeat(3, 1fr)" gap={4}>
            <GridItem bg="">
              <FormLabel textTransform={"none"}>Imagepath</FormLabel>
            </GridItem>
            <GridItem bg="">
              <Input
                type="text"
                value={values?.imagePath}
                onChange={(event) => {
                  setFieldValue("imagePath", event.target.value);
                }}
                //sx={style.inputField}
              />
            </GridItem>
          </Grid>
        </FormControl>

        <Button type={"submit"} size={"lg"}>
          Küldés
        </Button>
        <Link ms={4} as={rLink} to={"/users"}>
          <Button size={"lg"}>Back to Users List</Button>
        </Link>
      </Box>
      <Box></Box>
    </>
  );
};
