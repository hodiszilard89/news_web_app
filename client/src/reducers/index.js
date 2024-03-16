import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer as todoReducer } from "./reducer";
import { usersReducer } from "./usersReducer";
//import { reducer as formReducer } from "redux-form/immutable";
import thunkMiddleware from "redux-thunk";

export const store = createStore(
  combineReducers({
    todos: todoReducer,
    users: usersReducer,
  }),

  composeWithDevTools(applyMiddleware(thunkMiddleware))
);
