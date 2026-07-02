import React from 'react';
import { Container, Row, Col, Button, Carousel, Badge } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const EventDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { event } = location.state || {};

  if (!event) {
    return (
      <Container className="py-5">
        <Row>
          <Col>
            <h2>Event not found</h2>
            <Button onClick={() => navigate('/upcoming-events')}>Back to Events</Button>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <Button variant="outline-secondary" onClick={() => navigate(-1)} className="mb-3">
            <i className="fas fa-arrow-left me-2"></i>Back
          </Button>
          <h1>{event.title}</h1>
          <div className="d-flex flex-wrap gap-2 mb-3">
            <Badge bg="usmkc-green">{event.date}</Badge>
            {event.location && <Badge bg="secondary">{event.location}</Badge>}
            {event.time && <Badge bg="info">{event.time}</Badge>}
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          {event.images && event.images.length > 0 && (
            <Carousel className="mb-4">
              {event.images.map((img, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={img}
                    alt={`${event.title} - Image ${index + 1}`}
                    style={{ maxHeight: '500px', objectFit: 'cover' }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          )}
          
          <div className="content">
            {event.content || event.excerpt}
          </div>
        </Col>
        
        <Col lg={4}>
          <div className="bg-light p-4 rounded">
            <h5>Event Details</h5>
            {event.date && <p><strong>Date:</strong> {event.date}</p>}
            {event.time && <p><strong>Time:</strong> {event.time}</p>}
            {event.location && <p><strong>Location:</strong> {event.location}</p>}
            
            <Button variant="usmkc-green" className="w-100 mt-3">
              Add to Calendar
            </Button>
            <Button variant="outline-usmkc-green" className="w-100 mt-2">
              Share Event
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EventDetail;