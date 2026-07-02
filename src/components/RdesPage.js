import React, { useState } from 'react';
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RdesPage = () => {
  const [lightboxImage, setLightboxImage] = useState(null);

  // Core areas images
  const coreImages = [
    '/images/rges/rges1.jpg',
    '/images/rges/rges2.jpg',
    '/images/rges/rges3.jpg',
    '/images/rges/rges4.jpg'
  ];

  const handleImageClick = (src) => {
    setLightboxImage(src);
  };

  const handleClose = () => {
    setLightboxImage(null);
  };

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
                Resource Generation and Entrepreneurial Services Office
              </h1>
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
                 The Resource Generation and Entrepreneurial Services Office effectively generates income to enhance the Campus's financial resources. It is primarily responsible for initiating, operating, and managing income-generating projects; providing quality and affordable products and services to its constituents; and creating opportunities for faculty members and staff to earn additional income.
                </p>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#333', marginTop: '15px', textAlign: 'justify' }}>
                  The Office supervises and monitors the implementation and operations of various non-farm and farm-based projects, ensuring their sustainability and alignment with institutional objectives. The income generated from these projects shall form part of a special trust or revolving fund mechanism, wherein all related expenditures are subject to existing government accounting and auditing rules and regulations.
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

        {/* Our Core Areas - Pictures Only (Clickable) */}
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
          {coreImages.map((src, index) => (
            <Col md={6} key={index}>
              <div 
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                  height: '100%'
                }}
                onClick={() => handleImageClick(src)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                }}
              >
                <img
                  src={src}
                  alt={`Core area ${index + 1}`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderBottom: '3px solid #FFD326'
                  }}
                />
                {/* Optional overlay hint */}
                <div style={{
                  padding: '10px',
                  textAlign: 'center',
                  backgroundColor: '#f8f9fa',
                  fontSize: '0.85rem',
                  color: '#00482D',
                  fontWeight: '500'
                }}>
                  <i className="fas fa-search-plus me-1"></i> Click to enlarge
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* Lightbox Modal */}
        <Modal
          show={lightboxImage !== null}
          onHide={handleClose}
          size="lg"
          centered
          style={{ zIndex: 9999 }}
        >
          <Modal.Body style={{ 
            padding: 0, 
            backgroundColor: 'transparent',
            border: 'none',
            position: 'relative'
          }}>
            <div style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '60vh'
            }}>
              <img
                src={lightboxImage || ''}
                alt="Enlarged view"
                style={{
                  maxWidth: '100%',
                  maxHeight: '85vh',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
                }}
              />
              {/* Close button */}
              <button
                onClick={handleClose}
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '20px',
                  background: 'rgba(0,0,0,0.6)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  zIndex: 10
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0,0,0,0.8)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0,0,0,0.6)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </Modal.Body>
        </Modal>

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
                The RGES Continuum
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
                We welcome research proposals, extension project ideas, and partnership opportunities that align with our RGES framework.
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