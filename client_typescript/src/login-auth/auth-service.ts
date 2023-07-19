import { decodeJwt } from "jose";
import { ValidationError } from "yup";
import { User } from "../models/user";

import { useAuthHeader } from "react-auth-kit";

const TOKEN_NAME = '_auth';
const API_URL = '/api/users';

const AuthService = (() => {
  let authToken: string | null = null;
  //const auth=useAuthHeader();
  const storage = window.sessionStorage;

  const login = async (username: string, password: string) => {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    if (response.status !== 200) {
      throw new ValidationError("Invalid username or password");
    }

    const { authToken } = await response.json();
    setAuthToken(authToken);
  };

  const getAuthToken = () => {
    console.log(storage.getItem(TOKEN_NAME));
    return storage.getItem(TOKEN_NAME) ?? null;
  };

  const setAuthToken = (token: string | null) => {
    if (token) {
      storage.setItem(TOKEN_NAME, token);
    } else if (getAuthToken()) {
      storage.removeItem(TOKEN_NAME);
    }
    authToken = token;
  };

  const getProfile = async (verify = false): Promise<User | null> => {
    const token = getAuthToken();
    if (token) {
      if (verify) {
        return requestProfile();
      }
      return decodeJwt(token) as unknown as User;
    }
    return null;
  };

  const requestProfile = async (): Promise<User> => {
    const authToken = getAuthToken();
    const authorization = authToken && `Bearer ${authToken}`;
    const response = await fetch(`${API_URL}/profile`, {
      method: "GET",
      headers: {
        authorization: authToken ? `Bearer ${authToken}`:"",
        "Content-Type": "application/json",
        "accept": "application/json"
      },
    });
    const result = await response.json();
    if (response.status === 200) {
      return result as User;
    }

    setAuthToken(null);
    return Promise.reject({
      status: response.status,
      error: result,
    });
  };

  return {
    login,
    getAuthToken,
    setAuthToken,
    getProfile,
  };
})();

export default AuthService;
