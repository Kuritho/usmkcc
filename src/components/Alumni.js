import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Alumni = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6} className="text-center">
          <div className="mb-4">
            <i 
              className="fas fa-tools" 
              style={{ fontSize: '5rem', color: '#1a3d7c' }}
            ></i>
          </div>
          <h1 className="display-4 text-usmkc-green mb-3">
            Alumni Page Under Maintenance
          </h1>
          <p className="lead mb-4">
            We're currently updating our alumni section to serve you better.
            Please check back soon for new features, events, and success stories!
          </p>
          <Button 
            variant="usmkc" 
            size="lg" 
            onClick={() => window.history.back()}
            style={{ backgroundColor: '#1a3d7c', borderColor: '#1a3d7c' }}
          >
            <i className="fas fa-arrow-left me-2"></i>
            Go Back
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Alumni;