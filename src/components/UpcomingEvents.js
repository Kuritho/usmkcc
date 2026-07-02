import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UpcomingEvents = () => {
  const navigate = useNavigate();
  
  // Sample events data with full content
  const events = [
    {
      id: 1,
      title: 'Enrollment Period',
      date: 'JUL 15, 2025',
      image: "/images/event-enrollment.jpg",
      excerpt: '1st Semester A.Y. 2025-2026 enrollment for all students begins.',
      content: "Full details about the enrollment process, requirements, and schedule...",
      images: ["/images/event-enrollment.jpg", "/images/event-enrollment-detail1.jpg"],
      location: "USM-KCC Administration Building",
      time: "8:00 AM - 5:00 PM"
    },
    {
      id: 2,
      title: 'Freshman Orientation',
      date: 'AUG 15, 2025',
      image: "/images/event-orientation.jpg",
      excerpt: 'Welcome event for incoming freshman students of A.Y. 2025-2026.',
      content: "Complete information about the freshman orientation program...",
      images: ["/images/event-orientation.jpg"],
      location: "USM-KCC Gymnasium",
      time: "9:00 AM - 4:00 PM"
    },
    {
      id: 3,
      title: 'Foundation Day',
      date: 'SEP 1, 2025',
      image: "/images/event-foundation.jpg",
      excerpt: 'Join us as we celebrate the university\'s founding anniversary.',
      content: "Detailed schedule of activities for Foundation Day celebrations...",
      images: ["/images/event-foundation.jpg", "/images/event-foundation-detail1.jpg"],
      location: "USM-KCC Campus Grounds",
      time: "8:00 AM - 8:00 PM"
    }
  ];

  const handleEventClick = (event) => {
    navigate(`/event/${event.id}`, { state: { event } });
  };

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center text-usmkc-green">Upcoming Events</h1>
          <p className="text-center text-muted">Mark your calendars for these important dates</p>
        </Col>
      </Row>

      <Row>
        {events.map(event => (
          <Col md={6} lg={4} key={event.id} className="mb-4">
            <Card 
              className="h-100 border-0 shadow-sm event-card" 
              style={{ cursor: 'pointer' }}
              onClick={() => handleEventClick(event)}
            >
              <div className="event-date bg-usmkc-green text-white text-center p-2">
                <h5 className="mb-0">{event.date.split(' ')[0]}</h5>
                <small>{event.date.split(' ')[1]}</small>
              </div>
              <Card.Img variant="top" src={event.image} />
              <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Text>{event.excerpt}</Card.Text>
                <Button variant="outline-usmkc-green" size="sm">More Info</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UpcomingEvents;