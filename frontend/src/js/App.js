import React, { useState } from "react";

import '../css/App.css';

import { Tree } from './prereq-tree/Tree';

function App() {
  return (
    <div className="App">
      <div className="view"><Tree /></div>
    </div>
  );
}

export default App;
