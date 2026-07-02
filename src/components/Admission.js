import React from 'react';
import { Button, Container } from 'react-bootstrap';

const Admission = () => {
  const handleAdmissionClick = () => {
    window.location.href = "https://www.usm.edu.ph/student/admission/";
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Button 
        variant="success" 
        size="lg" 
        onClick={handleAdmissionClick}
        style={{ backgroundColor: '#2c5e2e', borderColor: '#2c5e2e' }}
      >
        Admission
      </Button>
    </Container>
  );
};

export default Admission;