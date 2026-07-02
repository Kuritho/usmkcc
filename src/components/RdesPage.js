import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RdesPage = () => {
  // Sample images for RDES
  const images = [
    {
      id: 1,
      url: "https://picsum.photos/id/20/800/600",
      title: "Research Development",
      description: "Innovative research projects driving technological advancement"
    },
    {
      id: 2,
      url: "https://picsum.photos/id/24/800/600",
      title: "Extension Services",
      description: "Community engagement programs reaching diverse populations"
    },
    {
      id: 3,
      url: "https://picsum.photos/id/26/800/600",
      title: "Development Programs",
      description: "Capacity building and institutional development initiatives"
    },
    {
      id: 4,
      url: "https://picsum.photos/id/29/800/600",
      title: "Service Learning",
      description: "Students applying knowledge to real-world community needs"
    }
  ];

  const keyAreas = [
    {
      icon: "fas fa-chart-line",
      title: "Research Development",
      description: "Strengthening research capabilities, providing grants, and fostering a culture of innovation and scholarly inquiry."
    },
    {
      icon: "fas fa-seedling",
      title: "Sustainable Development",
      description: "Aligning programs with SDGs and creating sustainable impact through community-based interventions."
    },
    {
      icon: "fas fa-users",
      title: "Extension Services",
      description: "Delivering relevant extension programs that empower communities and address local development challenges."
    },
    {
      icon: "fas fa-tools",
      title: "Technical Services",
      description: "Providing expert technical assistance, laboratory services, and consultancy to external partners."
    }
  ];

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Hero Section */}
      <div style={{
        backgroundColor: '#00482D',
        color: '#ffffff',
        padding: '60px 0',
        position: 'relative',
        marginBottom: '40px'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(https://picsum.photos/id/30/1920/400)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15
        }}></div>
        <Container style={{ position: 'relative', zIndex: 1 }}>
          <Row className="text-center">
            <Col>
              <h1 style={{ 
                color: '#FFD326', 
                fontSize: '2.5rem',
                fontWeight: '700',
                marginBottom: '20px'
              }}>
                Research, Development, Extension & Services
              </h1>
              <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
                Integrating research, development, extension, and services to create holistic solutions for societal advancement
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <Container style={{ paddingBottom: '60px' }}>
        {/* Main Article */}
        <Row className="mb-5">
          <Col lg={8} className="mx-auto">
            <Card style={{ 
              border: 'none', 
              borderRadius: '15px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
              overflow: 'hidden'
            }}>
              <Card.Body style={{ padding: '30px' }}>
                <h2 style={{ color: '#00482D', marginBottom: '20px', fontWeight: '600' }}>
                  <i className="fas fa-synergy me-2" style={{ color: '#FFD326' }}></i>
                  A Comprehensive Approach to Knowledge and Service
                </h2>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#333', textAlign: 'justify' }}>
                  The Research, Development, Extension, and Services (RDES) framework at USM KCC represents our holistic commitment to creating meaningful impact in society. This integrated approach ensures that knowledge generated through research is effectively translated into practical applications through development programs, extended to communities, and supported by responsive services.
                </p>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#333', marginTop: '15px', textAlign: 'justify' }}>
                  RDES embodies the university's role as a catalyst for positive change, where rigorous research informs development initiatives, which are then delivered through extension programs and supported by quality services. This cycle of continuous improvement ensures that USM KCC remains responsive to the evolving needs of our stakeholders and contributes meaningfully to regional and national development goals.
                </p>
                <div style={{ 
                  backgroundColor: '#f0f9f0', 
                  padding: '20px', 
                  borderRadius: '10px',
                  marginTop: '20px',
                  borderLeft: '4px solid #FFD326'
                }}>
                  <i className="fas fa-quote-left" style={{ color: '#00482D', fontSize: '1.5rem', marginRight: '10px' }}></i>
                  <em style={{ fontSize: '1rem', color: '#00482D' }}>
                    "Research drives discovery, development enables application, extension facilitates adoption, and services ensure sustainability."
                  </em>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Key Areas Grid */}
        <Row className="mb-5">
          <Col>
            <h2 style={{ 
              color: '#00482D', 
              marginBottom: '30px', 
              fontWeight: '600',
              textAlign: 'center',
              borderBottom: '3px solid #FFD326',
              display: 'inline-block',
              width: 'auto',
              paddingBottom: '10px'
            }}>
              <i className="fas fa-cogs me-2"></i>
              Our Core Areas
            </h2>
          </Col>
        </Row>

        <Row className="g-4 mb-5">
          {keyAreas.map((area, index) => (
            <Col md={6} key={index}>
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '25px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                height: '100%',
                transition: 'all 0.3s ease',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
              }}>
                <i className={area.icon} style={{ fontSize: '3rem', color: '#FFD326', marginBottom: '15px' }}></i>
                <h4 style={{ color: '#00482D', marginBottom: '15px', fontWeight: '600' }}>
                  {area.title}
                </h4>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  {area.description}
                </p>
              </div>
            </Col>
          ))}
        </Row>

        {/* Image Gallery */}
        <Row className="mb-5">
          <Col>
            <h2 style={{ 
              color: '#00482D', 
              marginBottom: '30px', 
              fontWeight: '600',
              textAlign: 'center',
              borderBottom: '3px solid #FFD326',
              display: 'inline-block',
              width: 'auto',
              paddingBottom: '10px'
            }}>
              <i className="fas fa-camera-retro me-2"></i>
              In Action
            </h2>
          </Col>
        </Row>

        <Row className="g-4 mb-5">
          {images.map((image) => (
            <Col md={6} key={image.id}>
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease',
                height: '100%'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <img
                  src={image.url}
                  alt={image.title}
                  style={{
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover',
                    borderBottom: '3px solid #FFD326'
                  }}
                />
                <div style={{ padding: '20px' }}>
                  <h4 style={{ color: '#00482D', marginBottom: '10px', fontWeight: '600' }}>
                    {image.title}
                  </h4>
                  <p style={{ color: '#666', lineHeight: '1.6' }}>
                    {image.description}
                  </p>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* RDES Continuum */}
        <Row className="mt-4">
          <Col>
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '15px',
              padding: '30px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.08)'
            }}>
              <h3 style={{ color: '#00482D', marginBottom: '25px', fontWeight: '600', textAlign: 'center' }}>
                <i className="fas fa-chart-line me-2" style={{ color: '#FFD326' }}></i>
                The RDES Continuum
              </h3>
              <Row className="text-center">
                <Col md={3} className="mb-3">
                  <div style={{ padding: '20px' }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      backgroundColor: '#00482D',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 15px auto'
                    }}>
                      <i className="fas fa-flask" style={{ color: '#FFD326', fontSize: '1.5rem' }}></i>
                    </div>
                    <h5 style={{ fontWeight: '600', color: '#00482D' }}>Research</h5>
                    <p style={{ fontSize: '0.9rem', color: '#666' }}>Discovery & Innovation</p>
                  </div>
                </Col>
                <Col md={3} className="mb-3">
                  <div style={{ padding: '20px' }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      backgroundColor: '#00482D',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 15px auto'
                    }}>
                      <i className="fas fa-chart-bar" style={{ color: '#FFD326', fontSize: '1.5rem' }}></i>
                    </div>
                    <h5 style={{ fontWeight: '600', color: '#00482D' }}>Development</h5>
                    <p style={{ fontSize: '0.9rem', color: '#666' }}>Application & Testing</p>
                  </div>
                </Col>
                <Col md={3} className="mb-3">
                  <div style={{ padding: '20px' }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      backgroundColor: '#00482D',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 15px auto'
                    }}>
                      <i className="fas fa-hand-holding-heart" style={{ color: '#FFD326', fontSize: '1.5rem' }}></i>
                    </div>
                    <h5 style={{ fontWeight: '600', color: '#00482D' }}>Extension</h5>
                    <p style={{ fontSize: '0.9rem', color: '#666' }}>Delivery & Adoption</p>
                  </div>
                </Col>
                <Col md={3} className="mb-3">
                  <div style={{ padding: '20px' }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      backgroundColor: '#00482D',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 15px auto'
                    }}>
                      <i className="fas fa-headset" style={{ color: '#FFD326', fontSize: '1.5rem' }}></i>
                    </div>
                    <h5 style={{ fontWeight: '600', color: '#00482D' }}>Services</h5>
                    <p style={{ fontSize: '0.9rem', color: '#666' }}>Support & Sustainability</p>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        {/* Call to Action */}
        <Row className="mt-5">
          <Col>
            <div style={{
              backgroundColor: '#FFD326',
              borderRadius: '15px',
              padding: '40px',
              textAlign: 'center',
              color: '#00482D'
            }}>
              <i className="fas fa-file-alt" style={{ fontSize: '3rem', marginBottom: '15px', display: 'block' }}></i>
              <h3 style={{ marginBottom: '15px', fontWeight: '600' }}>Propose a Project or Collaboration</h3>
              <p style={{ marginBottom: '20px', fontSize: '1.1rem' }}>
                We welcome research proposals, extension project ideas, and partnership opportunities that align with our RDES framework.
              </p>
              <Link to="/contact" style={{
                backgroundColor: '#00482D',
                color: '#FFD326',
                padding: '12px 30px',
                borderRadius: '30px',
                textDecoration: 'none',
                fontWeight: '600',
                display: 'inline-block',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#ffffff';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#00482D';
                e.target.style.transform = 'scale(1)';
              }}>
                Submit Your Proposal
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RdesPage;