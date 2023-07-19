import * as React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { Route, Routes, BrowserRouter } from "react-router-dom";

import { HomePage } from "./componens/home-page";

import { NewsDescProvider } from "./componens/page/singlenews/news-desc-provider";
import { NewsEditorProvider } from "./componens/page/edit-news/news-editor-provides";
import LoginModal from "./componens/page/login/login-modal";
import { LoginProvider } from "./componens/page/login/login-provider";
import { Proba } from "./componens/page/proba";
import RegModal from "./componens/page/regist/reg-modal";

export const App = () => {
  //console.log(response);
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* <Route path="/register" element={<RegisterPage />} /> */}
          <Route path="/edit" element={<NewsEditorProvider />} />
          <Route path="/edit/:id" element={<NewsEditorProvider />} />
          <Route path="/news/:id" element={<NewsDescProvider />} />
          <Route path="/login" element={<LoginModal />} />
          <Route path="/proba" element={<Proba />} />
        </Routes>
        <LoginProvider />
        <RegModal />
      </BrowserRouter>
    </React.StrictMode>
  );
};
