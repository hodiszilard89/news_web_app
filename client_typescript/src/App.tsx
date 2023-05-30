import * as React from "react";
import { Button as ChakratButton } from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import { MyCarousel } from "./componens/alap-comp/my-carousel";
import { Route, Routes, Router, BrowserRouter } from "react-router-dom";
import { useNewsList } from "./store/hooks/use-news-list";
import { HomePage } from "./componens/page/home-page";
import NewsEditor from "./componens/page/add-news/add-news";
import Login from "./login/login";

import { RegisterPage } from "./componens/page/login/regist";
// import NewsEditor from "./componens/page/edit";
import { News } from "./componens/page/singlenews/news";

export const App = () => {
  const { isLoading, isFetching, newsData } = useNewsList({});
  //console.log(response);
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
