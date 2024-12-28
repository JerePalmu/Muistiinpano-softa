import React, { useState, useEffect } from 'react';

function NoteSession() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [text, setText] = useState('');
  const [sessionNotes, setSessionNotes] = useState([]);

  useEffect(() => {
    const storedCourses = JSON.parse(sessionStorage.getItem('courses')) || [];
    setCourses(storedCourses);
    const storedNotes = JSON.parse(sessionStorage.getItem('sessionNotes')) || [];
    setSessionNotes(storedNotes);
  }, []);

  const getNextNoteId = () => {
    let lastId = parseInt(sessionStorage.getItem('lastNoteId')) || 0;
    const nextId = lastId + 1;
    sessionStorage.setItem('lastNoteId', nextId);
    return nextId;
  };

  const saveNote = () => {
    if (text.trim() && selectedCourse) {
      const newNote = { id: getNextNoteId(), text, courseId: selectedCourse, timestamp: new Date().toLocaleString() };
      const updatedNotes = [...sessionNotes, newNote];
      setSessionNotes(updatedNotes);
      sessionStorage.setItem('sessionNotes', JSON.stringify(updatedNotes));
      setText('');
    }
  };

  let content;
  if (courses.length === 0) {
    content = <p>Add courses first!</p>;
  } else {
    content = (
      <>
        <select onChange={(e) => setSelectedCourse(e.target.value)} value={selectedCourse}>
          <option value="">Choose a course</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>{course.name}</option>
          ))}
        </select>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a note..."
        />
        <button onClick={saveNote}>Save</button>
        <ul>
          {sessionNotes.map(note => (
            <li key={note.id}>
              {note.text} ({note.timestamp})
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <div>
      <h2>New Note</h2>
      {content}
    </div>
  );
}

export default NoteSession;