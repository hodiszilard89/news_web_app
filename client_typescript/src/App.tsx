import * as React from "react";
import { Button as ChakratButton } from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import { MyCarousel } from "./componens/my-carousel";
import { Route, Routes, Router, BrowserRouter } from "react-router-dom";
import { useNews } from "./store/hooks/useNews";
import { HomePage } from "./componens/page/home-page";
import Login from "./login/login";

import { RegisterPage } from "./componens/page/login/regist";
import NewsEditor from "./login/edit";
import { News } from "./componens/page/singlenews/news";

export const App = () => {
  const { isLoading, isFetching, newsData } = useNews({});
  // console.log(response);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/edit" element={<NewsEditor />} />
          <Route path="/news/:id" element={<News />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
