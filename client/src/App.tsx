import backgroundImage from "./assets/Polka-Dots.svg";
import React from "react";
import {
  Redirect,
  Route,
  HashRouter as Router,
  Switch,
} from "react-router-dom";
import "./css/App.css";
import { DndProvider } from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";
import { Board } from "./components/Board";

function App() {
  return (
    <div
      className="App"
      style={{
        background: `url(${backgroundImage})`,
      }}
    >
      <Router>
        <Switch>
          <Route exact path={"/"}>
            <DndProvider options={HTML5toTouch}>
              <Board />
            </DndProvider>
          </Route>
          <Redirect from="*" to={"/"} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
