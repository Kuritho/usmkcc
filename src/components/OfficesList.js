// src/components/OfficesList.js - Updated with consistent styling
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Carousel, Spinner, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getOffices } from '../supabase/services';

const OfficesList = () => {
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const galleryImages = [
    { id: 1, src: "/images/adminbuilding.jpg", alt: "Administration Building" },
    { id: 2, src: "/images/chancelloroffice.jpg", alt: "Office of the Chancellor" },
    { id: 3, src: "/images/registrar.jpg", alt: "Office of the Registrar" },
    { id: 4, src: "/images/guidance.jpg", alt: "Guidance Office" },
    { id: 5, src: "/images/clinic.jpg", alt: "Clinic" },
    { id: 6, src: "/images/osa.jpg", alt: "Office of the Student Affairs" },
    { id: 7, src: "/images/lrc.jpg", alt: "Learning Resource Center" },
    { id: 8, src: "/images/hr.jpg", alt: "HRMDO" },
    { id: 9, src: "/images/sciencebuilding.jpg", alt: "ICTO" },
    { id: 10, src: "/images/supply.jpg", alt: "Supply" },
    { id: 11, src: "/images/ceas.jpg", alt: "College of Education, Arts, and Sciences" },
    { id: 12, src: "/images/cot.jpg", alt: "College of Technology" },
    { id: 13, src: "/images/coe.jpg", alt: "College of Engineering" }
  ];

  useEffect(() => {
    loadOffices();
  }, []);

  const loadOffices = async () => {
    setLoading(true);
    try {
      const result = await getOffices();
      if (result.success) {
        setOffices(result.data);
      } else {
        console.error('Error loading offices:', result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIconClass = (iconName) => {
    return iconName || 'bi-building';
  };

  if (loading) {
    return (
      <div style={{
        backgroundColor: '#f8f9fa',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Container className="text-center py-5">
          <Spinner animation="border" variant="success" style={{ width: '3rem', height: '3rem' }} />
          <p className="mt-3 text-muted">Loading offices...</p>
        </Container>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '70vh', padding: '30px 0' }}>
      <Container>
        {/* Banner image at the top */}
        <Row className="mb-4">
          <Col>
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              position: 'relative'
            }}>
              <img 
                src="/images/adminbuilding.jpg" 
                alt="USM-KCC Administrative Offices" 
                className="img-fluid w-100"
                style={{ maxHeight: '300px', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '30px 40px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)'
              }}>
                <h1 style={{ color: '#fff', fontWeight: '700', margin: 0, fontSize: '2rem' }}>
                  Administrative Offices
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.8)', margin: '5px 0 0', fontSize: '1rem' }}>
                  Connect with the offices that support your academic journey
                </p>
              </div>
            </div>
          </Col>
        </Row>

        {/* Gallery Section */}
        <Row className="mb-5">
          <Col>
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
            }}>
              <h5 style={{ color: '#00482D', fontWeight: '600', marginBottom: '15px' }}>
                <i className="fas fa-images me-2" style={{ color: '#FFD326' }}></i>
                Our Facilities
              </h5>
              <Carousel 
                activeIndex={galleryIndex} 
                onSelect={(selectedIndex) => setGalleryIndex(selectedIndex)}
                indicators={false}
                prevIcon={
                  <span aria-hidden="true" className="carousel-control-prev-icon gallery-nav-icon" />
                }
                nextIcon={
                  <span aria-hidden="true" className="carousel-control-next-icon gallery-nav-icon" />
                }
              >
                {galleryImages.map((image) => (
                  <Carousel.Item key={image.id}>
                    <div className="d-flex justify-content-center">
                      <img
                        className="d-block img-fluid rounded"
                        src={image.src}
                        alt={image.alt}
                        style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }}
                      />
                    </div>
                    {image.alt && (
                      <Carousel.Caption className="d-none d-md-block">
                        <h5 className="gallery-caption" style={{ 
                          backgroundColor: 'rgba(0,0,0,0.6)',
                          display: 'inline-block',
                          padding: '5px 20px',
                          borderRadius: '20px',
                          color: '#fff'
                        }}>
                          {image.alt}
                        </h5>
                      </Carousel.Caption>
                    )}
                  </Carousel.Item>
                ))}
              </Carousel>

              {/* Thumbnail navigation */}
              <div className="d-flex flex-wrap justify-content-center mt-3" style={{ gap: '6px' }}>
                {galleryImages.map((image, index) => (
                  <img
                    key={image.id}
                    src={image.src}
                    alt={`Thumbnail ${index + 1}`}
                    className={`img-thumbnail`}
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                      cursor: 'pointer',
                      borderRadius: '8px',
                      border: galleryIndex === index ? '2px solid #FFD326' : '2px solid #e9ecef',
                      opacity: galleryIndex === index ? 1 : 0.6,
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => setGalleryIndex(index)}
                    onMouseEnter={(e) => {
                      if (galleryIndex !== index) e.target.style.opacity = 0.8;
                    }}
                    onMouseLeave={(e) => {
                      if (galleryIndex !== index) e.target.style.opacity = 0.6;
                    }}
                  />
                ))}
              </div>
            </div>
          </Col>
        </Row>

        {/* Offices Grid */}
        <Row className="g-4">
          {offices.map((office) => (
            <Col key={office.id} md={6} lg={4}>
              <Card 
                as={Link} 
                to={`/offices/${office.id}`} 
                className="h-100 text-decoration-none"
                style={{
                  border: 'none',
                  borderRadius: '16px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
                }}
              >
                <div style={{
                  height: '6px',
                  background: 'linear-gradient(to right, #00482D, #FFD326)'
                }}></div>
                <Card.Body className="text-center py-4">
                  <div style={{
                    width: '70px',
                    height: '70px',
                    backgroundColor: 'rgba(0, 72, 45, 0.08)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 15px',
                    fontSize: '2rem',
                    color: '#00482D',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#00482D';
                    e.currentTarget.style.color = '#FFD326';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 72, 45, 0.08)';
                    e.currentTarget.style.color = '#00482D';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}>
                    <i className={`bi ${getIconClass(office.icon)}`}></i>
                  </div>
                  <Card.Title className="office-title" style={{ 
                    color: '#00482D', 
                    fontWeight: '600',
                    fontSize: '1.1rem',
                    marginBottom: '8px'
                  }}>
                    {office.name}
                  </Card.Title>
                  {office.description && (
                    <Card.Text className="office-description" style={{
                      color: '#6c757d',
                      fontSize: '0.9rem',
                      lineHeight: '1.5',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {office.description}
                    </Card.Text>
                  )}
                  {office.staff && office.staff.length > 0 && (
                    <Badge bg="light" style={{ color: '#00482D', fontWeight: '500' }}>
                      <i className="fas fa-users me-1"></i>
                      {office.staff.length} Personnel
                    </Badge>
                  )}
                </Card.Body>
                <Card.Footer style={{
                  backgroundColor: 'transparent',
                  borderTop: '1px solid #f0f0f0',
                  padding: '12px',
                  textAlign: 'center'
                }}>
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    style={{
                      borderColor: '#00482D',
                      color: '#00482D',
                      borderRadius: '20px',
                      padding: '5px 20px',
                      fontSize: '0.85rem'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#00482D';
                      e.target.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#00482D';
                    }}
                  >
                    View Details <i className="fas fa-arrow-right ms-1"></i>
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>

        {offices.length === 0 && (
          <Row className="mt-5">
            <Col>
              <div className="text-center py-5">
                <i className="fas fa-building" style={{ fontSize: '3rem', color: '#dee2e6' }}></i>
                <h5 className="mt-3 text-muted">No offices available at the moment</h5>
                <p className="text-muted">Please check back later.</p>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default OfficesList;