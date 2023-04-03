import { React, Component, createRef } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
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
      </div>
    );
  }
}

export default App;
