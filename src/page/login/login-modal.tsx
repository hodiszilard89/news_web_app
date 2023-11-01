import React, { FC, useState, useCallback, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decodeJwt } from "jose";
import { ChakraProvider, FormErrorMessage, ModalContent, ModalOverlay, FormControl, Input, Button, FormLabel} from "@chakra-ui/react";
import axios from "axios";
import { User } from "../../models/user";
import { Modal, ModalBody, ModalFooter } from "@chakra-ui/react";

import { closeLogin, selectLogin, selectShowLogin } from "../../store/news/login-slice";
import { showReg } from "../../store/news/reg-slice";
import { useFormik } from "formik";
import { useAuthUser } from "react-auth-kit";
import { useSignIn } from "react-auth-kit";
import { useGetUser } from "../../store/hooks/use-get-user";
import { setUser } from "../../store/news/auth-user-slice";
import { useGetToken } from "../../store/hooks/use-get-token";
import { GetTokenQueryParams } from "../../store/news/news-api";
export interface Token {
  role: string;
  iss: string;
  email: string;
  id: number;
}

interface LoginModalParam {
  onSubmit: (param: GetTokenQueryParams) => {};
}

const LoginModal: FC = () => {
  const [showModal, setShowModal] = useState(useSelector(selectShowLogin));
  const initialToken: Token = {
    role: "",
    iss: "",
    email: "",
    id: 0,
  };
  const initParam: GetTokenQueryParams = {
    email: "",
    password: "",
  };

  const { showLogin } = useSelector(selectLogin);

  const dispatch = useDispatch();
  const singIn = useSignIn();

  //token kérés paraméterei
  const [tokenParams, setTokenParams] =
    useState<GetTokenQueryParams>(initParam);


  const auth = useAuthUser();
  const authUserInStorage = auth();

  const [authUser, setMyAuthUser] = useState<User>();

  const { isLoading: Loading, data } = useGetUser(authUserInStorage?.id);

  useEffect(() => {
    setMyAuthUser(data);
    console.log(authUser);
    // dispach(setNews(news));

    dispatch(setUser(data));
  }, [data]);

  const { serverErrors, isLoading, isFetching, tokenValue } =
    useGetToken(tokenParams);
  const [error, setError] = useState(serverErrors?.data.messages)
  // const { serverErrors, isLoading, isFetching, tokenValue } = tokenParams
  // ? useGetToken(tokenParams)
  // : { serverErrors: null, isLoading: false, isFetching: false, tokenValue: null };

  
  useEffect(() => {
    if (tokenValue) {
      const { role, id } = decodeJwt(tokenValue) as unknown as Token;

      //ALKALMAZÁSON BELÜLI FH BEÁLLÍTÁS A LOCALSTOREBA
      tokenValue &&
        singIn({
          token: tokenValue,
          expiresIn: 36000,
          tokenType: "Bearer",
          authState: { email: values.email, role, id },
        });
      dispatch(closeLogin());
      // globál stateba rakni a frlhasználót
    } else {
      setError(serverErrors?.data.messages);
      
    }
  }, [tokenValue, tokenParams]);

  //FORMIK RÉSZ
  const { errors, values, setFieldValue, handleSubmit, setValues } = useFormik({
    initialValues: tokenParams,
    onSubmit: async (values, { setSubmitting }) => {
      await setTokenParams({
        email: values.email,
        password: values.password,
      });
    },
  });

  const onOpenReg = useCallback(() => {
    dispatch(closeLogin());
    dispatch(showReg());

    //dispatch(showReg());
  }, []);


  const onClose = useCallback(() => {
    dispatch(closeLogin());
    setShowModal(false)
    setError("");
    setValues({email:"", password:""})
  }, [dispatch]);

  useEffect(() => {
    setShowModal(showLogin);
  }, [showLogin]);

  useEffect(() => {
    setError(serverErrors?.data.messages)
  },[serverErrors]);

  return (
    <ChakraProvider>
      <Modal 
        blockScrollOnMount={false}
        isOpen={showModal}
        onClose={() => onClose()}        
      >
        <ModalOverlay opacity={0.5}/>
        <ModalContent
         
        >
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormLabel>
              {error ? `Error ${error}` : ""}
            </FormLabel>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                //type="email"
                type="text"
                placeholder="Adja meg az email címét"
                value={values.email}
                autoComplete="new-email"
                onChange={(event) => setFieldValue("email", event.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Jelszó</FormLabel>
              <Input
                type="password"
                autoComplete="new-password"
                placeholder="Adja meg a jelszavát"
                value={values.password}
                onChange={(event) =>
                  setFieldValue("password", event.target.value)
                }
              />
            </FormControl>
            <Button
              onClick={() => {
                setTokenParams({
                  email: values.email,
                  password: values.password,
                });
              }}
              variant="primary"
              type="submit"
            >
              Bejelentkezés
            </Button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={onOpenReg}>
            Regisztráció
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Bezárás
          </Button>
        </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default LoginModal;
