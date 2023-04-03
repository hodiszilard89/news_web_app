import { ADD_TODO, CHANGE_FLAG, DEL_TODO, UPDATE_TODO } from "./index";

export function addTodo(newTodo) {
  return {
    type: ADD_TODO,
    newTodo,
  };
}

export function updateTodo(newTodo) {
  return {
    type: UPDATE_TODO,
    newTodo,
  };
}
export function delTodo(id) {
  return {
    type: DEL_TODO,
    id,
  };
}

export function changeTodoFlag(id, onDeleting = false, done = false) {
  return {
    type: CHANGE_FLAG,
    id,
    onDeleting,
    done,
  };
}
/**
 * példa AJAX hívásra
 */

export function addTodoOnServer(item) {
  console.log(item);
  return (dispatch) => {
    console.log("már majdnem");
    setTimeout(() => {
      console.log("namost");
      dispatch(addTodo(item.value));
    }, 1000);
  };
}
export function delTodoOnServer(id) {
  return (dispatch) => {
    console.log("már majdnem");
    setTimeout(() => {
      console.log("most törlöm");
      dispatch(delTodo(id));
    }, 1000);
  };
}
