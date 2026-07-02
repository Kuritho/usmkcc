import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  const quickLinks = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About USM-KCC" },
    { path: "/academics", name: "Academic Programs" },
    { path: "/admission", name: "Admission Requirements" },
    { path: "/contact", name: "Contact Us" },
    { path: "/offices", name: "Offices" }
  ];

  return (
    <footer className="footer" style={{
      backgroundColor: '#00482D',
      color: '#ffffff',
      padding: '40px 0',
      boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.3)',
      position: 'relative',
      zIndex: '1',
      borderTop: '3px solid #FFD326',
      width: '100%',
      margin: 0,
      borderRadius: 0
    }}>
      <Container fluid style={{ padding: '0 20px', maxWidth: '100%' }}>
        <Row>
          <Col md={3} className="mb-4 mb-md-0">
            <div style={{
              backgroundColor: '#00482D',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.2), -2px -2px 10px rgba(255, 255, 255, 0.1)',
              height: '100%',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <img 
                src="/images/usm-logo.png" 
                alt="USM-KCC Logo"
                style={{ 
                  height: '60px', 
                  marginBottom: '15px',
                  filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
                }}
              />
              <h5 style={{ color: '#FFD326', fontWeight: '600', textShadow: '1px 1px 2px rgba(0,0,0,0.3)', fontSize: '16px' }}>University of Southern Mindanao - Kidapawan City Campus</h5>
              <p style={{ marginBottom: '5px', color: '#e6e6e6', fontSize: '14px' }}>Brgy. Sudapin</p>
              <p style={{ marginBottom: '5px', color: '#e6e6e6', fontSize: '14px' }}>Kidapawan City, North Cotabato</p>
              <p style={{ marginBottom: '0', color: '#e6e6e6', fontSize: '14px' }}>Philippines</p>
            </div>
          </Col>
          
          <Col md={3} className="mb-4 mb-md-0">
            <div style={{
              backgroundColor: '#00482D',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.2), -2px -2px 10px rgba(255, 255, 255, 0.1)',
              height: '100%',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h5 style={{ 
                color: '#FFD326', 
                marginBottom: '15px', 
                fontWeight: '600',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                fontSize: '18px'
              }}>Our Mission</h5>
              <p style={{ 
                color: '#ffffff', 
                fontSize: '14px', 
                lineHeight: '1.6',
                fontStyle: 'italic'
              }}>
                Help accelerate socio-economic development, promote harmony among diverse communities and improve quality of life through instruction, research, extension and resource generation in Southern Philippines.
              </p>
            </div>
          </Col>
          
          <Col md={3} className="mb-4 mb-md-0">
            <div style={{
              backgroundColor: '#00482D',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.2), -2px -2px 10px rgba(255, 255, 255, 0.1)',
              height: '100%',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h5 style={{ 
                color: '#FFD326', 
                marginBottom: '15px', 
                fontWeight: '600',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                fontSize: '18px'
              }}>Our Vision</h5>
              <p style={{ 
                color: '#ffffff', 
                fontSize: '14px', 
                lineHeight: '1.6',
                fontStyle: 'italic'
              }}>
                Quality and relevant education for its clientele to be globally competitive, culture-sensitive and morally responsive human resources for sustainable development.
              </p>
            </div>
          </Col>
          
          <Col md={3}>
            <div style={{
              backgroundColor: '#00482D',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.2), -2px -2px 10px rgba(255, 255, 255, 0.1)',
              height: '100%',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h5 style={{ 
                color: '#FFD326', 
                marginBottom: '20px', 
                fontWeight: '600',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                fontSize: '18px'
              }}>Quick Links</h5>
              <ul className="list-unstyled" style={{ lineHeight: '2' }}>
                {quickLinks.map((item, index) => (
                  <li key={index}>
                    <Link 
                      to={item.path}
                      style={{
                        color: '#ffffff',
                        textDecoration: 'none',
                        display: 'inline-block',
                        position: 'relative',
                        paddingBottom: '2px',
                        fontWeight: '500',
                        transition: 'all 0.3s',
                        fontSize: '14px'
                      }}
                      className="footer-link"
                    >
                      {item.name}
                      <span style={{
                        position: 'absolute',
                        bottom: '0',
                        left: '0',
                        width: '100%',
                        height: '2px',
                        backgroundColor: '#FFD326',
                        transform: 'scaleX(0)',
                        transformOrigin: 'right',
                        transition: 'transform 0.3s ease-out'
                      }}></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
        
        <Row className="mt-4">
          <Col md={8} className="mb-4 mb-md-0">
            <div style={{
              backgroundColor: '#00482D',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.2), -2px -2px 10px rgba(255, 255, 255, 0.1)',
              height: '100%',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h5 style={{ 
                color: '#FFD326', 
                marginBottom: '20px', 
                fontWeight: '600',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                fontSize: '18px'
              }}>Connect With Us</h5>
              <div className="social-icons" style={{
                display: 'flex',
                gap: '15px',
                marginBottom: '20px'
              }}>
                {['facebook', 'twitter', 'instagram', 'youtube'].map((platform, index) => (
                  <a 
                    key={index}
                    href={`https://www.${platform}.com/USMKCCofficial`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: '#00482D',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFD326',
                      fontSize: '18px',
                      textDecoration: 'none',
                      boxShadow: '3px 3px 8px rgba(0, 0, 0, 0.3), -1px -1px 4px rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 211, 38, 0.3)',
                      transition: 'all 0.3s'
                    }}
                    className="social-icon"
                  >
                    <i className={`fab fa-${platform}`}></i>
                  </a>
                ))}
              </div>
              <p className="mt-3" style={{ marginBottom: '10px', color: '#ffffff', fontSize: '14px' }}>
                <i className="fas fa-envelope" style={{ color: '#FFD326', marginRight: '10px' }}></i>
                Email: usmkcc_info@usm.edu.ph
              </p>
              <p style={{ marginBottom: '0', color: '#ffffff', fontSize: '14px' }}>
                <i className="fas fa-phone" style={{ color: '#FFD326', marginRight: '10px' }}></i>
                Phone: +63 910 307 5650
              </p>
            </div>
          </Col>
          
          <Col md={4}>
            <div style={{
              backgroundColor: '#00482D',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.2), -2px -2px 10px rgba(255, 255, 255, 0.1)',
              height: '100%',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <h5 style={{ 
                color: '#FFD326', 
                marginBottom: '15px', 
                fontWeight: '600',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                fontSize: '18px'
              }}>Excellence in Education</h5>
              <p style={{ 
                color: '#ffffff', 
                fontSize: '14px', 
                marginBottom: '0',
                fontStyle: 'italic'
              }}>
                "Shaping minds, transforming communities"
              </p>
            </div>
          </Col>
        </Row>
        
        <Row className="mt-4">
          <Col className="text-center">
            <p style={{
              margin: '0',
              padding: '15px 0',
              backgroundColor: '#003320',
              borderRadius: '5px',
              boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.2)',
              color: '#FFD326',
              borderTop: '1px solid rgba(255, 211, 38, 0.3)',
              fontWeight: '500',
              fontSize: '14px'
            }}>
              &copy; {new Date().getFullYear()} University of Southern Mindanao - Kidapawan City Campus. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;