import { Component, React, createRef } from "react";
import { delTodo } from "../actions/todos";
import { Link } from "react-router-dom";
//import { Button } from "@chakra-ui/react";
class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { random: 0 };
    this.inputDone = createRef();
  }
  render() {
    return (
      <div>
        <input
          type="checkbox"
          checked={this.props.item.get("done")}
          onChange={(e) =>
            this.props.onDoneChange(!this.props.item.get("done"))
          }
        />
        <div
          style={{
            marginLeft: "10px",
            display: "inline-block",
            backgroundColor: this.props.item.get("color"),
            opacity: this.props.item.get("onDeleting") ? 1 : 0.3,
          }}
        >
          {this.props.item.get("value")}
        </div>

        <button
          style={{ marginLeft: "15px", marginRight: "10px" }}
          onClick={this.props.onDelTodo}
        >
          <b>del</b>
        </button>
        <Link to={"/todo/" + this.props.item.get("id")}>
          <b>show</b>
        </Link>
        <Link
          style={{ marginLeft: "15px", marginRight: "10px" }}
          to={"/edittodo/" + this.props.item.get("id")}
        >
          <b>edit</b>
        </Link>
      </div>
    );
  }
}

export default ListItem;
