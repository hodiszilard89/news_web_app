import { store } from "./index";
import { fromJS } from "immutable";
import { SET_USERS } from "../actions/index";
import { useDispatch } from "react-redux";
import { setUsers } from "../actions/users";

export function usersReducer(state = fromJS({}), action) {
  // store.dispatch(setUsers("asdasdasd"));
  if (action.type === SET_USERS) {
    let id = Math.random();
    let newState = state;
    action.users.forEach((user) => {
      id = Math.random();
      newState = newState.set("" + id, fromJS(user));
    });

    return newState;
  }
  return state;
}
