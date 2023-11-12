import { useAuthHeader } from "react-auth-kit";


export const useToken = () => {

    const auth = useAuthHeader();
    const token=auth();
    return {
      token
    };
  };
  