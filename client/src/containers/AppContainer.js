import { connect } from "react-redux";
import App from "../components/App";

import { addTodoOnServer, addTodo } from "../actions/todos";

function mapStateToProps(state, props) {
  // console.log("konténerből" + state.todos.get("todos"));
  return {
    todos: state.todos.keySeq(),

    todosByName: state.todos
      .toList()
      .sortBy((e) => e.get("value"))
      .map((e) => e.get("id")),
    //.keySeq(),
  };

  // return {
  //   todos: state
  //     .get("todos")
  //     .filter((e) => e.get("value").indexOf(state.get("search") !== -1))
  //     .map((e) => e.get("id")), //mindenki rálát a store ra ezért elég az id-t át adni nem kell az összeds todo obj
  // };
}
function mapDispatchToProps(dispatch, props) {
  return {
    // onAddTodo: (text) => dispatch(addTodo(text)),
    // onDelTodo: (id) => dispatch(delTodo(id)),
  };
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
