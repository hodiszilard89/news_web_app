import { connect } from "react-redux";
import { changeTodoFlag, delTodoOnServer } from "../actions/todos";
import { useParams } from "react-router-dom";
import TodoDetail from "../components/TodoDetail";

function mapStateToProps(state, props) {
  const { id } = GetParams();

  return {
    item: state.todos.get("" + id),
  };
}

function mapDispatchToProps(dispatch, props) {
  return {};
}

const TodoDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoDetail);

function GetParams() {
  return useParams();
}

export default TodoDetailContainer;
