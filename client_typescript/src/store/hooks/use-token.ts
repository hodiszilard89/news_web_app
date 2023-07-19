import { useAuthHeader } from "react-auth-kit";


export const useToken = () => {

    const auth = useAuthHeader();
    const token=auth();
    console.log(token);
    return {
      token
    };
  };
  