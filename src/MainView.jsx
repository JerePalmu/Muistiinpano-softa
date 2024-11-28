import React from 'react';

const MainView = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>NotesApp</h1>
      <div style={styles.buttonsContainer}>
        <button style={styles.button}>Create notes for class</button>
        <button style={styles.button}>List notes</button>
        <button style={styles.button}>Add courses</button>
      </div>
    </div>
  );
};

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