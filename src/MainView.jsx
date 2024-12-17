import React, { useState } from 'react';
import './MainView.css';  // Import the CSS file
import NoteList from './NoteList';
import NoteSession from './NoteSession';
import CourseManager from './CourseManager';

function MainView() {
  const [currentView, setCurrentView] = useState('list');

  return (
    <div className="container">
      <h1 className="title">NotesApp</h1>
      <nav className="buttonsContainer">
        <button className="button" onClick={() => setCurrentView('list')}>Create notes for class</button>
        <button className="button" onClick={() => setCurrentView('session')}>List notes</button>
        <button className="button" onClick={() => setCurrentView('courses')}>Add courses</button>
      </nav>
      <hr />
      {currentView === 'list' && <NoteList />}
      {currentView === 'session' && <NoteSession />}
      {currentView === 'courses' && <CourseManager />}
    </div>
  );
}

export default MainView;
