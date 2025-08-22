import React from "react";

const Scholarship = () => {
  return (
    <div className="scholarship-page" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <main>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          Scholarship is coming soon
        </h1>
        <p style={{ fontSize: '1.2rem' }}>
          Stay tuned for updates
        </p>
      </main>
    </div>
  );
};

export default Scholarship;