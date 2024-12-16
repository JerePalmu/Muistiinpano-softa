import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NoteList() {
  const [notes, setNotes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');

  useEffect(() => {
    fetchNotes();
    fetchCourses();
  }, [selectedCourse]);

  const fetchNotes = async () => {
    const response = await axios.get('http://localhost:5000/notes', {
      params: { courseId: selectedCourse },
    });
    setNotes(response.data);
  };

  const fetchCourses = async () => {
    const response = await axios.get('http://localhost:5000/courses');
    setCourses(response.data);
  };

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:5000/notes/${id}`);
    fetchNotes();
  };

  return (
    <div>
      <h2>Notes</h2>
      <select onChange={(e) => setSelectedCourse(e.target.value)} value={selectedCourse}>
        <option value="">All</option>
        {courses.map(course => (
          <option key={course.id} value={course.id}>{course.name}</option>
        ))}
      </select>
      <ul>
        {notes.length === 0 ? (
          <p>No notes!</p>
        ) : (
          notes.map(note => (
            <li key={note.id}>
              {note.text} ({note.timestamp})
              <button onClick={() => deleteNote(note.id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default NoteList;
