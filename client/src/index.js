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

//var colors = ["red", "blue", "yellow"];

// function reducer(
//   state = fromJS({
//     todos: {
//       1: { id: 1, value: "Psita", color: "blue" },
//     },
//     search: "",
//     color: "",
//   }),
//   action
// ) {
//   if (action.type === "ADD_TODO") {
//     let id = Math.random();
//     //console.log(action.newTodo);
//     return state.setIn(
//       ["todos", "" + id],
//       fromJS({
//         value: action.newTodo,
//         id,
//         color: colors[Math.floor(Math.random() * colors.length)],
//       })
//     );
//   }
//   /////////////////////////////////////////
//   // return state.set(
//   //   "todos",
//   //   state
//   //     .get("todos")
//   //     .push(fromJS({ id: Math.random(), value: action.newTodo }))
//   // );

//   ///////////////////////////////////////////////////////////////
//   // let newTodos = JSON.parse(JSON.stringify(state.get("todos")));
//   // newTodos.push({
//   //   id: Math.random(),
//   //   value: action.newTodo,
//   // });
//   // return {
//   //   todos: newTodos,
//   //   search: state.search,

//   if (action.type === "SEARCH_CHANGE") {
//     //let newState = JSON.parse(JSON.stringify(state.todos));
//     //console.log(action.newSearchValue);
//     return state.set("search", "" + action.newSearchValue);
//   }
//   if (action.type === "DEL_TODO") {
//     return state.deleteIn(["todos", "" + action.id]);
//     ///////////////////////////////////////////
//     // return state.set(
//     //   "todos",
//     //   state.get("todos").filter((e) => e.get("id") !== action.id)
//     // );
//     ////////////////////////////////////////
//     // let newTodos = state.get("todos").filter((e) => e.get("id") !== action.id);
//     // return {
//     //   todos: newTodos,
//     //   search: state.search,
//   }
//   return state;
// }

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
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
