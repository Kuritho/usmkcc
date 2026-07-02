import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const Organizations = () => {
  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          {/* Square image from public/images/maingate.jpg */}
          <div className="text-center my-4">
            <Image
              src="/images/tableoforganization.png"
              alt="USM KCC Main Gate"
              rounded
              style={{
                width: '1290px',
                height: '1000px',
                objectFit: 'cover',
                // border: '3px solid #FFD326',
                // boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Organizations;