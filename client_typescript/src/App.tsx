import * as React from "react";



import { Route, Routes, BrowserRouter } from "react-router-dom";

import { HomePage } from "./pages/home-page";

import { NewsDescProvider } from "./pages/singlenews/news-desc-provider";
import { NewsEditorProvider } from "./pages/edit-news-page/news-editor-provides";

import { UsersList } from "./pages/users-list/users-list";
import { LoginProvider } from "./pages/login-page/login-provider";

import RegModal from "./pages/regist/reg-modal";
import { UserDescProvides } from "./pages/user/user-desc-provides";
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
