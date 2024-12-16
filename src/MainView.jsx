import React, { useState } from 'react';
import NoteList from './NoteList';
import NoteSession from './NoteSession';
import CourseManager from './CourseManager';

function MainView() {
  const [currentView, setCurrentView] = useState('list');

  return (
    <div>
      <h1>NotesApp</h1>
      <nav>
        <button style={styles.button} onClick={() => setCurrentView('list')}>Create notes for class</button>
        <button style={styles.button} onClick={() => setCurrentView('session')}>List notes</button>
        <button style={styles.button} onClick={() => setCurrentView('courses')}>Add courses</button>
      </nav>
      <hr />
      {currentView === 'list' && <NoteList />}
      {currentView === 'session' && <NoteSession />}
      {currentView === 'courses' && <CourseManager />}
    </div>
  );
}


const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'Arial, sans-serif',
    },
    title: {
      marginBottom: '20px',
      fontSize: '24px',
    },
    buttonsContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: '10px',
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
  };
  
  export default MainView;