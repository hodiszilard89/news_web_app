import * as React from "react";



import { Route, Routes, BrowserRouter } from "react-router-dom";

import { HomePage } from "./page/home-page";

import { NewsDescProvider } from "./page/singlenews/news-desc-provider";
import { NewsEditorProvider } from "./page/edit-news/news-editor-provides";

import { UsersList } from "./page/users-list/users-list";
import { LoginProvider } from "./page/login/login-provider";

import RegModal from "./page/regist/reg-modal";
import { UserDescProvides } from "./page/user/user-desc-provides";
import PaginatedModal from "./componens/basic-comp/paginatedmodal";

export const App = () => {

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />  
          <Route path="/edit" element={<NewsEditorProvider />} />
          <Route path="/edit/:id" element={<NewsEditorProvider />} />
          <Route path="/news" element={<NewsDescProvider />} />
          <Route path="/paiganted" element={<PaginatedModal isOpen={true} onClose={()=>{} } items={["első","második","harmadik"]} />} />     
          <Route path="/users" element={<UsersList/>}/>    
          <Route path="/user" element={<UserDescProvides/>}/> 
        </Routes>
        <LoginProvider />
        <RegModal />
      </BrowserRouter>
    </React.StrictMode>
  );
};
