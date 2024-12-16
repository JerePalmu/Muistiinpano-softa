import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CourseManager() {
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const response = await axios.get('http://localhost:5000/courses');
    setCourses(response.data);
  };

  const addCourse = async () => {
    if (name.trim()) {
      await axios.post('http://localhost:5000/courses', { name });
      setName('');
      fetchCourses();
    }
  };

  return (
    <div>
      <h2>Courses</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name of the course"
      />
      <button onClick={addCourse}>Add</button>
      <ul>
        {courses.map(course => (
          <li key={course.id}>{course.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default CourseManager;