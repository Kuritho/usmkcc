import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button, Dropdown, Collapse, Modal, Form, InputGroup } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const fallbackLogo = `data:image/svg+xml;base64,${btoa(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#00482D" />
        <stop offset="100%" stop-color="#00482D" />
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="3" dy="3" stdDeviation="3" flood-color="#00000080" />
      </filter>
    </defs>
    <circle cx="50" cy="50" r="48" fill="url(#gradient)" filter="url(#shadow)" stroke="#FFD326" stroke-width="2"/>
    <text x="50" y="58" font-family="Arial" font-size="24" fill="#FFD326" 
          text-anchor="middle" font-weight="bold" filter="url(#shadow)">USM</text>
  </svg>
`)}`;

const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [showMobileContact, setShowMobileContact] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuthenticated');
    if (adminAuth === 'true') {
      setIsAdminLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 50 || document.documentElement.scrollTop > 50);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    handleResize();
    handleScroll();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActiveLink = (path) => location.pathname === path;

  const toggleMobileContact = () => setShowMobileContact(!showMobileContact);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      setShowSearchModal(false);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    if (loginCredentials.username === 'usmadmin' && loginCredentials.password === 'USM@2024admin') {
      setIsAdminLoggedIn(true);
      setShowAdminLoginModal(false);
      localStorage.setItem('adminAuthenticated', 'true');
      navigate('/admin');
    } else {
      setLoginError('Invalid username or password. Please use USM KCC credentials.');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('adminAuthenticated');
    if (location.pathname === '/admin') navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginCredentials(prev => ({ ...prev, [name]: value }));
  };

  // Fixed logo size (base size)
  const LOGO_SIZE = 55; // pixels, same as original

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 1030 }}>
      {/* Top Contact Bar - Desktop */}
      <div style={{
        backgroundColor: isScrolled ? 'transparent' : '#1a3d7c',
        color: '#ffffff',
        padding: '8px 0',
        fontSize: '0.85rem',
        borderBottom: isScrolled ? 'none' : '1px solid rgba(255, 211, 38, 0.3)',
        display: isMobile ? 'none' : 'block',
        transition: 'all 0.3s ease',
        textShadow: isScrolled ? '0 1px 3px rgba(0,0,0,0.6)' : 'none',
        backdropFilter: isScrolled ? 'blur(8px)' : 'none'
      }}>
        <Container fluid style={{ 
          maxWidth: '1400px', 
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fas fa-phone-alt" style={{ color: '#FFD326', fontSize: '0.9rem' }}></i>
              <span>(064) 572 2138</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fas fa-envelope" style={{ color: '#FFD326', fontSize: '0.9rem' }}></i>
              <span>usmkcc_info@usm.edu.ph</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fas fa-map-marker-alt" style={{ color: '#FFD326', fontSize: '0.9rem' }}></i>
              <span>Kidapawan City, Philippines</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <a href="/donate" style={{ 
              color: '#FFD326', 
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontWeight: '500',
              transition: 'all 0.2s'
            }} onMouseEnter={(e) => e.target.style.color = '#9e8888'} 
               onMouseLeave={(e) => e.target.style.color = '#FFD326'}>
              <i className="fas fa-hand-holding-heart"></i>
              Donate
            </a>
            <div style={{ height: '16px', width: '1px', backgroundColor: 'rgba(255,255,255,0.3)' }}></div>
            <a href="/sdg-hub" style={{ 
              color: '#ffffff', 
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontWeight: '500',
              transition: 'all 0.2s'
            }} onMouseEnter={(e) => e.target.style.color = '#FFD326'} 
               onMouseLeave={(e) => e.target.style.color = '#ffffff'}>
              <i className="fas fa-globe-americas"></i>
              SDG Hub
            </a>
            <div style={{ height: '16px', width: '1px', backgroundColor: 'rgba(255,255,255,0.3)' }}></div>
            <Link to="/contact" style={{ 
              color: '#ffffff', 
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontWeight: '500',
              transition: 'all 0.2s',
              fontSize: '0.85rem'
            }} onMouseEnter={(e) => e.target.style.color = '#FFD326'} 
               onMouseLeave={(e) => e.target.style.color = '#ffffff'}>
              <i className="fa fa-exclamation-circle"></i>
              Contact
            </Link>
            
            <div style={{ height: '16px', width: '1px', backgroundColor: 'rgba(255,255,255,0.3)' }}></div>
            {isAdminLoggedIn ? (
              <Button
                variant="link"
                onClick={handleAdminLogout}
                style={{
                  color: '#FFD326',
                  textDecoration: 'none',
                  padding: 0,
                  border: 'none',
                  background: 'none',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                onMouseLeave={(e) => e.target.style.color = '#FFD326'}
              >
                <i className="fas fa-sign-out-alt"></i>
                Admin Logout
              </Button>
            ) : (
              <Button
                variant="link"
                onClick={() => setShowAdminLoginModal(true)}
                style={{
                  color: '#FFD326',
                  textDecoration: 'none',
                  padding: 0,
                  border: 'none',
                  background: 'none',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                onMouseLeave={(e) => e.target.style.color = '#FFD326'}
              >
                <i className="fas fa-lock"></i>
                {/* Admin Login */}
              </Button>
            )}
          </div>
        </Container>
      </div>

      {/* Mobile Contact Bar */}
      {isMobile && (
        <div style={{
          backgroundColor: isScrolled ? 'transparent' : '#1a3d7c',
          color: '#ffffff',
          padding: '8px 0',
          borderBottom: isScrolled ? 'none' : '1px solid rgba(255, 211, 38, 0.3)',
          transition: 'all 0.3s ease',
          textShadow: isScrolled ? '0 1px 3px rgba(0,0,0,0.6)' : 'none',
          backdropFilter: isScrolled ? 'blur(8px)' : 'none'
        }}>
          <Container fluid style={{ padding: '0 15px' }}>
            <div 
              onClick={toggleMobileContact}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                padding: '5px 10px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fas fa-info-circle" style={{ color: '#FFD326' }}></i>
                <span>Contact Information</span>
              </div>
              <i className={`fas ${showMobileContact ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ color: '#FFD326' }}></i>
            </div>
            
            <Collapse in={showMobileContact}>
              <div>
                <div style={{ 
                  padding: '10px 15px', 
                  borderTop: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <i className="fas fa-phone-alt" style={{ color: '#FFD326', minWidth: '16px' }}></i>
                    <span>(064) 572 2138</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <i className="fas fa-envelope" style={{ color: '#FFD326', minWidth: '16px' }}></i>
                    <span>usmkcc_info@usm.edu.ph</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <i className="fas fa-map-marker-alt" style={{ color: '#FFD326', minWidth: '16px' }}></i>
                    <span>Kidapawan City, Philippines</span>
                  </div>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-around',
                  padding: '10px 15px',
                  borderTop: '1px solid rgba(255,255,255,0.2)'
                }}>
                  <a href="/donate" style={{ 
                    color: '#FFD326', 
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontWeight: '500',
                    fontSize: '0.9rem'
                  }}>
                    <i className="fas fa-hand-holding-heart"></i>
                    Donate
                  </a>
                  <a href="/sdg-hub" style={{ 
                    color: '#ffffff', 
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontWeight: '500',
                    fontSize: '0.9rem'
                  }}>
                    <i className="fas fa-globe-americas"></i>
                    SDG Hub
                  </a>
                  <Link to="/contact" style={{ 
                    color: '#ffffff', 
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontWeight: '500',
                    fontSize: '0.9rem'
                  }}>
                    <i className="fas fa-exclamation-circle"></i>
                    Contact
                  </Link>
                  {isAdminLoggedIn ? (
                    <Button
                      variant="link"
                      onClick={handleAdminLogout}
                      style={{
                        color: '#FFD326',
                        textDecoration: 'none',
                        padding: 0,
                        border: 'none',
                        background: 'none',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <i className="fas fa-sign-out-alt"></i>
                      Logout
                    </Button>
                  ) : (
                    <Button
                      variant="link"
                      onClick={() => setShowAdminLoginModal(true)}
                      style={{
                        color: '#FFD326',
                        textDecoration: 'none',
                        padding: 0,
                        border: 'none',
                        background: 'none',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <i className="fas fa-lock"></i>
                      Admin
                    </Button>
                  )}
                </div>
              </div>
            </Collapse>
          </Container>
        </div>
      )}

      {/* Main Header */}
      <Navbar 
        expand="lg" 
        expanded={expanded}
        onToggle={(isOpen) => setExpanded(isOpen)}
        style={{
          backgroundColor: isScrolled ? 'transparent' : '#00482D',
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
          boxShadow: isScrolled ? '0 2px 10px rgba(0,0,0,0.1)' : '0 4px 12px rgba(0,0,0,0.15)',
          borderBottom: isScrolled ? 'none' : '2px solid #FFD326',
          padding: isMobile ? '5px 0' : '0',
          transition: 'all 0.3s ease'
        }}
      >
        <Container fluid style={{ 
          maxWidth: '1400px', 
          padding: '0 20px',
          margin: '0 auto'
        }}>
          <Navbar.Brand 
            as={Link} 
            to="/" 
            className="d-flex align-items-center py-3" 
            style={{ 
              textDecoration: 'none',
              marginRight: isMobile ? '0' : '40px'
            }}
            onClick={() => setExpanded(false)}
          >
            {/* Logo Container - Hidden on mobile, fixed size on tablet/desktop */}
            {!isMobile && (
              <div style={{
                width: `${LOGO_SIZE}px`,
                height: `${LOGO_SIZE}px`,
                flexShrink: 0,
                marginRight: '15px',
                background: isScrolled ? 'transparent' : '#00482D',
                borderRadius: '50%',
                padding: '5px',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src="/images/usm-logo.png"
                  alt="University Logo"
                  style={{ 
                    width: '150%',
                    height: '150%',
                    objectFit: 'contain',
                    borderRadius: '50%',
                    transition: 'all 0.3s ease'
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = fallbackLogo;
                  }}
                />
              </div>
            )}
            
            <div style={{
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ 
                color: '#ffffff', 
                fontWeight: '700',
                fontSize: isMobile ? 'clamp(0.9rem, 4vw, 1.1rem)' : '1.1rem',
                lineHeight: '1.2',
                letterSpacing: '0.5px',
                whiteSpace: 'nowrap'
              }}>
                UNIVERSITY OF SOUTHERN MINDANAO
              </div>
              <div style={{ 
                color: '#FFD326', 
                fontSize: isMobile ? 'clamp(0.7rem, 3vw, 0.85rem)' : '0.95rem',
                fontWeight: '600',
                letterSpacing: '0.5px',
                marginTop: '3px',
                whiteSpace: 'nowrap'
              }}>
                KIDAPAWAN CITY CAMPUS
              </div>
            </div>
          </Navbar.Brand>

          <Navbar.Toggle 
            aria-controls="basic-navbar-nav" 
            style={{ 
              borderColor: '#FFD326',
              color: '#FFD326'
            }}
          >
            <span className="navbar-toggler-icon" style={{ color: '#FFD326' }}></span>
          </Navbar.Toggle>

          <Navbar.Collapse 
            id="basic-navbar-nav"
            style={{
              backgroundColor: isMobile && expanded && isScrolled ? 'rgba(0,72,45,0.95)' : 'transparent',
              backdropFilter: isMobile && expanded && isScrolled ? 'blur(12px)' : 'none',
              borderRadius: isMobile && expanded && isScrolled ? '12px' : '0',
              padding: isMobile && expanded && isScrolled ? '10px' : '0',
              transition: 'all 0.3s ease'
            }}
          >
            <Nav className={isMobile ? "w-100" : "ms-auto"} style={{ 
              gap: '0',
              alignItems: 'center',
              padding: '10px 0'
            }}>
              {/* Navigation links (with black text shadow added) */}
              <Nav.Link 
                as={Link} 
                to="/" 
                className="px-3 py-2 mx-1"
                onClick={() => setExpanded(false)}
                style={{
                  color: isActiveLink('/') ? '#FFD326' : '#ffffff',
                  fontWeight: isActiveLink('/') ? '600' : '500',
                  borderRadius: '6px',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  textAlign: isMobile ? 'center' : 'left',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.6)'
                }}
                onMouseEnter={(e) => {
                  if (!isActiveLink('/')) e.target.style.color = '#FFD326';
                }}
                onMouseLeave={(e) => {
                  if (!isActiveLink('/')) e.target.style.color = '#ffffff';
                }}
              >
                Home
                {isActiveLink('/') && (
                  <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '20px',
                    height: '3px',
                    backgroundColor: '#FFD326',
                    borderRadius: '2px'
                  }}></div>
                )}
              </Nav.Link>

              <Nav.Link 
                as={Link} 
                to="/about" 
                className="px-3 py-2 mx-1"
                onClick={() => setExpanded(false)}
                style={{
                  color: isActiveLink('/about') ? '#FFD326' : '#ffffff',
                  fontWeight: isActiveLink('/about') ? '600' : '500',
                  borderRadius: '6px',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  textAlign: isMobile ? 'center' : 'left',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.6)'
                }}
                onMouseEnter={(e) => {
                  if (!isActiveLink('/about')) e.target.style.color = '#FFD326';
                }}
                onMouseLeave={(e) => {
                  if (!isActiveLink('/about')) e.target.style.color = '#ffffff';
                }}
              >
                About
                {isActiveLink('/about') && (
                  <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '20px',
                    height: '3px',
                    backgroundColor: '#FFD326',
                    borderRadius: '2px'
                  }}></div>
                )}
              </Nav.Link>

              <Dropdown className="mx-1" align={isMobile ? "center" : "end"}>
                <Dropdown.Toggle 
                  variant="link" 
                  id="dropdown-administration"
                  style={{
                    color: (isActiveLink('/offices') || isActiveLink('/keyofficials') || isActiveLink('/organizations')) ? '#FFD326' : '#ffffff',
                    fontWeight: (isActiveLink('/offices') || isActiveLink('/keyofficials') || isActiveLink('/organizations')) ? '600' : '500',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    transition: 'all 0.2s ease',
                    textAlign: isMobile ? 'center' : 'left',
                    display: 'block',
                    width: isMobile ? '100%' : 'auto',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.6)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActiveLink('/offices') && !isActiveLink('/keyofficials') && !isActiveLink('/organizations')) {
                      e.target.style.color = '#FFD326';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActiveLink('/offices') && !isActiveLink('/keyofficials') && !isActiveLink('/organizations')) {
                      e.target.style.color = '#ffffff';
                    }
                  }}
                >
                  Administration
                </Dropdown.Toggle>

                <Dropdown.Menu style={{
                  backgroundColor: isScrolled ? 'rgba(0, 72, 45, 0.95)' : '#00482D',
                  border: '1px solid #FFD326',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  marginTop: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  textAlign: isMobile ? 'center' : 'left',
                  transition: 'all 0.3s ease'
                }}>
                  <Dropdown.Item 
                    as={Link} 
                    to="/keyofficials" 
                    onClick={() => setExpanded(false)}
                    style={{
                      color: isActiveLink('/keyofficials') ? '#FFD326' : '#ffffff',
                      fontWeight: isActiveLink('/keyofficials') ? '600' : '400',
                      padding: '10px 16px',
                      backgroundColor: 'transparent',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgba(255, 211, 38, 0.1)';
                      e.target.style.color = '#FFD326';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = isActiveLink('/keyofficials') ? '#FFD326' : '#ffffff';
                    }}
                  >
                    <i className="fas fa-users me-2"></i>
                    Key Officials
                  </Dropdown.Item>
                  <Dropdown.Item 
                    as={Link} 
                    to="/offices" 
                    onClick={() => setExpanded(false)}
                    style={{
                      color: isActiveLink('/offices') ? '#FFD326' : '#ffffff',
                      fontWeight: isActiveLink('/offices') ? '600' : '400',
                      padding: '10px 16px',
                      backgroundColor: 'transparent',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgba(255, 211, 38, 0.1)';
                      e.target.style.color = '#FFD326';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = isActiveLink('/offices') ? '#FFD326' : '#ffffff';
                    }}
                  >
                    <i className="fas fa-building me-2"></i>
                    Offices
                  </Dropdown.Item>
                  {/* NEW: Organizations dropdown item */}
                  <Dropdown.Item 
                    as={Link} 
                    to="/organizations" 
                    onClick={() => setExpanded(false)}
                    style={{
                      color: isActiveLink('/organizations') ? '#FFD326' : '#ffffff',
                      fontWeight: isActiveLink('/organizations') ? '600' : '400',
                      padding: '10px 16px',
                      backgroundColor: 'transparent',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgba(255, 211, 38, 0.1)';
                      e.target.style.color = '#FFD326';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = isActiveLink('/organizations') ? '#FFD326' : '#ffffff';
                    }}
                  >
                    <i className="fas fa-users-cog me-2"></i>
                    Organizations
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Nav.Link 
                as={Link} 
                to="/academics" 
                className="px-3 py-2 mx-1"
                onClick={() => setExpanded(false)}
                style={{
                  color: isActiveLink('/academics') ? '#FFD326' : '#ffffff',
                  fontWeight: isActiveLink('/academics') ? '600' : '500',
                  borderRadius: '6px',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  textAlign: isMobile ? 'center' : 'left',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.6)'
                }}
                onMouseEnter={(e) => {
                  if (!isActiveLink('/academics')) e.target.style.color = '#FFD326';
                }}
                onMouseLeave={(e) => {
                  if (!isActiveLink('/academics')) e.target.style.color = '#ffffff';
                }}
              >
                Academics
                {isActiveLink('/academics') && (
                  <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '20px',
                    height: '3px',
                    backgroundColor: '#FFD326',
                    borderRadius: '2px'
                  }}></div>
                )}
              </Nav.Link>

              <Nav.Link 
                as={Link} 
                to="/research-extension" 
                className="px-3 py-2 mx-1"
                onClick={() => setExpanded(false)}
                style={{
                  color: isActiveLink('/research-extension') ? '#FFD326' : '#ffffff',
                  fontWeight: isActiveLink('/research-extension') ? '600' : '500',
                  borderRadius: '6px',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  textAlign: isMobile ? 'center' : 'left',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.6)'
                }}
                onMouseEnter={(e) => {
                  if (!isActiveLink('/research-extension')) e.target.style.color = '#FFD326';
                }}
                onMouseLeave={(e) => {
                  if (!isActiveLink('/research-extension')) e.target.style.color = '#ffffff';
                }}
              >
                RESO
                {isActiveLink('/research-extension') && (
                  <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '20px',
                    height: '3px',
                    backgroundColor: '#FFD326',
                    borderRadius: '2px'
                  }}></div>
                )}
              </Nav.Link>

              <Nav.Link 
                as={Link} 
                to="/rdes" 
                className="px-3 py-2 mx-1"
                onClick={() => setExpanded(false)}
                style={{
                  color: isActiveLink('/rdes') ? '#FFD326' : '#ffffff',
                  fontWeight: isActiveLink('/rdes') ? '600' : '500',
                  borderRadius: '6px',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  textAlign: isMobile ? 'center' : 'left',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.6)'
                }}
                onMouseEnter={(e) => {
                  if (!isActiveLink('/rdes')) e.target.style.color = '#FFD326';
                }}
                onMouseLeave={(e) => {
                  if (!isActiveLink('/rdes')) e.target.style.color = '#ffffff';
                }}
              >
                RGES
                {isActiveLink('/rdes') && (
                  <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '20px',
                    height: '3px',
                    backgroundColor: '#FFD326',
                    borderRadius: '2px'
                  }}></div>
                )}
              </Nav.Link>

              <Dropdown className="mx-1" align={isMobile ? "center" : "end"}>
                <Dropdown.Toggle 
                  variant="link" 
                  id="dropdown-student"
                  style={{
                    color: (isActiveLink('/admission') || isActiveLink('/scholarship')) ? '#FFD326' : '#ffffff',
                    fontWeight: (isActiveLink('/admission') || isActiveLink('/scholarship')) ? '600' : '500',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    transition: 'all 0.2s ease',
                    textAlign: isMobile ? 'center' : 'left',
                    display: 'block',
                    width: isMobile ? '100%' : 'auto',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.6)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActiveLink('/admission') && !isActiveLink('/scholarship')) {
                      e.target.style.color = '#FFD326';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActiveLink('/admission') && !isActiveLink('/scholarship')) {
                      e.target.style.color = '#ffffff';
                    }
                  }}
                >
                  Student
                </Dropdown.Toggle>

                <Dropdown.Menu style={{
                  backgroundColor: isScrolled ? 'rgba(0, 72, 45, 0.95)' : '#00482D',
                  border: '1px solid #FFD326',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  marginTop: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  textAlign: isMobile ? 'center' : 'left',
                  transition: 'all 0.3s ease'
                }}>
                  <Dropdown.Item 
                    as={Link} 
                    to="https://www.usm.edu.ph/student/usmcee/" 
                    onClick={() => setExpanded(false)}
                    style={{
                      color: isActiveLink('/usmcee') ? '#FFD326' : '#ffffff',
                      fontWeight: isActiveLink('/usmcee') ? '600' : '400',
                      padding: '10px 16px',
                      backgroundColor: 'transparent',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgba(255, 211, 38, 0.1)';
                      e.target.style.color = '#FFD326';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = isActiveLink('/usmcee') ? '#FFD326' : '#ffffff';
                    }}
                  >
                    <i className="fas fa-file-invoice me-2"></i>
                    USMCEE
                  </Dropdown.Item>
                 <Dropdown.Item 
  as="a"
  href="https://www.usm.edu.ph/student/admission/"
  target="_blank"
  rel="noopener noreferrer"
  onClick={() => setExpanded(false)}
  style={{
    color: '#ffffff',
    fontWeight: '400',
    padding: '10px 16px',
    backgroundColor: 'transparent',
    transition: 'all 0.2s'
  }}
  onMouseEnter={(e) => {
    e.target.style.backgroundColor = 'rgba(255, 211, 38, 0.1)';
    e.target.style.color = '#FFD326';
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = 'transparent';
    e.target.style.color = '#ffffff';
  }}
