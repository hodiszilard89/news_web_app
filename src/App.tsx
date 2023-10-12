import * as React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { Route, Routes, BrowserRouter } from "react-router-dom";

import { HomePage } from "./page/home-page";
import {Proba} from "./page/proba"
import { NewsDescProvider } from "./page/singlenews/news-desc-provider";
import { NewsEditorProvider } from "./page/edit-news/news-editor-provides";
import LoginModal from "./page/login/login-modal";
import { UsersList } from "./page/users-list/users-list";
import { LoginProvider } from "./page/login/login-provider";
import { UserDesc } from "./page/user/user-desc";
import RegModal from "./page/regist/reg-modal";
import { UserDescProvides } from "./page/user/user-desc-provides";
import PaginatedModal from "./componens/alap-comp/paginatedmodal";

export const App = () => {

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* <Route path="/register" element={<RegisterPage />} /> */}
          <Route path="/edit" element={<NewsEditorProvider />} />
          <Route path="/edit/:id" element={<NewsEditorProvider />} />
          <Route path="/news/:id" element={<NewsDescProvider />} />
          <Route path="/paiganted" element={<PaginatedModal isOpen={true} onClose={()=>{} } items={["első","második","harmadik"]} />} />
          {/* <Route path="/login" element={<LoginProvider />} /> */}
          <Route path="/proba" element={<Proba />} />
          <Route path="/users" element={<UsersList/>}/> 
          {/* <Route path="/users" element={<UserDescProvides/>}/>   */}
          <Route path="/user" element={<UserDescProvides/>}/> 
        </Routes>
        <LoginProvider />
        <RegModal />
      </BrowserRouter>
    </React.StrictMode>
  );
};
