import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NoteSession() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [text, setText] = useState('');
  const [sessionNotes, setSessionNotes] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const response = await axios.get('http://localhost:5000/courses');
    setCourses(response.data);
  };

  const saveNote = async () => {
    if (text.trim()) {
      const response = await axios.post('http://localhost:5000/notes', {
        text,
        courseId: selectedCourse,
      });
      setSessionNotes([...sessionNotes, response.data]);
      setText('');
    }
  };

  return (
    <div>
      <h2>New note</h2>
      {courses.length === 0 ? (
        <p>Add courses first!</p>
      ) : (
        <>
          {!sessionNotes.length && (
            <select onChange={(e) => setSelectedCourse(e.target.value)} value={selectedCourse}>
              <option value="">Choose a course</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          )}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a note..."
          />
          <button onClick={saveNote}>Save</button>
          <ul>
            {sessionNotes.map(note => (
              <li key={note.id}>{note.text}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default NoteSession;