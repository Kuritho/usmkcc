import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Contact = () => {
  // USM-KCC color scheme
  const usmGreen = '#02570B';
  const usmLightGreen = '#1e5631';
  const usmYellow = '#ffcc00';
  const usmWhite = '#ffffff';

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5" style={{ color: usmGreen }}>Contact Us</h1>
      
      <Row className="mb-5 g-4">
        {/* Location Column */}
        <Col md={6}>
          <Card className="h-100 shadow-sm" style={{ borderColor: usmGreen }}>
            <Card.Header 
              style={{ 
                backgroundColor: usmGreen,
                color: usmWhite,
                fontWeight: '600'
              }}
            >
              Our Location
            </Card.Header>
            <Card.Body>
              <Card.Text style={{ color: usmLightGreen }}>
                <strong>University of Southern Mindanao - Kidapawan City Campus</strong><br />
                Brgy. Sudapin, Kidapawan City<br />
                North Cotabato, Philippines<br />
                9400
              </Card.Text>
              
              <div className="map-container mb-3" style={{ borderRadius: '8px', overflow: 'hidden' }}>
                <iframe 
                  title="USM Kidapawan City Campus Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.234154238882!2d125.1116374!3d7.0310811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f8fbe262aa19df%3A0xee190ceb902c6128!2sUniversity%20of%20Southern%20Mindanao%20-%20Kidapawan%20City%20Campus!5e0!3m2!1sen!2sph!4v1620000000000!5m2!1sen!2sph"
                  width="100%" 
                  height="300" 
                  style={{ border: '3px solid ' + usmGreen }} 
                  allowFullScreen="" 
                  loading="lazy"
                ></iframe>
              </div>

              <Button 
                variant="outline-primary" 
                href="https://maps.google.com/maps?ll=7.031081,125.113812&z=15&t=m&hl=en&gl=PH&mapclient=embed&cid=17657636246790107742"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  borderColor: usmGreen,
                  color: usmGreen,
                  fontWeight: '600'
                }}
              >
                Open in Google Maps
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Contact Information Column */}
        <Col md={6}>
          <Card className="h-100 shadow-sm" style={{ borderColor: usmYellow }}>
            <Card.Header 
              style={{ 
                backgroundColor: usmYellow,
                color: '#000',
                fontWeight: '600'
              }}
            >
              Contact Information
            </Card.Header>
            <Card.Body>
              <Card.Text style={{ color: usmLightGreen }}>
                <strong>Office of the Registrar:</strong><br />
                <FaPhone className="me-2" style={{ color: usmGreen }} /> +63 64 288 3300<br />
                <FaEnvelope className="me-2" style={{ color: usmGreen }} /> registrar@usmkcc.edu.ph<br /><br />
                
                <strong>Office of Student Affairs:</strong><br />
                <FaPhone className="me-2" style={{ color: usmGreen }} /> +63 64 288 3301<br />
                <FaEnvelope className="me-2" style={{ color: usmGreen }} /> osa@usmkcc.edu.ph<br /><br />
                
                <strong>Information and communications Technology Office:</strong><br />
                <FaPhone className="me-2" style={{ color: usmGreen }} /> +63 64 288 3302<br />
                <FaEnvelope className="me-2" style={{ color: usmGreen }} /> kcc_ictc@usm.edu.ph<br /><br />
                
                <strong>General Inquiries:</strong><br />
                <FaPhone className="me-2" style={{ color: usmGreen }} /> +63 64 288 3303<br />
                <FaEnvelope className="me-2" style={{ color: usmGreen }} /> usmkcc2019@gmail.com
              </Card.Text>
              
              <div className="social-icons mt-4">
                <a href="https://www.facebook.com/USMKCCofficial" className="me-3" target="_blank" rel="noopener noreferrer">
                  <FaFacebook className="fa-2x" style={{ color: usmGreen }} />
                </a>
                <a href="https://twitter.com/usmkc" className="me-3" target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="fa-2x" style={{ color: usmGreen }} />
                </a>
                <a href="https://instagram.com/usmkc" className="me-3" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="fa-2x" style={{ color: usmGreen }} />
                </a>
                <a href="https://youtube.com/usmkc" target="_blank" rel="noopener noreferrer">
                  <FaYoutube className="fa-2x" style={{ color: usmGreen }} />
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;