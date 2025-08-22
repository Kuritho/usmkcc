import React, { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const fallbackLogo = `data:image/svg+xml;base64,${btoa(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1e5631" />
        <stop offset="100%" stop-color="#4c9a2a" />
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="3" dy="3" stdDeviation="3" flood-color="#00000080" />
      </filter>
    </defs>
    <circle cx="50" cy="50" r="48" fill="url(#gradient)" filter="url(#shadow)" stroke="#ffcc00" stroke-width="2"/>
    <text x="50" y="58" font-family="Arial" font-size="24" fill="#ffcc00" 
          text-anchor="middle" font-weight="bold" filter="url(#shadow)">USM</text>
  </svg>
`)}`;

const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
      {/* Top Contact Bar */}
      <div style={{
        backgroundColor: '#49694c',
        color: '#ffffff',
        padding: '5px 0',
        fontSize: '0.8rem',
        borderBottom: '1px solid #ffcc00'
      }}>
        <Container fluid style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 15px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div>Have any questions?</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <i className="fas fa-phone-alt" style={{ color: '#ffcc00' }}></i>
              (064) 572 2138
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <i className="fas fa-envelope" style={{ color: '#ffcc00' }}></i>
              op@usm.edu.ph
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <a href="/donate" style={{ color: '#ffffff', textDecoration: 'none' }}>
              Donate now
            </a>
            <span>|</span>
            <a href="/sdg" style={{ color: '#ffffff', textDecoration: 'none' }}>
              SGD
            </a>
            <span>|</span>
            <a href="mailto:op@usm.edu.ph" style={{ color: '#ffffff', textDecoration: 'none' }}>
              Email
            </a>
          </div>
        </Container>
      </div>

      {/* Main Header */}
      <Navbar 
        expand="lg" 
        className="usm-header"
        expanded={expanded}
        onToggle={(isOpen) => setExpanded(isOpen)}
        style={{
          backgroundColor: '#02570B',
          boxShadow: '0 6px 18px rgba(0, 0, 0, 0.25)',
          borderBottom: '3px solid #ffcc00',
          padding: '5px 0',
          margin: '0 0px',
          borderRadius: '2px',
          minHeight: '60px'
        }}
      >
        <Container fluid style={{ 
          maxWidth: '1200px', 
          padding: '0 10px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Brand/Logo Section */}
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center py-0" style={{ 
            textDecoration: 'none',
            minWidth: '200px',
            flexShrink: 0,
          }}>
            <div className="d-none d-md-block" style={{
              width: '50px',
              height: '50px',
              flexShrink: 0
            }}>
              <img 
                src="/images/usmkc-logo.png"
                alt="University Logo"
                style={{ 
                  width: '111%',
                  height: '111%',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '1px solid #1e5631',
                  float: 'left', // Add this
                  marginRight: '-90px', // Optional: Add some spacing to the right
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = fallbackLogo;
                }}
              />
            </div>
            
            <div style={{
              textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
              marginLeft: '10px',
              flexShrink: 0
            }}>
              <div style={{ 
                color: '#ffffff', 
                fontWeight: '700',
                fontSize: '0.85rem',
                lineHeight: '1.2',
                letterSpacing: '0.5px'
              }}>
                UNIVERSITY OF SOUTHERN MINDANAO
              </div>
              <div style={{ 
                color: '#ffcc00', 
                fontSize: '0.7rem',
                fontWeight: '600',
                letterSpacing: '1px',
                marginTop: '2px'
              }}>
                KIDAPAWAN CITY CAMPUS
              </div>
            </div>
          </Navbar.Brand>

          {/* Navigation Menu */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: '#ffcc00' }} />
          <Navbar.Collapse id="basic-navbar-nav" style={{ justifyContent: 'flex-end' }}>
            <Nav className="ml-auto" style={{ gap: '0' }}>
              <Button 
                as={Link} 
                to="/" 
                variant="link" 
                size="sm"
                className="mx-1 px-4 py-2" 
                onClick={() => setExpanded(false)}
                style={{
                  borderLeft: '1px solid rgba(255, 204, 0, 0.3)',
                  borderRight: '1px solid rgba(255, 204, 0, 0.3)',
                  color: '#ffffff',
                  fontWeight: '500',
                  borderRadius: '0',
                  transition: 'all 0.2s',
                  margin: '0 4px'  
                }}
                activeStyle={{
                  backgroundColor: 'rgba(255, 204, 0, 0.2)'
                }}
              >
                Home
              </Button>
              <Button 
                as={Link} 
                to="/about" 
                variant="link" 
                size="sm"
                className="mx-1 px-4 py-2"  
                onClick={() => setExpanded(false)}
                style={{
                  borderRight: '1px solid rgba(255, 204, 0, 0.3)',
                  color: '#ffffff',
                  fontWeight: '500',
                  borderRadius: '0',
                  transition: 'all 0.2s',
                  margin: '0 4px'  
                }}
                activeStyle={{
                  backgroundColor: 'rgba(255, 204, 0, 0.2)'
                }}
              >
                About
              </Button>
              <Button 
                as={Link} 
                to="/academics" 
                variant="link" 
                size="sm"
                className="mx-1 px-4 py-2"  
                onClick={() => setExpanded(false)}
                style={{
                  borderRight: '1px solid rgba(255, 204, 0, 0.3)',
                  color: '#ffffff',
                  fontWeight: '500',
                  borderRadius: '0',
                  transition: 'all 0.2s',
                  margin: '0 4px'  
                }}
                activeStyle={{
                  backgroundColor: 'rgba(255, 204, 0, 0.2)'
                }}
              >
                Academics
              </Button>
              <Button 
                as={Link} 
                to="/offices" 
                variant="link" 
                size="sm"
                className="mx-1 px-4 py-2"  
                onClick={() => setExpanded(false)}
                style={{
                  borderRight: '1px solid rgba(255, 204, 0, 0.3)',
                  color: '#ffffff',
                  fontWeight: '500',
                  borderRadius: '0',
                  transition: 'all 0.2s',
                  margin: '0 4px'  
                }}
                activeStyle={{
                  backgroundColor: 'rgba(255, 204, 0, 0.2)'
                }}
              >
                Offices
              </Button>
              <Button 
                as={Link} 
                to="/alumni" 
                variant="link" 
                size="sm"
                className="mx-1 px-4 py-2"  
                onClick={() => setExpanded(false)}
                style={{
                  borderRight: '1px solid rgba(255, 204, 0, 0.3)',
                  color: '#ffffff',
                  fontWeight: '500',
                  borderRadius: '0',
                  transition: 'all 0.2s',
                  margin: '0 4px'  
                }}
                activeStyle={{
                  backgroundColor: 'rgba(255, 204, 0, 0.2)'
                }}
              >
                Alumni
              </Button>
              
              {/* Student Dropdown */}
              <div 
                style={{ position: 'relative', margin: '0 4px' }}  
                onMouseEnter={() => setShowStudentDropdown(true)}
                onMouseLeave={() => setShowStudentDropdown(false)}
              >
                <Button 
                  as={Link} 
                  variant="link" 
                  size="sm"
                  className="mx-1 px-4 py-2"  
                  onClick={() => setExpanded(false)}
                  style={{
                    borderRight: '1px solid rgba(255, 204, 0, 0.3)',
                    color: '#ffffff',
                    fontWeight: '500',
                    borderRadius: '0',
                    transition: 'all 0.2s',
                  }}
                  activeStyle={{
                    backgroundColor: 'rgba(255, 204, 0, 0.2)'
                  }}
                >
                  Student
                </Button>
                
                {showStudentDropdown && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    backgroundColor: '#ffcc00',
                    border: '2px solid #02570B',
                    borderRadius: '4px',
                    width: '100%',
                    zIndex: 1000,
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    padding: '4px 0'
                  }}>
                    <Button 
                      as={Link} 
                      to="/admission" 
                      variant="link" 
                      size="sm"
                      className="mx-1 px-2 py-2"
                      onClick={() => {
                        setExpanded(false);
                        setShowStudentDropdown(false);
                      }}
                      style={{
                        color: '#02570B',
                        fontWeight: '600',
                        borderRadius: '0',
                        textAlign: 'left',
                        backgroundColor: 'transparent',
                        borderBottom: '1px solid rgba(2, 87, 11, 0.2)'
                      }}
                    >
                      Admission
                    </Button>
                    <Button 
                      as={Link} 
                      to="/scholarship" 
                      variant="link" 
                      size="sm"
                      className="mx-1 px-2 py-2"
                      onClick={() => {
                        setExpanded(false);
                        setShowStudentDropdown(false);
                      }}
                      style={{
                        color: '#02570B',
                        fontWeight: '600',
                        borderRadius: '0',
                        textAlign: 'left',
                        backgroundColor: 'transparent'
                      }}
                    >
                      Scholarship
                    </Button>
                  </div>
                )}
              </div>

              <Button 
                as={Link} 
                to="/contact" 
                variant="link" 
                size="sm"
                className="mx-1 px-4 py-2"  
                onClick={() => setExpanded(false)}
                style={{
                  borderRight: '1px solid rgba(255, 204, 0, 0.3)',
                  color: '#ffffff',
                  fontWeight: '500',
                  borderRadius: '0',
                  transition: 'all 0.2s',
                  margin: '0 4px' 
                }}
                activeStyle={{
                  backgroundColor: 'rgba(255, 204, 0, 0.2)'
                }}
              >
                Contact
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;