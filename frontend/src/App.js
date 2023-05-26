import React from "react";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

/*
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/ans/:QID" element={<Questionnaire />}></Route>
          <Route
            exact
            path="/stats/:QID"
            element={<Statquestionnaire />}
          ></Route>
          <Route exact path="/stats" element={<AllStats />}></Route>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/:incorrect" element={<Incorrect />}></Route>
        </Routes>
      </div>
    </Router>
  );
}
*/

export default App;