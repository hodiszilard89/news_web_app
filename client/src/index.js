import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppContainer from "./containers/AppContainer";
// import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
// import { composeWithDevTools } from "redux-devtools-extension";
// import { fromJS } from "immutable";
import { store } from "./reducers";
import SingIn from "./components/SingIn";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoDetailContainer from "./containers/TodoDetailContainer";
import EditTodoContainer from "./containers/EditTodoContainer";
import NewTodoContainer from "./containers/NewTodoContainer";
import TodoEdit from "./components/TodoEdit";
import NewsEditor from "./containers/pages/NewsEditor";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppContainer />} />
          <Route path="/newtodo" element={<NewTodoContainer />} />
          <Route path="/todo/:id" element={<TodoDetailContainer />} />
          <Route path="/edittodo/:id" element={<EditTodoContainer />} />
          <Route path="/newseditor" element={<NewsEditor />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
