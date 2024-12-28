import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainView from './MainView';
import NoteList from './NoteList';
import NoteSession from './Notes';
import CourseManager from './CourseManager';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/notelist" element={<NoteList />} />
        <Route path="/notesession" element={<NoteSession />} />
        <Route path="/coursemanager" element={<CourseManager />} />
      </Routes>
    </Router>
  );
}

export default App;