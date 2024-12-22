import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function MainView() {
  return (
    <div className="container">
      <h1 className="title">NotesApp</h1>
      <nav className="buttonsContainer">
        <Link to="/notelist" className="button">Create notes for class</Link>
        <Link to="/notesession" className="button">List notes</Link>
        <Link to="/coursemanager" className="button">Add courses</Link>
      </nav>
    </div>
  );
}

export default MainView;