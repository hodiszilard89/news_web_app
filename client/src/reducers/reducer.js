import { fromJS } from "immutable";
import {
  ADD_TODO,
  DEL_TODO,
  SEARCH_CHANGE,
  CHANGE_FLAG,
  UPDATE_TODO,
} from "../actions";

var colors = ["red", "blue", "yellow"];
export function reducer(
  state = fromJS({
    1: {
      id: 1,
      value: "Pista",
      color: "blue",
      done: false,
      onDeleting: false,
    },
  }),
  action
) {
  if (action.type === ADD_TODO) {
    let id = Math.random();
    console.log("hozzáűadtam");
    return state.set(
      "" + id,
      fromJS({
        value: action.newTodo,
        id,
        color: colors[Math.floor(Math.random() * colors.length)],
        done: false,
        onDeleting: true,
      })
    );
  }

  if (action.type === UPDATE_TODO) {
    // let id = Math.random();
    const item = fromJS(action.newTodo);
    return state.set(
      "" + action.newTodo.get("id"),
      action.newTodo
      // fromJS({
      //   value: action.newTodo,
      //   id: action.id,
      //   //color: colors[Math.floor(Math.random() * colors.length)],
      //   done: false,
      //   onDeleting: true,
      // })
    );
  }

  if (action.type === SEARCH_CHANGE) {
    return state.set("search", "" + action.newSearchValue);
  }
  if (action.type === DEL_TODO) {
    return state.remove("" + action.id);
  }

  if (action.type === CHANGE_FLAG) {
    let newState = state;
    if (action.done !== undefined) {
      newState.setIn(["todos", "" + action.id, "done"], action.done);
    }
    return state
      .setIn(["todos", "" + action.id, "onDeleting"], action.onDeleting)
      .setIn(["todos", "" + action.id, "done"], action.done);
  }
  return state;
}
