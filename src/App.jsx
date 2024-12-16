import React, { useState, useEffect } from 'react';
import './App.css'
import MainView from './MainView';
import NoteList from './NoteList';
import NoteSession from './NoteSession';
import CourseManager from './CourseManager';

function App() {
  return (
    <div>
      <MainView />
    </div>
  )
}

export default App