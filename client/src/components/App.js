import { React, Component, createRef } from "react";
import ListItemContainer from "../containers/ListItemContainer";
import { Link } from "react-router-dom";
import "../App.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Card from "./MyCard";
import CardContainer from "../containers/CardContainer";
import HomePage from "../containers/pages/HomePage";
import { Container } from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);
  }

  deleteMe(id) {
    console.log(id);
  }

  render() {
    return (
      <div className="App">
        <Container maxwidth={"50px"}>
          <HomePage />
        </Container>

        {/* <b>Bevitel szerint sorba:</b>
        {this.props.todos.map((e) => {
          return <ListItemContainer key={e} id={e} />;
        })}
        <hr />
        <b>Név szerint sorba:</b>
        {this.props.todosByName.map((e) => {
          return <ListItemContainer key={e} id={e} />;
        })} */}
        {/* <Link to="/newtodo">Új todo</Link> */}
        {/* <input type="text" ref={this.inputRef} />
        <button
          onClick={(e) => this.props.onAddTodo(this.inputRef.current.value)}
        >
          <b>Add</b>
        </button> */}
      </div>
    );
  }
}

export default App;
