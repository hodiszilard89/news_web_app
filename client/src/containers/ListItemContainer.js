import { connect } from "react-redux";
import { changeTodoFlag, delTodoOnServer } from "../actions/todos";
import ListItem from "../components/ListItem";

function mapStateToProps(state, props) {
  //let oneTodo = state.getIn("todos", "" + props.id); // meghíváskor a tagben átadott id paraméter
  return {
    item: state.todos.get("" + props.id),
  };
  // let oneTodo = state.get("todos").filter((e) => e.get("id") === props.id); // meghíváskor a tagben átadott id paraméter
  // return {
  //   item: oneTodo.first(),
  // };
}
function mapDispatchToProps(dispatch, props) {
  return {
    onDelTodo: () => dispatch(delTodoOnServer(props.id)), //onDelTodo nem kell id mert a props hordozza azt és onnan nyerjük ki
    onDoneChange: (newValue) => {
      dispatch(changeTodoFlag(props.id, undefined, newValue));
    },
  };
}

const ListItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItem);

export default ListItemContainer;
