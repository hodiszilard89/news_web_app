import { SET_USERS } from "./index";

export function setUsers(users) {
  return {
    type: SET_USERS,
    users,
  };
}

export function getUsers() {
  let response;
  async () => {
    response = await fetch("/users")
      .then((response) => response.json())
      .then((data) => {
        response = data;
      })
      .catch((error) => {
        console.error(error);
      });
    //store.dispatch(setUsers(response));
  };

  console.log(response);
  return {
    response,
  };
}
