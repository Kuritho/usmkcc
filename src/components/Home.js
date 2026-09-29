// src/components/Home.js - Lighter SDG Hub Color
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Carousel, Modal } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import NewsCard from './NewsCard';
import { getNews, getEvents, getAnnouncements } from '../supabase/services';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();
  
  // State for dynamic data
  const [news, setNews] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State for maintenance modal
  const [showMaintenance, setShowMaintenance] = useState(false);
  const [maintenanceLink, setMaintenanceLink] = useState('');

  // Hero carousel images
  const heroImages = [
    {
      id: 1,
      src: process.env.PUBLIC_URL + "/images/adminbuilding.jpg",
      alt: "USM-KCC Campus",
      caption: "A Premier Educational Institution in Mindanao"
    },
    {
      id: 2,
      src: process.env.PUBLIC_URL + "/images/sciencebuilding.jpg",
      alt: "Students at USM-KCC",
      caption: "Nurturing Future Leaders"
    },
    {
      id: 3,
      src: process.env.PUBLIC_URL + "/images/maingate.jpg",
      alt: "Graduation Ceremony",
      caption: "Celebrating Academic Excellence"
    }
  ];

  // Quick links data
  const quickLinks = [
    { name: 'Student Portal', icon: 'fas fa-user-graduate', url: 'https://studentportal.usm.edu.ph/', underMaintenance: false },
    { name: 'Faculty Portal', icon: 'fas fa-chalkboard-teacher', url: '#', underMaintenance: true },
    { name: 'Online Registration', icon: 'fas fa-file-signature', url: '#', underMaintenance: true },
    { name: 'Library', icon: 'fas fa-book', url: 'http://lrcopac.usmkcc.edu.ph/', underMaintenance: false },
    { name: 'Research Portal', icon: 'fas fa-flask', url: '#', underMaintenance: true },
    { name: 'Alumni Services', icon: 'fas fa-user-friends', url: '#', underMaintenance: true },
    { name: 'Get USM Email', icon: 'fas fa-envelope', url: 'https://getmail.usm.edu.ph/', underMaintenance: false },
    { name: 'USM College Entrance Exam', icon: 'fas fa-clipboard-list', url: 'https://cee.usm.edu.ph/', underMaintenance: false }
  ];

  // Handle quick link click
  const handleQuickLinkClick = (e, link) => {
    if (link.underMaintenance) {
      e.preventDefault();
      setMaintenanceLink(link.name);
      setShowMaintenance(true);
    } else if (link.url && link.url !== '#') {
      window.open(link.url, '_blank', 'noopener,noreferrer');
    } else {
      e.preventDefault();
      setMaintenanceLink(link.name);
      setShowMaintenance(true);
    }
  };

  // Handle SDG Hub click
  const handleSDGClick = () => {
    navigate('/sdg-hub');
  };

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [newsResult, eventsResult, announcementsResult] = await Promise.all([
          getNews(),
          getEvents(),
          getAnnouncements()
        ]);

        console.log('📊 News Result:', newsResult);
        console.log('📊 Events Result:', eventsResult);
        console.log('📊 Announcements Result:', announcementsResult);

        // Get latest 6 news
        if (newsResult.success && newsResult.data.length > 0) {
          const sortedNews = newsResult.data
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 6);
          
          const formattedNews = sortedNews.map(item => ({
            id: item.id,
            title: item.title,
            excerpt: item.summary || item.content?.substring(0, 150) + '...',
            date: item.date ? new Date(item.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }) : new Date(item.created_at).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }),
            image: item.image_url || "/images/news-default.jpg",
            images: item.images || [],
            link: `/news/${item.id}`,
            sdg_tags: item.sdg_tags || []
          }));
          setNews(formattedNews);
        } else {
          setNews([]);
        }

        if (eventsResult.success) {
          console.log('📅 Events data fetched (not displayed on homepage):', eventsResult.data.length);
        }

        // Get latest 6 announcements
        if (announcementsResult.success && announcementsResult.data.length > 0) {
          const sortedAnnouncements = announcementsResult.data
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 6);
          
          const formattedAnnouncements = sortedAnnouncements.map(item => ({
            id: item.id,
            title: item.title,
            excerpt: item.content?.substring(0, 150) + '...',
            date: item.date ? new Date(item.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }) : new Date(item.created_at).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }),
            image: item.image_url || "/images/announcement-default.jpg",
            images: item.images || [],
            link: `/announcement/${item.id}`,
            priority: item.priority || 'normal'
          }));
          setAnnouncements(formattedAnnouncements);
        } else {
          setAnnouncements([]);
        }
      } catch (error) {
        console.error('❌ Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to handle navigation
  const handleNewsClick = (item) => {
    console.log('🖱️ Clicked news item:', item);
    console.log('🔗 Navigating to:', item.link);
    navigate(item.link);
  };

  const handleAnnouncementClick = (item) => {
    console.log('🖱️ Clicked announcement item:', item);
    console.log('🔗 Navigating to:', item.link);
    navigate(item.link);
  };

  // Helper function to get image source
  const getImageSrc = (item) => {
    if (item.images && Array.isArray(item.images) && item.images.length > 0) {
      return item.images[0];
    }
    return item.image || "/images/news-default.jpg";
  };

  // Helper function to get image count
  const getImageCount = (item) => {
    if (item.images && Array.isArray(item.images)) {
      return item.images.length;
    }
    return 0;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <Container className="text-center py-5">
          <div className="spinner-border text-success" style={{ color: '#00482D' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading campus updates...</p>
        </Container>
      </div>
    );
  }

  return (
    <>
      {/* HERO SECTION - WITH FRAME */}
      <section className="hero-section position-relative" style={{
        borderBottom: '8px solid #02570b',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <Carousel fade controls={false} indicators={true} interval={5000}>
          {heroImages.map((image) => (
            <Carousel.Item key={image.id}>
              <div 
                className={`d-block w-100 ${styles.heroSlide}`}
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url(${image.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: '#1a1a2e',
                  height: '650px',
                  width: '100%'
                }}
              ></div>
              <Carousel.Caption className="d-flex flex-column justify-content-center align-items-center h-100">
                <div className="hero-content text-center">
                  <h1 className="display-2 fw-bold mb-3 text-white" style={{ 
                    fontSize: '4.5rem',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    letterSpacing: '2px'
                  }}>
                    Welcome to
                  </h1>
                  <h2 className="display-3 fw-bold mb-3 text-white" style={{ 
                    fontSize: '3.8rem',
                    textShadow: '2px 2px 8px rgba(0,0,0,0.4)',
                    letterSpacing: '1px',
                    lineHeight: '1.2'
                  }}>
                    University of Southern Mindanao - Kidapawan City Campus
                  </h2>
                  <p className="lead mb-4 text-light" style={{ 
                    fontSize: '1.8rem',
                    fontWeight: '300',
                    textShadow: '1px 1px 4px rgba(0,0,0,0.3)',
                    letterSpacing: '4px'
                  }}>
                    Excellence | Service | Leadership
                  </p>
                  <div className="d-flex flex-wrap justify-content-center gap-3">
                    <Link to="/academics">
                      <button variant="light" size="lg" className="px-5 py-3 rounded-pill fw-semibold btn btn-light btn-lg" style={{
                        fontSize: '1.2rem',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                        transition: 'all 0.3s ease'
                      }}>
                        Explore Our Programs
                      </button>
                    </Link>
                  </div>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      {/* CSC PICTURE - EVEN LARGER WITH FRAME */}
      <section className="csc-image-section py-3" style={{
        borderBottom: '8px solid #1a3d7c',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        background: '#f8f9fa'
      }}>
        <Container fluid>
          <Row className="justify-content-center">
            <Col xs={12} md={12} lg={11}>
              <div className="csc-image-wrapper position-relative" style={{
                background: '#ffffff',
                padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 4px 25px rgba(0,0,0,0.08)',
                border: '3px solid #ffd700'
              }}>
                <img 
                  src={process.env.PUBLIC_URL + "/images/csc-banner.png"} 
                  alt="Civil Service Commission - Republic of the Philippines"
                  className="img-fluid w-100"
                  style={{
                    display: 'block',
                    width: '100%',
                    height: 'auto',
                    maxHeight: '450px',
                    objectFit: 'contain',
                    backgroundColor: '#ffffff',
                    padding: '15px 0'
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/csc-default.jpg';
                  }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* QUICK STATS - WITH FRAME */}
      <section className="bg-usmkc-green py-4" style={{
        borderBottom: '8px solid #ffd700',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <Container>
          <Row className="text-center text-white">
            <Col md={3} className="border-end border-white">
              <h4 className="fw-bold mb-0" style={{ fontSize: '2.2rem' }}>20+</h4>
              <p className="mb-0 text-light" style={{ fontSize: '1.1rem' }}>Academic Programs</p>
            </Col>
            <Col md={3} className="border-end border-white">
              <h4 className="fw-bold mb-0" style={{ fontSize: '2.2rem' }}>4,000+</h4>
              <p className="mb-0 text-light" style={{ fontSize: '1.1rem' }}>Students</p>
            </Col>
            <Col md={3} className="border-end border-white">
              <h4 className="fw-bold mb-0" style={{ fontSize: '2.2rem' }}>100+</h4>
              <p className="mb-0 text-light" style={{ fontSize: '1.1rem' }}>Faculty Members</p>
            </Col>
            <Col md={3}>
              <h4 className="fw-bold mb-0" style={{ fontSize: '2.2rem' }}>25+</h4>
              <p className="mb-0 text-light" style={{ fontSize: '1.1rem' }}>Years of Excellence</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CAMPUS UPDATES - WITH FRAME */}
      <section className="campus-updates-section py-5" style={{ 
        background: '#f8fafc',
        borderBottom: '8px solid #02570b',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
      }}>
        <Container>
          {/* Section Header */}
          <Row className="mb-5">
            <Col lg={8} className="mx-auto text-center">
              <div className="section-header">
                <span className="badge bg-usmkc-green rounded-pill px-3 py-2 mb-3" style={{ fontSize: '0.85rem' }}>
                  <i className="fas fa-bell me-2"></i> Stay Informed
                </span>
                <h2 className="section-title display-5 fw-bold mb-3" style={{ color: '#1a2a3a', fontSize: '3rem' }}>
                  Campus Updates
                </h2>
                <p className="text-muted lead" style={{ fontSize: '1.15rem' }}>
                  The latest news, events, and announcements from USM-KCC
                </p>
                <div className="header-divider mx-auto" style={{ 
                  width: '80px', 
                  height: '4px', 
                  background: 'linear-gradient(90deg, #02570b, #1a3d7c)',
                  borderRadius: '2px',
                  marginTop: '15px'
                }}></div>
              </div>
            </Col>
          </Row>

          <Row className="g-4">
            {/* NEWS COLUMN - 6 ITEMS */}
            <Col lg={6}>
              <div className="news-section-wrapper" style={{
                background: '#ffffff',
                padding: '20px',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                border: '2px solid #e8ecef'
              }}>
                {/* Section Label */}
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div className="d-flex align-items-center">
                    <div className="section-icon me-3 d-flex align-items-center justify-content-center" style={{
                      width: '50px',
                      height: '50px',
                      background: 'linear-gradient(135deg, #02570b, #1a7a2e)',
                      borderRadius: '12px',
                      boxShadow: '0 4px 15px rgba(2, 87, 11, 0.2)'
                    }}>
                      <i className="fas fa-newspaper text-white" style={{ fontSize: '1.5rem' }}></i>
                    </div>
                    <div>
                      <h3 className="mb-0 fw-bold" style={{ color: '#1a2a3a', fontSize: '1.8rem' }}>News</h3>
                      <small className="text-muted">Latest stories</small>
                    </div>
                  </div>
                  <span className="badge bg-light text-dark border px-3 py-2 rounded-pill">
                    <i className="fas fa-arrow-right me-1"></i> {news.length} updates
                  </span>
                </div>

                {/* News Cards - 6 items */}
                <div className="news-list" style={{ maxHeight: '650px', overflowY: 'auto', paddingRight: '5px' }}>
                  {news.length > 0 ? (
                    news.map((item, index) => (
                      <div 
                        key={item.id}
                        className="news-card-modern mb-3"
                        onClick={() => handleNewsClick(item)}
                        style={{
                          cursor: 'pointer',
                          background: '#ffffff',
                          borderRadius: '12px',
                          padding: '14px 18px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                          transition: 'all 0.3s ease',
                          border: '1px solid rgba(0,0,0,0.04)',
                          position: 'relative'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.08)';
                          e.currentTarget.style.transform = 'translateX(4px)';
                          e.currentTarget.style.borderColor = '#02570b';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                          e.currentTarget.style.transform = 'translateX(0)';
                          e.currentTarget.style.borderColor = 'rgba(0,0,0,0.04)';
                        }}
                      >
                        <Row className="g-3 align-items-center">
                          <Col xs={3} sm={3} md={3}>
                            <div className="news-image-wrapper" style={{
                              borderRadius: '8px',
                              overflow: 'hidden',
                              background: '#f0f2f5',
                              aspectRatio: '1/1',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              position: 'relative'
                            }}>
                              <img 
                                src={getImageSrc(item)} 
                                alt={item.title}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover'
                                }}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = '/images/news-default.jpg';
                                }}
                              />
                              {getImageCount(item) > 1 && (
                                <div className="position-absolute top-0 end-0 m-1">
                                  <span className="badge bg-dark bg-opacity-75" style={{ fontSize: '0.6rem' }}>
                                    <i className="fas fa-images me-1"></i>{getImageCount(item)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </Col>
                          <Col xs={9} sm={9} md={9}>
                            <h6 className="mb-1 fw-bold" style={{ color: '#1a2a3a', fontSize: '0.9rem', lineHeight: '1.4' }}>
                              {item.title}
                            </h6>
                            <p className="text-muted small mb-2" style={{ fontSize: '0.8rem' }}>
                              {item.excerpt.length > 70 ? item.excerpt.substring(0, 70) + '...' : item.excerpt}
                            </p>
                            <div className="d-flex justify-content-between align-items-center">
                              <small className="text-muted" style={{ fontSize: '0.7rem' }}>
                                <i className="far fa-calendar-alt me-1"></i> {item.date}
                              </small>
                              <span className="text-usmkc-green" style={{ fontSize: '0.75rem', fontWeight: '600' }}>
                                Read More <i className="fas fa-arrow-right ms-1" style={{ fontSize: '0.65rem' }}></i>
                              </span>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-5 bg-white rounded-3">
                      <i className="fas fa-newspaper text-muted" style={{ fontSize: '2.5rem' }}></i>
                      <p className="text-muted mt-3">No news available at the moment.</p>
                    </div>
                  )}
                </div>

                {/* View All Button */}
                <div className="text-center mt-4">
                  <Button 
                    variant="outline-usmkc-green" 
                    onClick={() => navigate('/campus-updates')}
                    className="px-5 py-2 rounded-pill fw-semibold"
                    style={{ 
                      borderWidth: '2px',
                      fontSize: '0.95rem',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    View All News <i className="fas fa-arrow-right ms-2"></i>
                  </Button>
                </div>
              </div>
            </Col>

            {/* ANNOUNCEMENTS COLUMN - 6 ITEMS */}
            <Col lg={6}>
              <div className="announcements-section-wrapper" style={{
                background: '#ffffff',
                padding: '20px',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                border: '2px solid #e8ecef'
              }}>
                {/* Section Label */}
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div className="d-flex align-items-center">
                    <div className="section-icon me-3 d-flex align-items-center justify-content-center" style={{
                      width: '50px',
                      height: '50px',
                      background: 'linear-gradient(135deg, #1a3d7c, #2a5dac)',
                      borderRadius: '12px',
                      boxShadow: '0 4px 15px rgba(26, 61, 124, 0.2)'
                    }}>
                      <i className="fas fa-bullhorn text-white" style={{ fontSize: '1.5rem' }}></i>
                    </div>
                    <div>
                      <h3 className="mb-0 fw-bold" style={{ color: '#1a2a3a', fontSize: '1.8rem' }}>Announcements</h3>
                      <small className="text-muted">Important updates</small>
                    </div>
                  </div>
                  <span className="badge bg-light text-dark border px-3 py-2 rounded-pill">
                    <i className="fas fa-arrow-right me-1"></i> {announcements.length} updates
                  </span>
                </div>

                {/* Announcement Cards - 6 items */}
                <div className="announcements-list" style={{ maxHeight: '650px', overflowY: 'auto', paddingRight: '5px' }}>
                  {announcements.length > 0 ? (
                    announcements.map((item) => (
                      <div 
                        key={item.id}
                        className="announcement-card-modern mb-3"
                        onClick={() => handleAnnouncementClick(item)}
                        style={{
                          cursor: 'pointer',
                          background: '#ffffff',
                          borderRadius: '12px',
                          padding: '14px 18px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                          transition: 'all 0.3s ease',
                          border: `1px solid ${item.priority === 'high' ? '#dc3545' : 'rgba(0,0,0,0.04)'}`,
                          borderLeftWidth: '4px',
                          borderLeftColor: item.priority === 'high' ? '#dc3545' : item.priority === 'medium' ? '#ffc107' : '#02570b'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.08)';
                          e.currentTarget.style.transform = 'translateX(4px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      >
                        <Row className="g-3 align-items-center">
                          <Col xs={3} sm={3} md={3}>
                            <div className="announcement-image-wrapper" style={{
                              borderRadius: '8px',
                              overflow: 'hidden',
                              background: '#f0f2f5',
                              aspectRatio: '1/1',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              position: 'relative'
                            }}>
                              <img 
                                src={getImageSrc(item)} 
                                alt={item.title}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover'
                                }}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = '/images/announcement-default.jpg';
                                }}
                              />
                              {getImageCount(item) > 1 && (
                                <div className="position-absolute top-0 end-0 m-1">
                                  <span className="badge bg-dark bg-opacity-75" style={{ fontSize: '0.6rem' }}>
                                    <i className="fas fa-images me-1"></i>{getImageCount(item)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </Col>
                          <Col xs={9} sm={9} md={9}>
                            <div className="d-flex align-items-start justify-content-between">
                              <h6 className="mb-1 fw-bold" style={{ color: '#1a2a3a', fontSize: '0.9rem', lineHeight: '1.4', flex: 1 }}>
                                {item.title}
                              </h6>
                              {item.priority === 'high' && (
                                <span className="badge bg-danger ms-2" style={{ fontSize: '0.6rem', flexShrink: 0 }}>
                                  <i className="fas fa-exclamation-circle me-1"></i> Urgent
                                </span>
                              )}
                            </div>
                            <p className="text-muted small mb-2" style={{ fontSize: '0.8rem' }}>
                              {item.excerpt.length > 70 ? item.excerpt.substring(0, 70) + '...' : item.excerpt}
                            </p>
                            <div className="d-flex justify-content-between align-items-center">
                              <small className="text-muted" style={{ fontSize: '0.7rem' }}>
                                <i className="far fa-calendar-alt me-1"></i> {item.date}
                              </small>
                              <span className="text-usmkc-blue" style={{ fontSize: '0.75rem', fontWeight: '600' }}>
                                Read More <i className="fas fa-arrow-right ms-1" style={{ fontSize: '0.65rem' }}></i>
                              </span>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-5 bg-white rounded-3">
                      <i className="fas fa-bullhorn text-muted" style={{ fontSize: '2.5rem' }}></i>
                      <p className="text-muted mt-3">No announcements available.</p>
                    </div>
                  )}
                </div>

                {/* View All Button */}
                <div className="text-center mt-4">
                  <Button 
                    variant="outline-usmkc-blue" 
                    onClick={() => navigate('/campus-updates')}
                    className="px-5 py-2 rounded-pill fw-semibold"
                    style={{ 
                      borderWidth: '2px',
                      fontSize: '0.95rem',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    View All Announcements <i className="fas fa-arrow-right ms-2"></i>
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* QUICK ACCESS - WITH FRAME */}
      <section className="quick-access-section py-5" style={{ 
        background: '#ffffff',
        borderBottom: '8px solid #1a3d7c',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
      }}>
        <Container>
          {/* Section Header */}
          <Row className="mb-5">
            <Col lg={8} className="mx-auto text-center">
              <div className="section-header">
                <span className="badge bg-usmkc-blue rounded-pill px-3 py-2 mb-3" style={{ fontSize: '0.85rem' }}>
                  <i className="fas fa-thunderbolt me-2"></i> Quick Access
                </span>
                <h2 className="section-title display-5 fw-bold mb-3" style={{ color: '#1a2a3a', fontSize: '3rem' }}>
                  Campus Resources
                </h2>
                <p className="text-muted lead" style={{ fontSize: '1.15rem' }}>
                  Navigate to important services and platforms
                </p>
                <div className="header-divider mx-auto" style={{ 
                  width: '80px', 
                  height: '4px', 
                  background: 'linear-gradient(90deg, #1a3d7c, #02570b)',
                  borderRadius: '2px',
                  marginTop: '15px'
                }}></div>
              </div>
            </Col>
          </Row>

          {/* Quick Links Grid */}
          <Row className="g-4">
            {quickLinks.map((link, index) => (
              <Col lg={3} md={4} sm={6} key={index}>
                <div 
                  className="quick-link-modern"
                  onClick={(e) => handleQuickLinkClick(e, link)}
                  style={{
                    cursor: 'pointer',
                    background: link.underMaintenance ? '#fff9e6' : '#ffffff',
                    padding: '20px 16px',
                    borderRadius: '16px',
                    textAlign: 'center',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                    border: link.underMaintenance ? '2px solid #ffc107' : '2px solid #e8ecef',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(0,0,0,0.1)';
                    if (!link.underMaintenance) {
                      e.currentTarget.style.borderColor = '#02570b';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)';
                    if (!link.underMaintenance) {
                      e.currentTarget.style.borderColor = '#e8ecef';
                    }
                  }}
                >
                  {/* Icon */}
                  <div 
                    className="quick-link-icon-modern mb-3"
                    style={{
                      width: '60px',
                      height: '60px',
                      background: link.underMaintenance ? '#ffc107' : 'linear-gradient(135deg, #02570b, #1a7a2e)',
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      boxShadow: link.underMaintenance ? '0 4px 15px rgba(255, 193, 7, 0.3)' : '0 4px 15px rgba(2, 87, 11, 0.2)'
                    }}
                  >
                    <i className={`${link.icon} text-white`} style={{ fontSize: '1.8rem' }}></i>
                  </div>

                  {/* Title */}
                  <h6 className="fw-bold mb-1" style={{ color: '#1a2a3a', fontSize: '0.95rem' }}>
                    {link.name}
                  </h6>

                  {/* Status Badge */}
                  {link.underMaintenance && (
                    <span className="badge bg-warning text-dark mt-2 px-3 py-1 rounded-pill" style={{ fontSize: '0.65rem' }}>
                      <i className="fas fa-tools me-1"></i> Maintenance
                    </span>
                  )}

                  {/* Arrow Indicator */}
                  <div className="mt-2" style={{ 
                    width: '30px', 
                    height: '2px', 
                    background: link.underMaintenance ? '#ffc107' : '#02570b',
                    borderRadius: '1px',
                    opacity: 0.6,
                    transition: 'all 0.3s ease'
                  }}>
                    <div style={{ 
                      width: '100%', 
                      height: '100%', 
                      background: link.underMaintenance ? '#ffc107' : '#02570b',
                      borderRadius: '1px'
                    }}></div>
                  </div>
                </div>
              </Col>
            ))}

            {/* SDG Hub Card - LIGHTER COLOR */}
            <Col lg={3} md={4} sm={6}>
              <div 
                onClick={handleSDGClick}
                style={{
                  cursor: 'pointer',
                  background: 'linear-gradient(135deg, #4a90d9, #6bb5e8)',
                  padding: '20px 16px',
                  borderRadius: '16px',
                  textAlign: 'center',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 4px 20px rgba(74, 144, 217, 0.25)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  border: '2px solid #4a90d9'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(74, 144, 217, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(74, 144, 217, 0.25)';
                }}
              >
                <div 
                  className="mb-3"
                  style={{
                    width: '60px',
                    height: '60px',
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <i className="fas fa-globe-americas" style={{ fontSize: '2rem', color: 'white' }}></i>
                </div>
                <h6 className="fw-bold mb-1" style={{ fontSize: '0.95rem' }}>SDG Hub</h6>
                <p className="small mb-2" style={{ opacity: 0.9, fontSize: '0.8rem' }}>
                  Sustainable Development Goals
                </p>
                <span className="badge bg-white text-primary px-3 py-1 rounded-pill" style={{ fontSize: '0.7rem' }}>
                  Learn More <i className="fas fa-arrow-right ms-1"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Maintenance Modal */}
      <Modal
        show={showMaintenance}
        onHide={() => setShowMaintenance(false)}
        centered
        size="lg"
        backdrop="static"
      >
        <Modal.Header closeButton className="border-warning bg-light">
          <Modal.Title className="text-warning">
            <i className="fas fa-tools me-2"></i> Under Maintenance
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-5">
          <div className="mb-4">
            <i className="fas fa-cogs text-warning" style={{ fontSize: '5rem' }}></i>
          </div>
          <h3 className="mb-3 text-usmkc-blue">{maintenanceLink}</h3>
          <h5 className="text-muted mb-4">is currently under maintenance</h5>
          <div className="card bg-light p-4 mx-auto" style={{ maxWidth: '400px' }}>
            <p className="mb-0">
              <i className="fas fa-info-circle text-warning me-2"></i>
              We're working hard to improve this service. 
              <br />
              Please check back later for updates.
            </p>
          </div>
          <div className="mt-4">
            <small className="text-muted">
              <i className="far fa-clock me-1"></i> 
              We apologize for any inconvenience.
            </small>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center border-0">
          <Button 
            variant="outline-secondary" 
            onClick={() => setShowMaintenance(false)}
            className="px-4 rounded-pill"
          >
            Close
          </Button>
          <Button 
            variant="primary" 
            onClick={() => {
              setShowMaintenance(false);
              navigate('/campus-updates');
            }}
            className="px-4 rounded-pill"
            style={{ background: '#02570b', border: 'none' }}
          >
            View Updates
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Styles */}
      <style jsx>{`
        .hero-section {
          overflow: hidden;
        }
        
        .hero-slide {
          position: relative;
        }
        
        .section-title {
          font-weight: 700;
          color: #1a2a3a;
        }
        
        .header-divider {
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #02570b, #1a3d7c);
          borderRadius: 2px;
          margin: 15px auto 0;
        }

        /* Quick Link Modern Styles */
        .quick-link-modern {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .quick-link-modern:hover .quick-link-icon-modern {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(2, 87, 11, 0.3) !important;
        }

        /* Custom Scrollbar */
        .news-list::-webkit-scrollbar,
        .announcements-list::-webkit-scrollbar {
          width: 4px;
        }

        .news-list::-webkit-scrollbar-track,
        .announcements-list::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .news-list::-webkit-scrollbar-thumb,
        .announcements-list::-webkit-scrollbar-thumb {
          background: #02570b;
          border-radius: 10px;
        }

        .news-list::-webkit-scrollbar-thumb:hover,
        .announcements-list::-webkit-scrollbar-thumb:hover {
          background: #1a3d7c;
        }

        /* Responsive */
        @media (max-width: 992px) {
          .hero-content h1 {
            font-size: 3.5rem !important;
          }
          
          .hero-content h2 {
            font-size: 2.8rem !important;
          }

          .csc-image-wrapper img {
            max-height: 350px !important;
          }
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2.2rem !important;
          }
          
          .hero-content h1 {
            font-size: 2.8rem !important;
          }
          
          .hero-content h2 {
            font-size: 2rem !important;
          }
          
          .hero-content p {
            font-size: 1.3rem !important;
          }
          
          .news-card-modern,
          .announcement-card-modern {
            padding: 12px 14px !important;
          }
          
          .quick-link-modern {
            padding: 16px 12px !important;
          }
          
          .quick-link-icon-modern {
            width: 48px !important;
            height: 48px !important;
          }
          
          .quick-link-icon-modern i {
            font-size: 1.4rem !important;
          }

          .news-list,
          .announcements-list {
            max-height: 500px !important;
          }

          .csc-image-wrapper {
            padding: 15px !important;
          }

          .csc-image-wrapper img {
            max-height: 300px !important;
          }
        }

        @media (max-width: 576px) {
          .hero-content h1 {
            font-size: 2.2rem !important;
          }
          
          .hero-content h2 {
            font-size: 1.6rem !important;
          }
          
          .hero-content p {
            font-size: 1rem !important;
          }
          
          .news-card-modern .col-3,
          .announcement-card-modern .col-3 {
            flex: 0 0 30%;
            max-width: 30%;
          }
          
          .news-card-modern .col-9,
          .announcement-card-modern .col-9 {
            flex: 0 0 70%;
            max-width: 70%;
          }
          
          .news-card-modern h6,
          .announcement-card-modern h6 {
            font-size: 0.8rem !important;
          }

          .news-list,
          .announcements-list {
            max-height: 400px !important;
          }

          .csc-image-wrapper {
            padding: 10px !important;
          }

          .csc-image-wrapper img {
            max-height: 220px !important;
            padding: 5px 0 !important;
          }
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .news-card-modern,
        .announcement-card-modern,
        .quick-link-modern {
          animation: fadeInUp 0.5s ease forwards;
        }

        .news-card-modern:nth-child(1) { animation-delay: 0.05s; }
        .news-card-modern:nth-child(2) { animation-delay: 0.1s; }
        .news-card-modern:nth-child(3) { animation-delay: 0.15s; }
        .news-card-modern:nth-child(4) { animation-delay: 0.2s; }
        .news-card-modern:nth-child(5) { animation-delay: 0.25s; }
        .news-card-modern:nth-child(6) { animation-delay: 0.3s; }
        .announcement-card-modern:nth-child(1) { animation-delay: 0.1s; }
        .announcement-card-modern:nth-child(2) { animation-delay: 0.15s; }
        .announcement-card-modern:nth-child(3) { animation-delay: 0.2s; }
        .announcement-card-modern:nth-child(4) { animation-delay: 0.25s; }
        .announcement-card-modern:nth-child(5) { animation-delay: 0.3s; }
        .announcement-card-modern:nth-child(6) { animation-delay: 0.35s; }
      `}</style>
    </>
  );
};

export default Home;