import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const OfficesList = () => {
  const [activeButton, setActiveButton] = useState('offices');
  const [galleryIndex, setGalleryIndex] = useState(0);

  const galleryImages = [
    { id: 1, src: "/images/adminbuilding.jpg", alt: "Administration Building" },
    { id: 2, src: "/images/chancelloroffice.jpg", alt: "Office of the Chancellor" },
    { id: 3, src: "/images/registrar.jpg", alt: "Office of the Registrar" },
    { id: 4, src: "/images/guidance.jpg", alt: "Guidance Office" },
    { id: 5, src: "/images/clinic.jpg", alt: "Clinic" },
    { id: 6, src: "/images/osa.jpg", alt: "Office of the Student Affairs" },
    { id: 7, src: "/images/lrc.jpg", alt: "Learning Resource Center" },
    { id: 8, src: "/images/hr.jpg", alt: "HRDMO" },
    { id: 9, src: "/images/sciencebuilding.jpg", alt: "ICTO" },
    { id: 10, src: "/images/supply.jpg", alt: "Supply" },
    { id: 11, src: "/images/ceas.jpg", alt: "College of Education, Arts, and Sciences" },
    { id: 12, src: "/images/cot.jpg", alt: "College of Technology" },
    { id: 13, src: "/images/coe.jpg", alt: "College of Engineering" }
    
  ];

  const offices = [
    { id: "chancellor", name: "Chancellor Office", description: "Central administrative office overseeing all campus operations", icon: "bi-person-badge" },
    { id: "admission", name: "Admission and Records Office", description: "Handles student admissions and academic records", icon: "bi-file-earmark-text" },
    { id: "cashier", name: "Cashier Office", description: "Manages financial transactions and tuition payments", icon: "bi-cash-coin" },
    { id: "instruction", name: "Instruction Office", description: "Oversees academic programs and curriculum", icon: "bi-book" },
    { id: "supply", name: "Supply Office", description: "Manages procurement and inventory", icon: "bi-box-seam" },
    { id: "research", name: "Research Office", description: "Coordinates research activities and grants", icon: "bi-search" },
    { id: "accounting", name: "Accounting Office", description: "Handles financial accounting and budgeting", icon: "bi-calculator" },
    { id: "hr", name: "HRDM Office", description: "Manages human resources and recruitment", icon: "bi-people" },
    { id: "student-affairs", name: "Office of Student Affairs", description: "Supports student welfare and activities", icon: "bi-mortarboard" },
    { id: "ict", name: "ICT Office", description: "Manages technology infrastructure and services", icon: "bi-laptop" }
  ];

  return (
    <Container className="py-5 offices-container">
      {/* Banner image at the top */}
      <Row className="mb-4">
        <Col>
          <img 
            src="/images/adminbuilding.jpg" 
            alt="USM-KCC Administrative Offices" 
            className="img-fluid rounded shadow campus-banner"
          />
        </Col>
      </Row>
      {/* Main Content */}
      <div className="text-center mb-5">
        <h1 className="section-title">
          Administrative Offices
        </h1>
        <p className="section-subtitle">
          Connect with the offices that support your academic journey
        </p>
      </div>

      {/* Gallery Section */}
      <Row className="mb-5 py-3 section-content">
        <Col>
          <h2 className="section-subtitle mb-4">Our Facilities</h2>
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
                    className="d-block img-fluid rounded shadow gallery-image"
                    src={image.src}
                    alt={image.alt}
                  />
                </div>
                {image.alt && (
                  <Carousel.Caption className="d-none d-md-block">
                    <h5 className="gallery-caption">
                      {image.alt}
                    </h5>
                  </Carousel.Caption>
                )}
              </Carousel.Item>
            ))}
          </Carousel>

          {/* Thumbnail navigation */}
          <div className="d-flex flex-wrap justify-content-center mt-3">
            {galleryImages.map((image, index) => (
              <img
                key={image.id}
                src={image.src}
                alt={`Thumbnail ${index + 1}`}
                className={`img-thumbnail mx-1 gallery-thumbnail ${galleryIndex === index ? 'active-thumbnail' : ''}`}
                onClick={() => setGalleryIndex(index)}
              />
            ))}
          </div>
        </Col>
      </Row>

      {/* Offices Grid */}
      <Row className="g-4 mb-5">
        {offices.map((office) => (
          <Col key={office.id} md={6} lg={4}>
            <Card 
              as={Link} 
              to={`/offices/${office.id}`} 
              className="h-100 office-card text-decoration-none"
            >
              <Card.Body className="text-center py-4">
                <div className="office-icon-container">
                  <i className={`bi ${office.icon}`}></i>
                </div>
                <Card.Title className="office-title">
                  {office.name}
                </Card.Title>
                <Card.Text className="office-description">
                  {office.description}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="office-footer">
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  className="office-button"
                >
                  View Details
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default OfficesList;