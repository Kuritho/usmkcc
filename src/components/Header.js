// src/components/Header.js - Updated with Admin Panel and RESO Panel Login + News Button
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button, Dropdown, Collapse, Modal, Form, InputGroup, ListGroup, Badge, Spinner } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { 
  getNews, 
  getEvents, 
  getAnnouncements, 
  getKeyOfficials,
  getOffices 
} from '../supabase/services';

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
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [adminUser, setAdminUser] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginType, setLoginType] = useState('admin'); // 'admin' or 'reso'
  
  // Search states
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [allContent, setAllContent] = useState({
    news: [],
    events: [],
    announcements: [],
    officials: [],
    offices: []
  });
  const [searchPerformed, setSearchPerformed] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = authService.isAuthenticated();
      setIsAdminLoggedIn(isAuth);
      if (isAuth) {
        setAdminUser(authService.getCurrentUser());
      }
    };
    
    checkAuth();
    loadAllContent();
  }, []);

  // Load all content for global search (excluding faculty)
  const loadAllContent = async () => {
    try {
      const [newsResult, eventsResult, announcementsResult, officialsResult, officesResult] = await Promise.all([
        getNews(),
        getEvents(),
        getAnnouncements(),
        getKeyOfficials(),
        getOffices()
      ]);

      setAllContent({
        news: newsResult.success ? newsResult.data : [],
        events: eventsResult.success ? eventsResult.data : [],
        announcements: announcementsResult.success ? announcementsResult.data : [],
        officials: officialsResult.success ? officialsResult.data : [],
        offices: officesResult.success ? officesResult.data : []
      });
    } catch (error) {
      console.error('Error loading content for search:', error);
    }
  };

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

  // Perform global search (excluding faculty)
  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setSearchPerformed(false);
      return;
    }

    setSearchLoading(true);
    setSearchPerformed(true);
    
    const searchTerm = query.toLowerCase().trim();
    const results = [];

    // Search News
    if (allContent.news.length > 0) {
      const newsMatches = allContent.news.filter(item => {
        return (
          item.title?.toLowerCase().includes(searchTerm) ||
          item.content?.toLowerCase().includes(searchTerm) ||
          item.category?.toLowerCase().includes(searchTerm) ||
          item.summary?.toLowerCase().includes(searchTerm)
        );
      });

      if (newsMatches.length > 0) {
        results.push({
          category: 'News',
          icon: 'fa-newspaper',
          items: newsMatches.slice(0, 5).map(item => ({
            id: item.id,
            title: item.title,
            description: item.summary || item.content?.substring(0, 100) || '',
            link: `/news/${item.id}`,
            type: 'news',
            image: item.images?.[0] || item.image_url || null,
            badge: item.category || 'News'
          }))
        });
      }
    }

    // Search Events
    if (allContent.events.length > 0) {
      const eventsMatches = allContent.events.filter(item => {
        return (
          item.title?.toLowerCase().includes(searchTerm) ||
          item.description?.toLowerCase().includes(searchTerm) ||
          item.location?.toLowerCase().includes(searchTerm)
        );
      });

      if (eventsMatches.length > 0) {
        results.push({
          category: 'Events',
          icon: 'fa-calendar-alt',
          items: eventsMatches.slice(0, 5).map(item => ({
            id: item.id,
            title: item.title,
            description: `${item.date} - ${item.location || 'TBA'}`,
            link: `/events/${item.id}`,
            type: 'event',
            image: item.images?.[0] || item.image_url || null,
            badge: item.date
          }))
        });
      }
    }

    // Search Announcements
    if (allContent.announcements.length > 0) {
      const announcementsMatches = allContent.announcements.filter(item => {
        return (
          item.title?.toLowerCase().includes(searchTerm) ||
          item.content?.toLowerCase().includes(searchTerm)
        );
      });

      if (announcementsMatches.length > 0) {
        results.push({
          category: 'Announcements',
          icon: 'fa-bullhorn',
          items: announcementsMatches.slice(0, 5).map(item => ({
            id: item.id,
            title: item.title,
            description: item.content?.substring(0, 100) || '',
            link: `/announcements/${item.id}`,
            type: 'announcement',
            image: item.images?.[0] || item.image_url || null,
            badge: item.priority || 'Normal'
          }))
        });
      }
    }

    // Search Key Officials
    if (allContent.officials.length > 0) {
      const officialsMatches = allContent.officials.filter(item => {
        return (
          item.name?.toLowerCase().includes(searchTerm) ||
          item.position?.toLowerCase().includes(searchTerm) ||
          item.category?.toLowerCase().includes(searchTerm)
        );
      });

      if (officialsMatches.length > 0) {
        results.push({
          category: 'Key Officials',
          icon: 'fa-user-tie',
          items: officialsMatches.map(item => ({
            id: item.id,
            title: item.name,
            description: `${item.position} - ${item.category}`,
            link: `/keyofficials`,
            type: 'official',
            image: item.image_url || null,
            badge: item.position
          }))
        });
      }
    }

    // Search Offices
    if (allContent.offices.length > 0) {
      const officesMatches = allContent.offices.filter(item => {
        return (
          item.name?.toLowerCase().includes(searchTerm) ||
          item.description?.toLowerCase().includes(searchTerm) ||
          item.location?.toLowerCase().includes(searchTerm)
        );
      });

      if (officesMatches.length > 0) {
        results.push({
          category: 'Offices',
          icon: 'fa-building',
          items: officesMatches.map(item => ({
            id: item.id,
            title: item.name,
            description: item.description || item.location || '',
            link: `/offices/${item.id}`,
            type: 'office',
            image: null,
            badge: item.location || 'Office'
          }))
        });
      }
    }

    // Search Pages (static pages)
    const pages = [
      { title: 'Home', description: 'USM KCC Main Page', link: '/', keywords: ['home', 'main', 'usm'] },
      { title: 'About', description: 'About USM KCC', link: '/about', keywords: ['about', 'university', 'history'] },
      { title: 'Academics', description: 'Academic Programs and Courses', link: '/academics', keywords: ['academics', 'courses', 'programs'] },
      { title: 'Admission', description: 'Admission Information', link: '/admission', keywords: ['admission', 'enroll', 'apply'] },
      { title: 'Scholarships', description: 'Scholarship Opportunities', link: '/scholarship', keywords: ['scholarship', 'financial aid', 'grant'] },
      { title: 'Contact', description: 'Contact Information', link: '/contact', keywords: ['contact', 'email', 'phone'] },
      { title: 'Offices', description: 'University Offices', link: '/offices', keywords: ['offices', 'administration'] },
      { title: 'Key Officials', description: 'University Key Officials', link: '/keyofficials', keywords: ['officials', 'directors', 'deans'] },
      { title: 'Organizations', description: 'Student Organizations', link: '/organizations', keywords: ['organizations', 'orgs', 'student orgs'] },
      { title: 'RESO', description: 'Research and Extension', link: '/research-extension', keywords: ['research', 'extension', 'reso'] },
      { title: 'RGES', description: 'Research and Development', link: '/rdes', keywords: ['rdes', 'research', 'development'] },
      { title: 'SDG Hub', description: 'Sustainable Development Goals', link: '/sdg-hub', keywords: ['sdg', 'sustainable', 'goals'] },
    ];

    const pageMatches = pages.filter(page => 
      page.keywords.some(keyword => keyword.includes(searchTerm)) ||
      page.title.toLowerCase().includes(searchTerm)
    );

    if (pageMatches.length > 0) {
      results.push({
        category: 'Pages',
        icon: 'fa-file-alt',
        items: pageMatches.map(page => ({
          id: page.link,
          title: page.title,
          description: page.description,
          link: page.link,
          type: 'page',
          image: null,
          badge: 'Page'
        }))
      });
    }

    setSearchResults(results);
    setSearchLoading(false);
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.trim().length >= 2) {
      performSearch(value);
    } else {
      setSearchResults([]);
      setSearchPerformed(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSearchPerformed(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    
    try {
      let result;
      if (loginType === 'admin') {
        result = await authService.adminLogin(
          loginCredentials.username, 
          loginCredentials.password
        );
      } else {
        // RESO Panel Login - using a separate login function
        result = await authService.resoLogin(
          loginCredentials.username, 
          loginCredentials.password
        );
      }
      
      if (result.success) {
        setIsAdminLoggedIn(true);
        setAdminUser(result.user);
        setShowLoginModal(false);
        setLoginCredentials({ username: '', password: '' });
        
        if (loginType === 'admin') {
          navigate('/admin');
        } else {
          navigate('/reso-admin');
        }
      } else {
        setLoginError(result.error || 'Invalid username or password.');
      }
    } catch (error) {
      setLoginError('Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleAdminLogout = async () => {
    const result = await authService.logout();
    if (result.success) {
      setIsAdminLoggedIn(false);
      setAdminUser(null);
      if (location.pathname === '/admin' || location.pathname === '/reso-admin') {
        navigate('/');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginCredentials(prev => ({ ...prev, [name]: value }));
  };

  const openLoginModal = (type) => {
    setLoginType(type);
    setLoginError('');
    setLoginCredentials({ username: '', password: '' });
    setShowLoginModal(true);
  };

  const LOGO_SIZE = 55;

  const getTotalResults = () => {
    let total = 0;
    searchResults.forEach(category => {
      total += category.items.length;
    });
    return total;
  };

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
            <Link to="/donate" style={{ 
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
            </Link>
            <div style={{ height: '16px', width: '1px', backgroundColor: 'rgba(255,255,255,0.3)' }}></div>
            
            <Link to="/sdg-hub" style={{ 
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
            </Link>
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
                Logout
              </Button>
            ) : (
              <Dropdown align="end">
                <Dropdown.Toggle 
                  variant="link"
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
                >
                  <i className="fas fa-lock"></i>
                  
                </Dropdown.Toggle>
                
                <Dropdown.Menu style={{
                  backgroundColor: '#00482D',
                  border: '1px solid #FFD326',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  marginTop: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  minWidth: '200px'
                }}>
                  <Dropdown.Item 
                    onClick={() => openLoginModal('admin')}
                    style={{
                      color: '#ffffff',
                      padding: '10px 16px',
                      backgroundColor: 'transparent',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
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
                    <i className="fas fa-user-shield" style={{ fontSize: '1.1rem' }}></i>
                    <div>
                      <div style={{ fontWeight: '600' }}>Admin Panel</div>
                      <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>Full system access</div>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Divider style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                  <Dropdown.Item 
                    onClick={() => openLoginModal('reso')}
                    style={{
                      color: '#ffffff',
                      padding: '10px 16px',
                      backgroundColor: 'transparent',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
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
                    <i className="fas fa-flask" style={{ fontSize: '1.1rem' }}></i>
                    <div>
                      <div style={{ fontWeight: '600' }}>RESO Panel</div>
                      <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>Template management</div>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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
                  <Link to="/donate" style={{ 
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
                  </Link>
                  
                  <Link to="/sdg-hub" style={{ 
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
                  </Link>
                  
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
                      onClick={() => setShowLoginModal(true)}
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
                      Login
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
                    Table of Organization
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
                    color: (isActiveLink('/admission') || isActiveLink('/scholarship') || isActiveLink('/student-news')) ? '#FFD326' : '#ffffff',
                    fontWeight: (isActiveLink('/admission') || isActiveLink('/scholarship') || isActiveLink('/student-news')) ? '600' : '500',
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
                    if (!isActiveLink('/admission') && !isActiveLink('/scholarship') && !isActiveLink('/student-news')) {
                      e.target.style.color = '#FFD326';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActiveLink('/admission') && !isActiveLink('/scholarship') && !isActiveLink('/student-news')) {
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
                    as="a"
                    href="https://www.usm.edu.ph/student/usmcee/"
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
                  {/* <Dropdown.Item 
                    as={Link} 
                    to="/student-news" 
                    onClick={() => setExpanded(false)}
                    style={{
                      color: isActiveLink('/student-news') ? '#FFD326' : '#ffffff',
                      fontWeight: isActiveLink('/student-news') ? '600' : '400',
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
                      e.target.style.color = isActiveLink('/student-news') ? '#FFD326' : '#ffffff';
                    }}
                  >
                    <i className="fas fa-newspaper me-2"></i>
                    News & Announcements
                  </Dropdown.Item> */}
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

              {/* Student Portal - External link, keep as <a> */}
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

      {/* Login Modal - Admin Panel and RESO Panel */}
      <Modal show={showLoginModal} onHide={() => {
        setShowLoginModal(false);
        setLoginError('');
        setLoginCredentials({ username: '', password: '' });
      }} centered size="md">
        <Modal.Header closeButton style={{ 
          backgroundColor: loginType === 'admin' ? '#00482D' : '#1a3d7c', 
          color: '#ffffff', 
          borderBottom: '2px solid #FFD326' 
        }}>
          <Modal.Title>
            {loginType === 'admin' ? (
              <><i className="fas fa-user-shield me-2"></i>USM KCC Admin Panel</>
            ) : (
              <><i className="fas fa-flask me-2"></i>RESO Panel Login</>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '1.5rem' }}>
          <Form onSubmit={handleAdminLogin}>
            <div className="mb-3 text-center">
              {loginType === 'admin' ? (
                <>
                  <i className="fas fa-user-shield" style={{ fontSize: '3rem', color: '#00482D' }}></i>
                  <p className="mt-2 text-muted">Restricted to USM KCC administrators only</p>
                </>
              ) : (
                <>
                  <i className="fas fa-flask" style={{ fontSize: '3rem', color: '#1a3d7c' }}></i>
                  <p className="mt-2 text-muted">RESO Template Management Panel</p>
                </>
              )}
              <small className="text-muted">Secured by Supabase</small>
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
                placeholder="Enter your username"
                required
                disabled={loginLoading}
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
                disabled={loginLoading}
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
                disabled={loginLoading}
                style={{ 
                  backgroundColor: loginType === 'admin' ? '#00482D' : '#1a3d7c', 
                  color: '#FFD326', 
                  borderColor: loginType === 'admin' ? '#00482D' : '#1a3d7c',
                  padding: '0.75rem',
                  fontWeight: '600'
                }}
                onMouseEnter={(e) => {
                  if (!loginLoading) {
                    e.target.style.backgroundColor = '#FFD326';
                    e.target.style.color = loginType === 'admin' ? '#00482D' : '#1a3d7c';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loginLoading) {
                    e.target.style.backgroundColor = loginType === 'admin' ? '#00482D' : '#1a3d7c';
                    e.target.style.color = '#FFD326';
                  }
                }}
              >
                {loginLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Authenticating...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt me-2"></i>
                    {loginType === 'admin' ? 'Login to Admin Panel' : 'Login to RESO Panel'}
                  </>
                )}
              </Button>
              <Button 
                variant="outline-secondary" 
                onClick={() => {
                  setShowLoginModal(false);
                  setLoginError('');
                  setLoginCredentials({ username: '', password: '' });
                }}
                disabled={loginLoading}
                style={{ 
                  borderColor: '#6c757d',
                  color: '#6c757d'
                }}
              >
                Cancel
              </Button>
            </div>

            {/* Switch Login Type Link */}
            <div className="text-center mt-3">
              <Button 
                variant="link" 
                size="sm"
                onClick={() => {
                  setLoginType(loginType === 'admin' ? 'reso' : 'admin');
                  setLoginError('');
                  setLoginCredentials({ username: '', password: '' });
                }}
                style={{ color: '#00482D', textDecoration: 'none' }}
              >
                {loginType === 'admin' ? (
                  <>Switch to <strong>RESO Panel</strong> <i className="fas fa-arrow-right ms-1"></i></>
                ) : (
                  <>Switch to <strong>Admin Panel</strong> <i className="fas fa-arrow-right ms-1"></i></>
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Search Modal */}
      <Modal 
        show={showSearchModal} 
        onHide={() => {
          setShowSearchModal(false);
          clearSearch();
        }} 
        centered 
        size="lg"
        scrollable
      >
        <Modal.Header closeButton style={{ backgroundColor: '#00482D', color: '#ffffff', borderBottom: '2px solid #FFD326' }}>
          <Modal.Title>
            <i className="fas fa-search me-2"></i>
            Search USM KCC Website
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '1.5rem' }}>
          <Form onSubmit={handleSearch}>
            <InputGroup size="lg">
              <Form.Control
                type="text"
                placeholder="Search for news, events, announcements, offices, officials, and more..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                autoFocus
                style={{ 
                  border: '2px solid #00482D',
                  borderRadius: '6px 0 0 6px',
                  padding: '0.75rem 1rem',
                  fontSize: '1rem'
                }}
              />
              <Button 
                variant="primary" 
                type="submit" 
                disabled={searchLoading}
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
                <i className="fas fa-search me-2"></i>
                Search
              </Button>
            </InputGroup>
          </Form>

          {searchLoading ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="success" />
              <p className="mt-2 text-muted">Searching...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="mt-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 style={{ color: '#00482D', fontWeight: '600' }}>
                  <i className="fas fa-search me-2"></i>
                  Search Results ({getTotalResults()})
                </h6>
                <Button 
                  variant="outline-secondary" 
                  size="sm"
                  onClick={clearSearch}
                  style={{ borderRadius: '20px' }}
                >
                  <i className="fas fa-times me-1"></i>
                  Clear Results
                </Button>
              </div>
              
              {searchResults.map((category, idx) => (
                <div key={idx} className="mb-4">
                  <h6 className="mb-2" style={{ color: '#00482D' }}>
                    <i className={`fas ${category.icon} me-2`}></i>
                    {category.category} 
                    <Badge bg="secondary" className="ms-2">{category.items.length}</Badge>
                  </h6>
                  <ListGroup variant="flush" style={{ borderRadius: '8px', overflow: 'hidden' }}>
                    {category.items.map((item, itemIdx) => (
                      <ListGroup.Item 
                        key={item.id || itemIdx}
                        action
                        as={Link}
                        to={item.link}
                        onClick={() => {
                          setShowSearchModal(false);
                          clearSearch();
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '12px 16px',
                          borderLeft: '3px solid #00482D',
                          transition: 'all 0.2s',
                          textDecoration: 'none',
                          color: '#333'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(0, 72, 45, 0.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        {item.image && (
                          <img 
                            src={item.image} 
                            alt={item.title}
                            style={{
                              width: '40px',
                              height: '40px',
                              objectFit: 'cover',
                              borderRadius: '50%',
                              marginRight: '12px',
                              flexShrink: 0
                            }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.style.display = 'none';
                            }}
                          />
                        )}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>
                            {item.title}
                          </div>
                          {item.description && (
                            <div style={{ 
                              fontSize: '0.85rem', 
                              color: '#6c757d',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>
                              {item.description}
                            </div>
                          )}
                        </div>
                        {item.badge && (
                          <Badge 
                            bg="info" 
                            style={{ 
                              marginLeft: '8px',
                              fontSize: '0.7rem',
                              padding: '4px 8px',
                              flexShrink: 0
                            }}
                          >
                            {item.badge}
                          </Badge>
                        )}
                        <i className="fas fa-chevron-right ms-2" style={{ color: '#00482D', fontSize: '0.8rem' }}></i>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>
              ))}
            </div>
          ) : searchQuery.trim().length >= 2 && searchPerformed ? (
            <div className="text-center py-5">
              <i className="fas fa-search" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
              <h5 className="mt-3 text-muted">No results found for "{searchQuery}"</h5>
              <p className="text-muted">Try adjusting your search terms or browse our pages</p>
              <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
                <Button size="sm" variant="outline-secondary" onClick={() => {
                  setSearchQuery('admission');
                  performSearch('admission');
                }}>
                  Admission
                </Button>
                <Button size="sm" variant="outline-secondary" onClick={() => {
                  setSearchQuery('scholarship');
                  performSearch('scholarship');
                }}>
                  Scholarship
                </Button>
                <Button size="sm" variant="outline-secondary" onClick={() => {
                  setSearchQuery('events');
                  performSearch('events');
                }}>
                  Events
                </Button>
                <Button size="sm" variant="outline-secondary" onClick={() => {
                  setSearchQuery('offices');
                  performSearch('offices');
                }}>
                  Offices
                </Button>
                <Button size="sm" variant="outline-secondary" onClick={() => {
                  setSearchQuery('news');
                  performSearch('news');
                }}>
                  News
                </Button>
              </div>
            </div>
          ) : searchQuery.trim().length > 0 && searchQuery.trim().length < 2 ? (
            <div className="text-center py-4">
              <p className="text-muted">Type at least 2 characters to search</p>
            </div>
          ) : (
            <div className="text-center py-4">
              <i className="fas fa-search" style={{ fontSize: '2rem', color: '#6c757d' }}></i>
              <p className="mt-3 text-muted">Search for anything on our website</p>
              <div className="d-flex flex-wrap justify-content-center gap-2 mt-2">
                <Badge bg="secondary" className="p-2">News Articles</Badge>
                <Badge bg="secondary" className="p-2">Events</Badge>
                <Badge bg="secondary" className="p-2">Announcements</Badge>
                <Badge bg="secondary" className="p-2">Offices</Badge>
                <Badge bg="secondary" className="p-2">Key Officials</Badge>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Header;