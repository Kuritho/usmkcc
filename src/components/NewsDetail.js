import React from 'react';
import { Container, Row, Col, Button, Carousel } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const NewsDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { item, type } = location.state || {};

  if (!item) {
    return (
      <Container className="py-5">
        <Row>
          <Col>
            <h2>Content not found</h2>
            <Button onClick={() => navigate('/campus-updates')}>Back to Campus Updates</Button>
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
          <h1>{item.title}</h1>
          <p className="text-muted">{item.date}</p>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          {item.images && item.images.length > 0 && (
            <Carousel className="mb-4">
              {item.images.map((img, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={img}
                    alt={`${item.title} - Image ${index + 1}`}
                    style={{ maxHeight: '500px', objectFit: 'cover' }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          )}
          
          <div className="content">
            {item.content || item.excerpt}
          </div>
        </Col>
        
        <Col lg={4}>
          <div className="bg-light p-4 rounded">
            <h5>Related {type === 'news' ? 'News' : 'Announcements'}</h5>
            <p>Other recent updates you might be interested in...</p>
            {/* You could add related items here */}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NewsDetail;