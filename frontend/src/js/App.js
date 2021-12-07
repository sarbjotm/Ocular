import React, { useState } from "react";

import '../css/App.css';

import { Tree } from './prereq-tree/Tree';
import { Enrolment } from './enrollment/Enrolment';

function App() {
  const [view, setView] = useState("tree");

  const headerComponent = () => {
    return (
      <>
        <button onClick={() => {setView("tree")}}>Prerequisite Tree</button>
        <button onClick={() => {setView("enrolment")}}>Enrolment</button>
      </>
    );
  }

  const viewComponent = () => {
    switch(view) {
      case "tree":
        return <Tree />;
      case "enrolment":
        return <Enrolment />;
      default:
        return <Tree />;
    }
  }

  return (
    <div className="App">
      <div className="header">{headerComponent()}</div>
      <br/>
      <div className="view">{viewComponent()}</div>
    </div>
  );
}

export default App;
