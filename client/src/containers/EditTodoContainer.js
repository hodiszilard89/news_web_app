import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import EditTodo2 from "../components/EditTodo2";
import { updateTodo } from "../actions/todos";
import { fromJS } from "immutable";

const EditTodoContainer = ({ todos, setMyData, update }) => {
  const { id } = useParams();
  console.log("update" + update);

  const item = todos.get("" + id);

  return <EditTodo2 item={item} update={update} />;
};

const mapStateToProps = (state) => ({
  todos: state.todos,
});

const mapDispatchToProps = (dispatch) => ({
  update: (item) => dispatch(updateTodo(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTodoContainer);
