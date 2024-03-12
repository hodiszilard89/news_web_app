import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { getUsers, setUsers } from "../actions/users";
import CreateAccunt from "./pages/CreateAccunt";
import NewsEditor from "./pages/NewsEditor";
import setAlluser from "./asynk/api";

// async {
//   let loginResponse;
//   dispatch = useDispatch();
//   await fetch("/users")
//     .then((response) => response.json())
//     .then((data) => {
//       loginResponse = data;
//     })
//     .catch((error) => {
//       console.error(error);
//     });

//   dispatch(setUsers(loginResponse));
// }

function mapStateToProps(state, props) {
  console.log(getUsers());
  return {
    users: state.users,
  };
}
function mapDispatchToProps(dispatch, props) {
  return {};
}

const NewsEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsEditor);

export default NewsEditorContainer;