>
  <i className="fas fa-user-graduate me-2"></i>
  Admission
</Dropdown.Item>
                  <Dropdown.Item 
  as="a"
  href="https://www.usm.edu.ph/student/scholarships/"
  target="_blank"
  rel="noopener noreferrer"
  onClick={() => setExpanded(false)}
  style={{
    color: '#ffffff',
    fontWeight: '400',
    padding: '10px 16px',
    backgroundColor: 'transparent',
    transition: 'all 0.2s'
  }}
  onMouseEnter={(e) => {
    e.target.style.backgroundColor = 'rgba(255, 211, 38, 0.1)';
    e.target.style.color = '#FFD326';
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = 'transparent';
    e.target.style.color = '#ffffff';
  }}
>
  <i className="fas fa-award me-2"></i>
  Scholarship
</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Nav.Link 
                as={Link} 
                to="/alumni" 
                className="px-3 py-2 mx-1"
                onClick={() => setExpanded(false)}
                style={{
                  color: isActiveLink('/alumni') ? '#FFD326' : '#ffffff',
                  fontWeight: isActiveLink('/alumni') ? '600' : '500',
                  borderRadius: '6px',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  textAlign: isMobile ? 'center' : 'left',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.6)'
                }}
                onMouseEnter={(e) => {
                  if (!isActiveLink('/alumni')) e.target.style.color = '#FFD326';
                }}
                onMouseLeave={(e) => {
                  if (!isActiveLink('/alumni')) e.target.style.color = '#ffffff';
                }}
              >
                Alumni
                {isActiveLink('/alumni') && (
                  <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '20px',
                    height: '3px',
                    backgroundColor: '#FFD326',
                    borderRadius: '2px'
                  }}></div>
                )}
              </Nav.Link>

              <Button 
                variant="link"
                onClick={() => setShowSearchModal(true)}
                className={isMobile ? "mt-2 w-100" : "mx-2"}
                style={{
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  padding: '0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                  textAlign: 'center',
                  textDecoration: 'none',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 211, 38, 0.1)';
                  e.target.style.color = '#FFD326';
                  e.target.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#ffffff';
                  e.target.style.transform = 'scale(1)';
                }}
                title="Search website"
              >
                <i className="fas fa-search"></i>
                {isMobile && <span className="ms-2">Search</span>}
              </Button>

              <Button 
                as="a"
                href="https://studentportal.usm.edu.ph/"
                target="_blank"
                rel="noopener noreferrer"
                variant="outline-light"
                size="sm"
                className={isMobile ? "mt-2 w-100" : "ms-2"}
                style={{
                  borderColor: '#FFD326',
                  color: '#FFD326',
                  fontWeight: '600',
                  borderRadius: '6px',
                  padding: isMobile ? '6px 12px' : '5px 10px',
                  transition: 'all 0.2s',
                  textAlign: 'center',
                  fontSize: isMobile ? '0.9rem' : '0.8rem',
                  lineHeight: '1.2',
                  textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.4)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#FFD326';
                  e.target.style.color = '#00482D';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#FFD326';
                }}
              >
                <i className="fas fa-user-graduate me-1"></i>
                {isMobile ? 'Student Portal' : 'Portal'}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Admin Login Modal */}
      <Modal show={showAdminLoginModal} onHide={() => {
        setShowAdminLoginModal(false);
        setLoginError('');
        setLoginCredentials({ username: '', password: '' });
      }} centered size="md">
        <Modal.Header closeButton style={{ backgroundColor: '#00482D', color: '#ffffff', borderBottom: '2px solid #FFD326' }}>
          <Modal.Title>
            <i className="fas fa-lock me-2"></i>
            USM KCC Admin Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '1.5rem' }}>
          <Form onSubmit={handleAdminLogin}>
            <div className="mb-3 text-center">
              <i className="fas fa-user-shield" style={{ fontSize: '3rem', color: '#00482D' }}></i>
              <p className="mt-2 text-muted">Restricted to USM KCC administrators only</p>
            </div>
            
            {loginError && (
              <div className="alert alert-danger" role="alert" style={{ fontSize: '0.9rem' }}>
                <i className="fas fa-exclamation-triangle me-2"></i>
                {loginError}
              </div>
            )}

            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: '600', color: '#00482D' }}>
                <i className="fas fa-user me-2"></i>
                Username
              </Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={loginCredentials.username}
                onChange={handleInputChange}
                placeholder="Enter your USM KCC username"
                required
                style={{ 
                  border: '2px solid #00482D',
                  borderRadius: '6px',
                  padding: '0.75rem 1rem'
                }}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label style={{ fontWeight: '600', color: '#00482D' }}>
                <i className="fas fa-key me-2"></i>
                Password
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={loginCredentials.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
                style={{ 
                  border: '2px solid #00482D',
                  borderRadius: '6px',
                  padding: '0.75rem 1rem'
                }}
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button 
                variant="primary" 
                type="submit" 
                style={{ 
                  backgroundColor: '#00482D', 
                  color: '#FFD326', 
                  borderColor: '#00482D',
                  padding: '0.75rem',
                  fontWeight: '600'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#FFD326';
                  e.target.style.color = '#00482D';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#00482D';
                  e.target.style.color = '#FFD326';
                }}
              >
                <i className="fas fa-sign-in-alt me-2"></i>
                Login to Admin Panel
              </Button>
              <Button 
                variant="outline-secondary" 
                onClick={() => {
                  setShowAdminLoginModal(false);
                  setLoginError('');
                  setLoginCredentials({ username: '', password: '' });
                }}
                style={{ 
                  borderColor: '#6c757d',
                  color: '#6c757d'
                }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Search Modal */}
      <Modal show={showSearchModal} onHide={() => setShowSearchModal(false)} centered size="lg">
        <Modal.Header closeButton style={{ backgroundColor: '#00482D', color: '#ffffff', borderBottom: '2px solid #FFD326' }}>
          <Modal.Title>
            <i className="fas fa-search me-2"></i>
            Search USM Website
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '1.5rem' }}>
          <Form onSubmit={handleSearch}>
            <InputGroup size="lg">
              <Form.Control
                type="text"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={{ 
                  border: '2px solid #00482D',
                  borderRadius: '6px 0 0 6px',
                  padding: '0.75rem 1rem'
                }}
              />
              <Button 
                variant="primary" 
                type="submit" 
                style={{ 
                  backgroundColor: '#00482D', 
                  color: '#FFD326', 
                  borderColor: '#00482D',
                  borderRadius: '0 6px 6px 0',
                  padding: '0.75rem 1.5rem',
                  fontWeight: '600'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#FFD326';
                  e.target.style.color = '#00482D';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#00482D';
                  e.target.style.color = '#FFD326';
                }}
              >
                Search
              </Button>
            </InputGroup>
          </Form>
          <div className="mt-3">
            <small className="text-muted">
              <i className="fas fa-lightbulb me-1" style={{ color: '#FFD326' }}></i>
              Tip: Try searching for programs, admissions, news, or faculty
            </small>
          </div>
          
          <div className="mt-4">
            <h6 style={{ color: '#00482D', fontWeight: '600' }}>Popular Searches:</h6>
            <div className="d-flex flex-wrap gap-2 mt-2">
              {['Admission', 'Scholarships', 'Academic Calendar', 'Contact', 'Courses'].map((term, index) => (
                <Button
                  key={index}
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => setSearchQuery(term)}
                  style={{
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    padding: '0.25rem 0.75rem'
                  }}
                >
                  {term}
                </Button>
              ))}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Header;