import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer as todoReducer } from "./reducer";
import { reducer as formReducer } from "redux-form/immutable";
import thunkMiddleware from "redux-thunk";

export const store = createStore(
  combineReducers({
    form: formReducer,
    todos: todoReducer,
  }),
  //todoReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);
