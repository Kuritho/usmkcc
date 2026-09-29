// src/components/StudentNews.js - News & Announcements for Students (Only Student-Related Content)
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Spinner, Alert, Form, InputGroup, Button, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getNews, getAnnouncements } from '../supabase/services';

const StudentNews = () => {
  const [loading, setLoading] = useState(true);
  const [allNews, setAllNews] = useState([]);
  const [allAnnouncements, setAllAnnouncements] = useState([]);
  const [news, setNews] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [newsResult, announcementsResult] = await Promise.all([
        getNews(),
        getAnnouncements()
      ]);

      if (newsResult.success) {
        // Filter: Only show news that are marked for students
        const studentNews = newsResult.data.filter(item => 
          item.showOnStudentNews === true
        );
        setAllNews(studentNews);
        setNews(studentNews);
        setFilteredNews(studentNews);
      } else {
        setError('Failed to load news');
      }

      if (announcementsResult.success) {
        // Filter: Only show announcements that are marked for students
        const studentAnnouncements = announcementsResult.data.filter(item => 
          item.showOnStudentNews === true
        );
        setAllAnnouncements(studentAnnouncements);
        setAnnouncements(studentAnnouncements);
        setFilteredAnnouncements(studentAnnouncements);
      } else {
        setError('Failed to load announcements');
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setError('An error occurred while loading data.');
    } finally {
      setLoading(false);
    }
  };

  // Filter data based on search and tab
  useEffect(() => {
    let filteredNewsData = news;
    let filteredAnnouncementsData = announcements;

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredNewsData = filteredNewsData.filter(item =>
        item.title?.toLowerCase().includes(term) ||
        item.content?.toLowerCase().includes(term) ||
        item.category?.toLowerCase().includes(term)
      );
      filteredAnnouncementsData = filteredAnnouncementsData.filter(item =>
        item.title?.toLowerCase().includes(term) ||
        item.content?.toLowerCase().includes(term)
      );
    }

    // Tab filter
    if (activeTab === 'news') {
      setFilteredNews(filteredNewsData);
      setFilteredAnnouncements([]);
    } else if (activeTab === 'announcements') {
      setFilteredNews([]);
      setFilteredAnnouncements(filteredAnnouncementsData);
    } else {
      setFilteredNews(filteredNewsData);
      setFilteredAnnouncements(filteredAnnouncementsData);
    }

    setCurrentPage(1);
  }, [searchTerm, activeTab, news, announcements]);

  // Pagination
  const totalItems = filteredNews.length + filteredAnnouncements.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Combine and paginate
  const combinedItems = [
    ...filteredNews.map(item => ({ ...item, type: 'news' })),
    ...filteredAnnouncements.map(item => ({ ...item, type: 'announcement' }))
  ].sort((a, b) => new Date(b.created_at || b.date) - new Date(a.created_at || a.date));

  const currentItems = combinedItems.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getImageSrc = (item) => {
    if (item.images && Array.isArray(item.images) && item.images.length > 0) {
      return item.images[0];
    }
    return item.image_url || (item.type === 'news' ? '/images/news-default.jpg' : '/images/announcement-default.jpg');
  };

  const getItemLink = (item) => {
    return item.type === 'news' ? `/news/${item.id}` : `/announcement/${item.id}`;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="text-center">
          <Spinner animation="border" variant="success" style={{ width: '3rem', height: '3rem' }} />
          <p className="mt-3 text-muted">Loading student news and announcements...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      backgroundColor: '#f8f9fa', 
      minHeight: '100vh',
      padding: '3rem 0'
    }}>
      <Container>
        {/* Page Header */}
        <Row className="mb-5">
          <Col>
            <div className="text-center">
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '80px',
                height: '80px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #00482D, #006641)',
                marginBottom: '1.5rem',
                boxShadow: '0 8px 30px rgba(0,72,45,0.25)'
              }}>
                <i className="fas fa-graduation-cap" style={{ fontSize: '2.5rem', color: '#FFD326' }}></i>
              </div>
              <h1 className="display-4 fw-bold" style={{ color: '#00482D' }}>
                Student News & Announcements
              </h1>
              <p className="text-muted" style={{ fontSize: '1.2rem' }}>
                Stay updated with the latest news and announcements for students
              </p>
              <div className="d-flex justify-content-center gap-3 mt-3 flex-wrap">
                <Link to="/">
                  <Button variant="outline-secondary" className="rounded-pill px-4">
                    <i className="fas fa-arrow-left me-2"></i>
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </Col>
        </Row>

        {/* Error Alert */}
        {error && (
          <Alert variant="danger" className="mb-4" dismissible onClose={() => setError('')}>
            <i className="fas fa-exclamation-circle me-2"></i>
            {error}
          </Alert>
        )}

        {/* No Student Content Message */}
        {news.length === 0 && announcements.length === 0 && !error && (
          <Alert variant="info" className="mb-4 text-center">
            <i className="fas fa-info-circle me-2"></i>
            No student-related news or announcements available at the moment.
            <br />
            <small className="text-muted">Check back later for updates.</small>
          </Alert>
        )}

        {/* Search and Filter - Only show if there's content */}
        {(news.length > 0 || announcements.length > 0) && (
          <Row className="mb-4">
            <Col lg={8} className="mx-auto">
              <Card className="border-0 shadow-sm" style={{ borderRadius: '16px' }}>
                <Card.Body className="p-4">
                  <Row className="g-3">
                    <Col md={7}>
                      <InputGroup>
                        <InputGroup.Text style={{ 
                          backgroundColor: '#f8f9fa', 
                          border: 'none',
                          borderRadius: '50px 0 0 50px'
                        }}>
                          <i className="fas fa-search text-muted"></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          placeholder="Search student news and announcements..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          style={{
                            border: 'none',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '0 50px 50px 0'
                          }}
                        />
                        {searchTerm && (
                          <Button
                            variant="link"
                            className="text-muted"
                            style={{ textDecoration: 'none', position: 'absolute', right: '15px', zIndex: 5 }}
                            onClick={() => setSearchTerm('')}
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        )}
                      </InputGroup>
                    </Col>
                    <Col md={5}>
                      <div className="d-flex gap-2 flex-wrap">
                        <Button
                          variant={activeTab === 'all' ? 'usmkc-green' : 'outline-secondary'}
                          className="rounded-pill px-3"
                          onClick={() => setActiveTab('all')}
                          style={{ 
                            backgroundColor: activeTab === 'all' ? '#00482D' : 'transparent',
                            borderColor: activeTab === 'all' ? '#00482D' : '#6c757d',
                            color: activeTab === 'all' ? '#fff' : '#6c757d',
                            fontWeight: '500'
                          }}
                        >
                          All ({news.length + announcements.length})
                        </Button>
                        <Button
                          variant={activeTab === 'news' ? 'usmkc-green' : 'outline-secondary'}
                          className="rounded-pill px-3"
                          onClick={() => setActiveTab('news')}
                          style={{ 
                            backgroundColor: activeTab === 'news' ? '#00482D' : 'transparent',
                            borderColor: activeTab === 'news' ? '#00482D' : '#6c757d',
                            color: activeTab === 'news' ? '#fff' : '#6c757d',
                            fontWeight: '500'
                          }}
                        >
                          <i className="fas fa-newspaper me-1"></i> News ({news.length})
                        </Button>
                        <Button
                          variant={activeTab === 'announcements' ? 'usmkc-green' : 'outline-secondary'}
                          className="rounded-pill px-3"
                          onClick={() => setActiveTab('announcements')}
                          style={{ 
                            backgroundColor: activeTab === 'announcements' ? '#00482D' : 'transparent',
                            borderColor: activeTab === 'announcements' ? '#00482D' : '#6c757d',
                            color: activeTab === 'announcements' ? '#fff' : '#6c757d',
                            fontWeight: '500'
                          }}
                        >
                          <i className="fas fa-bullhorn me-1"></i> Announcements ({announcements.length})
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Results Count */}
        {totalItems > 0 && (
          <div className="text-center mb-4">
            <small className="text-muted">
              Showing {currentItems.length} of {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </small>
          </div>
        )}

        {/* News & Announcements Grid */}
        {currentItems.length > 0 ? (
          <Row className="g-4">
            {currentItems.map((item) => (
              <Col key={item.id} md={6} lg={4}>
                <Card 
                  className="h-100 shadow-sm hover-card border-0"
                  style={{ 
                    borderRadius: '16px',
                    overflow: 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.06)';
                  }}
                  onClick={() => window.location.href = getItemLink(item)}
                >
                  <div style={{
                    height: '200px',
                    backgroundColor: '#f0f0f0',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <img 
                      src={getImageSrc(item)} 
                      alt={item.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = item.type === 'news' ? '/images/news-default.jpg' : '/images/announcement-default.jpg';
                      }}
                    />
                    <Badge 
                      bg={item.type === 'news' ? 'primary' : 'warning'}
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                    >
                      {item.type === 'news' ? 'News' : 'Announcement'}
                    </Badge>
                    {item.type === 'announcement' && item.priority === 'high' && (
                      <Badge 
                        bg="danger"
                        style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          padding: '6px 14px',
                          borderRadius: '20px',
                          fontSize: '0.7rem',
                          fontWeight: '600',
                          animation: 'pulse 2s infinite'
                        }}
                      >
                        <i className="fas fa-exclamation-circle me-1"></i>
                        Urgent
                      </Badge>
                    )}
                    {/* Student Badge */}
                    <Badge 
                      bg="info"
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        left: '12px',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.65rem',
                        fontWeight: '600'
                      }}
                    >
                      <i className="fas fa-graduation-cap me-1"></i>
                      Student
                    </Badge>
                  </div>
                  <Card.Body className="p-4">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title fw-bold" style={{ color: '#00482D', fontSize: '1.1rem' }}>
                        {item.title}
                      </h5>
                    </div>
                    <p className="card-text text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                      {item.summary || item.content?.substring(0, 150) || ''}
                      {item.content?.length > 150 && '...'}
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-3 pt-3" style={{ borderTop: '1px solid #f0f0f0' }}>
                      <small className="text-muted">
                        <i className="far fa-calendar-alt me-1"></i>
                        {formatDate(item.created_at || item.date)}
                      </small>
                      <Badge 
                        bg="light" 
                        className="text-usmkc-green"
                        style={{ fontWeight: '500' }}
                      >
                        {item.category || 'General'}
                      </Badge>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : !loading && (news.length === 0 && announcements.length === 0) ? (
          <div className="text-center py-5">
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              backgroundColor: '#f8f9fa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              <i className="fas fa-graduation-cap" style={{ fontSize: '3rem', color: '#dee2e6' }}></i>
            </div>
            <h5 className="text-muted">No student content available</h5>
            <p className="text-muted small">
              There are currently no news or announcements specifically for students.
            </p>
            <Link to="/">
              <Button variant="outline-primary" className="rounded-pill mt-2">
                <i className="fas fa-home me-1"></i> Return to Home
              </Button>
            </Link>
          </div>
        ) : searchTerm && currentItems.length === 0 ? (
          <div className="text-center py-5">
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              backgroundColor: '#f8f9fa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              <i className="fas fa-search" style={{ fontSize: '3rem', color: '#dee2e6' }}></i>
            </div>
            <h5 className="text-muted">No results found</h5>
            <p className="text-muted small">
              Try adjusting your search terms or clear the search.
            </p>
            <Button 
              variant="outline-secondary" 
              className="rounded-pill"
              onClick={() => {
                setSearchTerm('');
                setActiveTab('all');
              }}
            >
              <i className="fas fa-undo me-1"></i> Reset Filters
            </Button>
          </div>
        ) : null}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <Pagination>
              <Pagination.Prev 
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              />
              {[...Array(totalPages)].map((_, idx) => (
                <Pagination.Item
                  key={idx + 1}
                  active={idx + 1 === currentPage}
                  onClick={() => handlePageChange(idx + 1)}
                  style={{
                    backgroundColor: idx + 1 === currentPage ? '#00482D' : 'transparent',
                    borderColor: idx + 1 === currentPage ? '#00482D' : '#dee2e6'
                  }}
                >
                  {idx + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        )}

        {/* Footer Note */}
        <Row className="mt-5">
          <Col>
            <Card className="border-0 shadow-sm" style={{ borderRadius: '16px', background: 'linear-gradient(135deg, #f0faf0, #f8f9fa)' }}>
              <Card.Body className="p-4 text-center">
                <i className="fas fa-info-circle me-2" style={{ color: '#00482D' }}></i>
                <span className="text-muted">
                  For questions or concerns, please contact the 
                  <strong style={{ color: '#00482D' }}> Office of Student Affairs</strong>
                </span>
                <div className="mt-2">
                  <Badge bg="light" className="text-muted me-2">📧 osa@usmkcc.edu.ph</Badge>
                  <Badge bg="light" className="text-muted">📞 (064) 572-2138</Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <style>{`
        .hover-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hover-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.12) !important;
        }
        .btn-usmkc-green {
          background-color: #00482D !important;
          border-color: #00482D !important;
          color: #fff !important;
        }
        .btn-usmkc-green:hover {
          background-color: #002b1c !important;
          border-color: #002b1c !important;
        }
        .text-usmkc-green {
          color: #00482D !important;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @media (max-width: 768px) {
          .display-4 {
            font-size: 2.2rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default StudentNews;