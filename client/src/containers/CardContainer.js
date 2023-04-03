import { connect } from "react-redux";
import { changeTodoFlag, delTodoOnServer } from "../actions/todos";
import MyCard from "../components/MyCard";

function mapStateToProps(state, props) {
  return {
    //item: state.todos.get("" + props.id),
    news: {
      title: "asdasdasd",
    },
  };
}
function mapDispatchToProps(dispatch, props) {
  return {};
}

const CardContainer = connect(mapStateToProps, mapDispatchToProps)(MyCard);

export default CardContainer;
