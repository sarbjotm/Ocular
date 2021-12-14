import React, { useState } from "react";

import '../css/App.css';

import { Tree } from './prereq-tree/Tree';

function App() {
  return (
    <>
      <div className="App-header">
        <a href="/calendar" className="ui button">Calendar</a>
        <a href="/courses" className="ui button">All Courses</a>
        <a href="/planner/" className="ui button">Course Tree</a>
        <a href="/enrollment" className="ui button">Enrollment</a>
        <a href="/users/logout" className="ui button">Logout</a>
      </div>
      <div className="App">
        <h1>Course Tree</h1>
        <div className="view"><Tree /></div>
      </div>
    </>
  );
}

export default App;
