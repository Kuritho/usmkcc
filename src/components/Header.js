import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Enhanced fallback logo with perfect circle
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
  const navItems = [
    { path: "/", name: "HOME" },
    { path: "/about", name: "ABOUT" },
    { path: "/academics", name: "ACADEMICS" },
    { path: "/admission", name: "ADMISSION" },
    { path: "/contact", name: "CONTACT" },
    { path: "/offices", name: "OFFICES" }
  ];

  return (
    <Navbar 
      expand="lg" 
      sticky="top"
      className="usm-header"
      expanded={expanded}
      onToggle={(isOpen) => setExpanded(isOpen)}
      style={{
        backgroundColor: '#02570B',
        boxShadow: '0 6px 18px rgba(0, 0, 0, 0.25)',
        borderBottom: '3px solid #ffcc00',
        padding: '5px 0',
        margin: '30px 20px 0 20px',
        borderRadius: '2px'
      }}
    >
      <Container fluid style={{ 
        maxWidth: '1200px', 
        padding: '0 15px',
        margin: '0 auto' 
      }}>
        {/* Brand/Logo Section - Responsive */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center py-0" style={{ 
          textDecoration: 'none',
          transition: 'all 0.3s',
          marginRight: '1rem'
        }}>
          {/* Logo - Hidden on mobile */}
          <div className="d-none d-md-block" style={{
            // backgroundColor: '#02570B',
            // borderRadius: '50%',
            // width: 'clamp(50px, 8vw, 70px)',
            // height: 'clamp(50px, 8vw, 70px)',
            // minWidth: '50px',
            // minHeight: '50px',
            // display: 'flex',
            // alignItems: 'center',
            // justifyContent: 'center',
            // boxShadow: `
            //   0 4px 12px rgba(0, 0, 0, 0.4),
            //   inset 0 2px 4px rgba(255, 255, 255, 0.3),
            //   0 0 0 3px #1e5631
            // `,
            // marginRight: 'clamp(8px, 1.5vw, 15px)',
            // position: 'relative',
            // overflow: 'hidden'
          }}>
            {/* Inner glow effect */}
            {/* <div style={{
              position: 'absolute',
              top: '-10%',
              left: '-10%',
              width: '120%',
              height: '120%',
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), transparent 70%)',
              borderRadius: '50%'
            }}></div> */}
            
            <img 
              src="/images/usmkc-logo.png"
              alt="University of Southern Mindanao - Kidapawan City Campus Logo"
              style={{ 
                width: '120%',
                height: 'auto',
                maxWidth: '100px',
                maxHeight: '75px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #1e5631',
                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.3)',
                position: 'relative',
                left: '-30%',
                zIndex: '1'
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallbackLogo;
              }}
            />
          </div>
          
          {/* University Name - Always visible but different layout on mobile */}
          <div style={{
            textShadow: '1px 1px 3px rgba(0,0,0,0.5)'
          }}>
            <div style={{ 
              color: '#ffffff', 
              fontWeight: '700',
              fontSize: 'clamp(0.8rem, 1.8vw, 1.3rem)',
              lineHeight: '1.2',
              letterSpacing: '0.5px',
              whiteSpace: 'nowrap'
            }}>
              UNIVERSITY OF SOUTHERN MINDANAO
            </div>
            <div style={{ 
              color: '#ffcc00', 
              fontSize: 'clamp(0.6rem, 1.2vw, 1rem)',
              fontWeight: '600',
              letterSpacing: '1px',
              marginTop: '3px',
              whiteSpace: 'nowrap'
            }}>
              KIDAPAWAN CITY CAMPUS
            </div>
          </div>
        </Navbar.Brand>
        
        {/* Mobile Toggle Button */}
        <Navbar.Toggle 
          aria-controls="main-navbar" 
          onClick={() => setExpanded(!expanded)}
          style={{
            borderColor: 'rgba(255, 204, 0, 0.7)',
            padding: '0.4rem 0.6rem',
            backgroundColor: 'rgba(255, 204, 0, 0.1)',
            order: 3,
            marginLeft: 'auto',
            transition: 'all 0.3s',
          }}
        >
          <span className="navbar-toggler-icon" style={{
            backgroundImage: expanded 
              ? `url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 204, 0, 0.8)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 16h24M4 16h24M4 16h24'/%3E%3C/svg%3E")`
              : `url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 204, 0, 0.8)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E")`,
            width: '1.2em',
            height: '1.2em',
            transition: 'all 0.3s'
          }}></span>
        </Navbar.Toggle>
        
        {/* Navigation Links - Responsive Collapse */}
        <Navbar.Collapse id="main-navbar">
          {/* Desktop Navigation - horizontal */}
          <Nav className="ms-auto align-items-lg-center d-none d-lg-flex" style={{
            gap: '0.25rem',
            padding: '0.5rem 0',
            flexDirection: 'row'
          }}>
            {navItems.map((item, index) => (
              <Nav.Link 
                key={index}
                as={Link} 
                to={item.path}
                style={{
                  color: '#ffffff',
                  fontWeight: '600',
                  padding: 'clamp(0.5rem, 1vw, 0.75rem) clamp(0.8rem, 1.5vw, 1.25rem)',
                  borderRadius: '30px',
                  transition: 'all 0.3s',
                  position: 'relative',
                  textAlign: 'center',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                  letterSpacing: '0.5px',
                  margin: '0 2px',
                  textTransform: 'uppercase',
                  fontSize: 'clamp(0.7rem, 0.9vw, 0.9rem)',
                  whiteSpace: 'nowrap'
                }}
                className="nav-link-hover"
                activeStyle={{
                  backgroundColor: 'rgba(255, 204, 0, 0.2)',
                  color: '#ffcc00',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                }}
              >
                {item.name}
                <span style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '0',
                  height: '2px',
                  backgroundColor: '#ffcc00',
                  transition: 'width 0.3s',
                  borderRadius: '2px'
                }} className="nav-underline"></span>
              </Nav.Link>
            ))}
            
            {/* Vertical divider */}
            <div style={{
              height: '30px',
              width: '2px',
              backgroundColor: 'rgba(255, 204, 0, 0.3)',
              margin: '0 10px',
            }}></div>
          </Nav>
          
          {/* Mobile Navigation - vertical */}
          <Nav className="d-lg-none mt-2" style={{
            width: '100%',
            flexDirection: 'column'
          }}>
            {navItems.map((item, index) => (
              <Nav.Link 
                key={index}
                as={Link} 
                to={item.path}
                onClick={() => setExpanded(false)}
                style={{
                  color: '#ffffff',
                  fontWeight: '600',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '4px',
                  transition: 'all 0.3s',
                  textAlign: 'left',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                  letterSpacing: '0.5px',
                  margin: '2px 0',
                  textTransform: 'uppercase',
                  fontSize: '0.9rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderLeft: '3px solid rgba(255, 204, 0, 0.3)'
                }}
                className="nav-link-hover"
                activeStyle={{
                  backgroundColor: 'rgba(255, 204, 0, 0.2)',
                  color: '#ffcc00',
                  borderLeft: '3px solid #ffcc00'
                }}
              >
                {item.name}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;