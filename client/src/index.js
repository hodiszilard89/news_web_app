import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppContainer from "./containers/AppContainer";

import { Provider, useDispatch } from "react-redux";
import reportWebVitals from "./reportWebVitals";

import { store } from "./reducers";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoDetailContainer from "./containers/TodoDetailContainer";
import EditTodoContainer from "./containers/EditTodoContainer";
import NewTodoContainer from "./containers/NewTodoContainer";
import NewsEditorContainer from "./containers/NewsEditorContainer";

import CreateAccuntContainer from "./containers/CreateAccuntContainer";
import { setUsers } from "./actions/users";

const root = ReactDOM.createRoot(document.getElementById("root"));

// async function get() {
//   let response = await fetch("/users")
//     .then((response) => response.json())
//     .then((data) => {
//       response = data;
//     })
//     .catch((error) => {
//       console.error(error);
//     });
//   store.dispatch(setUsers(response));
// }
// get();
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppContainer />} />
          <Route path="/newtodo" element={<NewTodoContainer />} />
          <Route path="/todo/:id" element={<TodoDetailContainer />} />
          <Route path="/edittodo/:id" element={<EditTodoContainer />} />
          <Route path="/newseditor" element={<NewsEditorContainer />} />
          <Route path="/createaccunt" element={<CreateAccuntContainer />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// import axios from 'axios';

// const fetchData = async () => {
//   try {
//     const response = await axios.get('/api/data');
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

// export default fetchData;
