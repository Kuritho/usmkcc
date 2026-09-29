// src/components/CampusUpdates.js - Complete Updated with Full Image Display
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Badge, Nav, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getNews, getAnnouncements } from '../supabase/services';
import SDGTags from './SDGTags';
import './CampusUpdates.css';

const CampusUpdates = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    try {
      const [newsResult, announcementsResult] = await Promise.all([
        getNews(),
        getAnnouncements()
      ]);
      
      if (newsResult.success) {
        setNews(newsResult.data);
      }
      
      if (announcementsResult.success) {
        setAnnouncements(announcementsResult.data);
      }
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = (item, type) => {
    navigate(`/${type}/${item.id}`, { state: { item } });
  };

  const getImageUrl = (item) => {
    if (item.image_url) return item.image_url;
    if (item.type === 'announcement') return '/images/announcement-default.jpg';
    return '/images/news-default.jpg';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getPriorityBadge = (priority) => {
    const variants = {
      urgent: { variant: 'danger', icon: 'fa-exclamation-circle' },
      high: { variant: 'warning', icon: 'fa-arrow-up' },
      normal: { variant: 'info', icon: 'fa-circle' }
    };
    const config = variants[priority] || variants.normal;
    return (
      <Badge bg={config.variant} className="px-3 py-2 rounded-pill">
        <i className={`fas ${config.icon} me-1`}></i>
        {priority?.toUpperCase() || 'NORMAL'}
      </Badge>
    );
  };

  // Get all items for combined view
  const getAllItems = () => {
    const allItems = [
      ...news.map(item => ({ ...item, type: 'news' })),
      ...announcements.map(item => ({ ...item, type: 'announcement' }))
    ];
    return allItems.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  };

  const getFilteredItems = () => {
    if (activeTab === 'all') return getAllItems();
    if (activeTab === 'news') return news.map(item => ({ ...item, type: 'news' }));
    if (activeTab === 'announcements') return announcements.map(item => ({ ...item, type: 'announcement' }));
    return getAllItems();
  };

  const handleFacebookShare = (item, e) => {
    e.stopPropagation();
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${window.location.origin}/${item.type}/${item.id}`)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  if (loading) {
    return (
      <div className="campus-updates-loading">
        <Container className="py-5 text-center">
          <div className="loading-spinner-wrapper">
            <Spinner animation="border" variant="success" className="loading-spinner" />
            <p className="mt-4 text-muted">Loading campus updates...</p>
          </div>
        </Container>
      </div>
    );
  }

  const filteredItems = getFilteredItems();

  return (
    <div className="campus-updates-page">
      {/* Hero Header */}
      <section className="updates-hero">
        <Container>
          <Row className="align-items-center">
            <Col lg={8} className="mx-auto text-center">
              <Badge bg="light" text="dark" className="px-4 py-2 mb-3 rounded-pill">
                <i className="fas fa-bullhorn me-2"></i>
                Stay Informed
              </Badge>
              <h1 className="display-3 fw-bold text-white mb-3">
                Campus Updates
              </h1>
              <p className="lead text-white-50 mb-0">
                Latest news and announcements from the University of Southern Mindanao - Kidapawan City Campus
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Filter Tabs */}
      <section className="filter-section">
        <Container>
          <Row>
            <Col>
              <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                <Nav variant="pills" className="justify-content-center mb-4 gap-2">
                  <Nav.Item>
                    <Nav.Link 
                      eventKey="all" 
                      className="filter-tab"
                    >
                      <i className="fas fa-th-list me-2"></i>
                      All Updates
                      <Badge bg="secondary" className="ms-2">
                        {getAllItems().length}
                      </Badge>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      eventKey="news" 
                      className="filter-tab"
                    >
                      <i className="fas fa-newspaper me-2"></i>
                      News
                      <Badge bg="secondary" className="ms-2">
                        {news.length}
                      </Badge>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      eventKey="announcements" 
                      className="filter-tab"
                    >
                      <i className="fas fa-bullhorn me-2"></i>
                      Announcements
                      <Badge bg="secondary" className="ms-2">
                        {announcements.length}
                      </Badge>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Tab.Container>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Content Grid */}
      <section className="updates-content py-4">
        <Container>
          {filteredItems.length > 0 ? (
            <Row className="g-4">
              {filteredItems.map((item) => (
                <Col key={item.id} lg={6} xl={4}>
                  <Card 
                    className="update-card h-100 border-0 shadow-sm"
                    onClick={() => handleItemClick(item, item.type)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Image Section - FULL IMAGE DISPLAY */}
                    <div className="update-card-image-wrapper" style={{ 
                      position: 'relative',
                      backgroundColor: '#f8f9fa',
                      minHeight: '250px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      padding: '10px'
                    }}>
                      <img 
                        src={getImageUrl(item)} 
                        alt={item.title}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '250px',
                          width: 'auto',
                          height: 'auto',
                          objectFit: 'contain',
                          display: 'block'
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/news-default.jpg';
                          e.target.style.objectFit = 'contain';
                        }}
                      />
                      <div className="update-card-badge" style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        zIndex: 1
                      }}>
                        {item.type === 'announcement' ? (
                          getPriorityBadge(item.priority)
                        ) : (
                          <Badge bg="success" className="px-3 py-2 rounded-pill">
                            <i className="fas fa-newspaper me-1"></i>
                            NEWS
                          </Badge>
                        )}
                      </div>
                      <div className="update-card-date" style={{
                        position: 'absolute',
                        bottom: '12px',
                        right: '12px',
                        zIndex: 1,
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        padding: '5px 12px',
                        borderRadius: '20px',
                        fontSize: '0.85rem'
                      }}>
                        <i className="far fa-calendar-alt me-1"></i>
                        {formatDate(item.created_at || item.date)}
                      </div>
                    </div>

                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="update-card-title">
                        {item.title}
                      </Card.Title>
                      
                      <Card.Text className="update-card-excerpt text-muted">
                        {item.content?.substring(0, 120)}...
                      </Card.Text>

                      {/* SDG Tags for News */}
                      {item.type === 'news' && item.sdg_tags && item.sdg_tags.length > 0 && (
                        <div className="update-card-tags mt-2">
                          <SDGTags sdgIds={item.sdg_tags} />
                        </div>
                      )}

                      <div className="update-card-footer mt-3 d-flex justify-content-between align-items-center">
                        <Button 
                          variant="link" 
                          className="update-card-link p-0 text-decoration-none"
                        >
                          Read More <i className="fas fa-arrow-right ms-1"></i>
                        </Button>
                        
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="rounded-pill"
                          onClick={(e) => handleFacebookShare(item, e)}
                        >
                          <i className="fab fa-facebook-f me-1"></i>
                          Share
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <div className="empty-state text-center py-5">
              <i className="fas fa-inbox display-1 text-muted mb-3"></i>
              <h4 className="text-muted">No updates available</h4>
              <p className="text-muted">Check back later for new content.</p>
            </div>
          )}

          {/* Load More / Refresh */}
          {filteredItems.length > 0 && (
            <div className="text-center mt-5">
              <Button 
                variant="outline-primary" 
                className="refresh-button px-5 py-3 rounded-pill"
                onClick={loadContent}
              >
                <i className="fas fa-sync-alt me-2"></i>
                Refresh Updates
              </Button>
            </div>
          )}
        </Container>
      </section>

      {/* Quick Stats Footer */}
      <section className="updates-stats py-4 mt-4">
        <Container>
          <Row className="text-center g-3">
            <Col md={4}>
              <div className="stat-item">
                <h3 className="text-white mb-0">{news.length}</h3>
                <p className="text-white-50 mb-0">News Articles</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="stat-item">
                <h3 className="text-white mb-0">{announcements.length}</h3>
                <p className="text-white-50 mb-0">Announcements</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="stat-item">
                <h3 className="text-white mb-0">{getAllItems().length}</h3>
                <p className="text-white-50 mb-0">Total Updates</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default CampusUpdates;