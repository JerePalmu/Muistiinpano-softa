import React, { useState, useEffect } from 'react';

function NoteSession() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [text, setText] = useState('');
  const [sessionNotes, setSessionNotes] = useState([]);
  const [currentSessionNotes, setCurrentSessionNotes] = useState([]);
  const [isCourseLocked, setIsCourseLocked] = useState(false);

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
      if (!isCourseLocked) {
        setIsCourseLocked(true);
      }

      const newNote = {
        id: getNextNoteId(),
        text,
        courseId: selectedCourse,
        timestamp: new Date().toLocaleString(),
      };

      const updatedNotes = [...sessionNotes, newNote];
      setSessionNotes(updatedNotes);
      sessionStorage.setItem('sessionNotes', JSON.stringify(updatedNotes));

      setCurrentSessionNotes([...currentSessionNotes, newNote]);

      setText('');
    }
  };

  const startNewSession = () => {
    setIsCourseLocked(false);
    setSelectedCourse('');
    setText('');
    setCurrentSessionNotes([]);
  };

  let content;
  if (courses.length === 0) {
    content = <p>Add courses first!</p>;
  } else {
    content = (
      <>
        <select
          onChange={(e) => setSelectedCourse(e.target.value)}
          value={selectedCourse}
          disabled={isCourseLocked}
        >
          <option value="">Choose a course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
        <textarea
          className="textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a note..."
        />
        <div className="containerAdd">
          <button className="buttonAdd" onClick={startNewSession}>
            Start New Session
          </button>
          <button className="buttonAdd" onClick={saveNote} disabled={!selectedCourse}>
            Save
          </button>
        </div>
        <h3>Notes in this session:</h3>
        <ul>
          {currentSessionNotes.map((note) => (
            <li key={note.id}>{note.text}</li>
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