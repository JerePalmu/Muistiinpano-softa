import React, { useState, useEffect } from 'react';

function CourseManager() {
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const storedCourses = JSON.parse(sessionStorage.getItem('courses')) || [];
    setCourses(storedCourses);
  }, []);

  const getNextId = () => {
    let lastId = parseInt(sessionStorage.getItem('lastCourseId')) || 0;
    const nextId = lastId + 1;
    sessionStorage.setItem('lastCourseId', nextId);
    return nextId;
  };

  const addCourse = () => {
    if (!name.trim()) {
      setMessage('Course name cannot be empty.');
      return;
    }

    const newCourse = { id: getNextId(), name };
    const updatedCourses = [...courses, newCourse];
    setCourses(updatedCourses);
    sessionStorage.setItem('courses', JSON.stringify(updatedCourses));

    setMessage(`Course '${newCourse.name}' added with ID ${newCourse.id}`);
    setName('');
  };

  return (
    <div>
      <h2>Add a Course</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name of the course"
      />
      <button onClick={addCourse}>Add</button>
      {message && <p>{message}</p>}
      <h3>Courses</h3>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            {course.id}: {course.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseManager;