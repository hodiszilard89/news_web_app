import { FC, useState } from "react";
import { Link as rLink } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
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
  Icon,
  Button
} from "@chakra-ui/react";

import { useFormik } from "formik";

import { User } from "../../models/user";

import { useUserChancages } from "../../store/hooks/use-user-chancages";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../../store/news/auth-user-slice";

import { useUploadImageMutation } from "../../store/news/news-api";

export interface UserDescProps {
  user: User;
  onSubmit: (user: User) => Promise<void>;
}

export const UserDesc: FC<UserDescProps> = ({ user, onSubmit }) => {


  const reader = new FileReader();

 
  const [base64Image, setBase64Image] = useState("");
  const [imgageUpload] = useUploadImageMutation();
  const [viewPass, setViewPass] = useState<Boolean>(false);
  const { updateUser } = useUserChancages();
  const viewer = useSelector(selectAuthUser).user;
  const { values, setFieldValue, handleSubmit } = useFormik({
    initialValues: user,
    onSubmit: async (values: User) => {
      try {
        const validatedValues = { ...values };
        // await console.log("image",image);
        await console.log("base64IMage", base64Image);
        await imgageUpload(base64Image);
        await updateUser({ user: validatedValues, image: base64Image });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const onClickViewIcon = () => {
    setViewPass(!viewPass);
  };
  const [image, setImage] = useState<string>(user.imagePath);
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
              src={image}
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
        <>
          <FormControl
            isDisabled={
              !viewer?.laws?.find((law) => law.title === "ADMIN") &&
              user.id !== viewer?.id
            }
          >
            <Grid pt={5} mb={5} templateColumns="repeat(3, 1fr)" gap={4}>
              <GridItem bg="">
                <FormLabel textTransform={"none"}>Chatname</FormLabel>
              </GridItem>
              <GridItem bg="">
                <Input
                  id={Math.random().toString()}
                  value={values?.chatName}
                  onChange={(event) => {
                    setFieldValue("chatName", event.target.value);
                  }}
                  //sx={style.inputField}
                />
              </GridItem>
            </Grid>
            <Grid mb={5} templateColumns="repeat(3, 1fr)" gap={4}>
              <GridItem bg="">
                <FormLabel textTransform={"none"}>Firstname</FormLabel>
              </GridItem>
              <GridItem bg="">
                <Input
                  id={Math.random().toString()}
                  value={values?.firstName}
                  onChange={(event) => {
                    setFieldValue("firstName", event.target.value);
                  }}
                  //sx={style.inputField}
                />
              </GridItem>
            </Grid>
            <Grid mb={5} templateColumns="repeat(3, 1fr)" gap={4}>
              <GridItem bg="">
                <FormLabel textTransform={"none"}>Lastname</FormLabel>
              </GridItem>
              <GridItem bg="">
                <Input
                  id={Math.random().toString()}
                  value={values?.secName}
                  onChange={(event) => {
                    setFieldValue("secName", event.target.value);
                  }}
                />
              </GridItem>
            </Grid>
            <Grid mb={5} templateColumns="repeat(3, 1fr)" gap={4}>
              <GridItem bg="">
                <FormLabel textTransform={"none"}>Email</FormLabel>
              </GridItem>
              <GridItem bg="">
                <Input
                  id={Math.random().toString()}
                  value={values?.email}
                  onChange={(event) => {
                    setFieldValue("email", event.target.value);
                  }}
                  //sx={style.inputField}
                />
              </GridItem>
            </Grid>

            {/* PASSWORD */}
            <Grid
              mb={5}
              templateColumns="repeat(3, 1fr)"
              gap={4}
              display={user.id === viewer?.id ? undefined : "none"}
              alignItems="center"
            >
              <GridItem bg="">
                <FormLabel textTransform={"none"}>Password</FormLabel>
              </GridItem>
              <GridItem bg="">
                <Input
                  id={Math.random().toString()}
                  type={viewPass ? "text" : "password"}
                  value={values?.password}
                  onChange={(event) => {
                    setFieldValue("password", event.target.value);
                  }}
                  //sx={style.inputField}
                />
              </GridItem>
              <GridItem>
                {viewPass ? (
                  <ViewIcon fontSize={"xl"} onClick={onClickViewIcon} />
                ) : (
                  <ViewOffIcon fontSize={"xl"} onClick={onClickViewIcon} />
                )}
              </GridItem>
            </Grid>

            <Grid
              mb={5}
              templateColumns="repeat(3, 1fr)"
              gap={4}
              alignItems="center"
            >
              <GridItem bg="">
                <FormLabel textTransform={"none"}>Imagepath</FormLabel>
              </GridItem>
              <GridItem bg="" alignItems="center">
                <Input
                  type="file"
                  id="file-input"
                  onChange={(event) => {
                    const files = event.target.files;

                    if (files && files.length > 0) {
                      const file = files[0];
                      setImage(URL.createObjectURL(file));
                      // setImage(file)
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        const base64Image = reader.result
                          ?.toString()
                          .split(",")[1];
                        setBase64Image(base64Image!);
                        // console.log("render.result",reader.result)
                      };
                      //  console.log("render.result",reader.result)

                      reader.readAsDataURL(file);
                    }

                    //setImage(file)
                  }}

                />
              </GridItem>
            </Grid>
          </FormControl>
        </>

        <Button colorScheme='teal' variant='solid' type={"submit"} size={"lg"}>
          Küldés
        </Button>
        {user.laws?.find((law) => law.title === "ADMIN") ? (
          <>
            <Link ms={4} as={rLink} to={"/users"}>
              <Button colorScheme='teal' variant='solid' size={"lg"}>Back to Users List</Button>
            </Link>
            <Link ms={4} as={rLink} to={"/"}>
              <Button colorScheme='teal' variant='solid' size={"lg"}>Főoldal</Button>{" "}
            </Link>
          </>
        ) : (
          <Link ms={4} as={rLink} to={"/"}>
            <Button colorScheme='teal' variant='solid' size={"lg"}>Főoldal</Button>{" "}
          </Link>
        )}
      </Box>
    </>
  );
};
