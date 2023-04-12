import * as React from "react";
import { Button as ChakratButton } from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import { MyCarousel } from "./componens/my-carousel";
import { Route, Routes, Router, BrowserRouter } from "react-router-dom";
import { useNews } from "./store/hooks/useNews";
import { HomePage } from "./componens/page/home-page";
import { LoginPage } from "./componens/page/login/login";
import { RegisterPage } from "./componens/page/login/regist";

export const App = () => {
  const { isLoading, isFetching, newsData } = useNews({});
  // console.log(response);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
