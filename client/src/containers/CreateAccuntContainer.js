import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { setUsers } from "../actions/users";
import CreateAccunt from "./pages/CreateAccunt";

function mapStateToProps(state, props) {
  return {
    users: state.users,
  };
}
function mapDispatchToProps(dispatch, props) {
  return {
    onSetUsers: () => dispatch(setUsers()),
  };
}

const CreateAccuntContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAccunt);

export default CreateAccuntContainer;
