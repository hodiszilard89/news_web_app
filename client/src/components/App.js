import { React, Component, createRef } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import HomePage from "../containers/pages/HomePage";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

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
          <Link to="/newseditor">
            <h4> NewsEditor</h4>
          </Link>
        </Container>
      </div>
    );
  }
}

export default App;
