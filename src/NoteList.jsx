import React, { useState, useEffect } from 'react';

function NoteList() {
  const [notes, setNotes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');

  useEffect(() => {
    const storedNotes = JSON.parse(sessionStorage.getItem('sessionNotes')) || [];
    const storedCourses = JSON.parse(sessionStorage.getItem('courses')) || [];
    setNotes(storedNotes);
    setCourses(storedCourses);
  }, []);

  const filteredNotes = selectedCourse
    ? notes.filter(note => note.courseId === selectedCourse)
    : notes;

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    sessionStorage.setItem('sessionNotes', JSON.stringify(updatedNotes));
  };

  let content;
  if (filteredNotes.length === 0) {
    content = <p>No notes!</p>;
  } else {
    content = (
      <ul>
        {filteredNotes.map((note) => (
          <li key={note.id}>
            {note.text} ({note.timestamp})
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <h2>Notes</h2>
      <select onChange={(e) => setSelectedCourse(e.target.value)} value={selectedCourse}>
        <option value="">All</option>
        {courses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.name}
          </option>
        ))}
      </select>
      {content}
    </div>
  );
}

export default NoteList;