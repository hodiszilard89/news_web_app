import { FC, useEffect, useState } from "react";
import LoginModal from "./login-modal";
import { GetTokenQueryParams } from "../../store/news/news-api";
import { useGetToken } from "../../store/hooks/use-get-token";
interface customError {
  data: {
    messages: string;
    stack: string;
  };
  status: number;
}
export const LoginProvider: FC = () => {
  const initParam: GetTokenQueryParams = {
    username: "",
    password: "",
  };
  const [params, setParams] = useState<GetTokenQueryParams>({
    username: "",
    password: "",
  });
  const { serverErrors , tokenValue } = useGetToken(params);
  
  const onSubmit = async (param: GetTokenQueryParams) => {};
  return (
    <div>
      <LoginModal onSubmit={onSubmit} />
    </div>
  );
};
