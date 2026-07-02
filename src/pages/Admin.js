import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Tab, Nav, Form, Alert, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createNews, createEvent, createAnnouncement } from '../firebase/services';
import { sdgGoals } from '../components/SDGHub';
import Select from 'react-select';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // SDG options for react-select
  const sdgOptions = sdgGoals.map(goal => ({
    value: goal.id,
    label: `SDG ${goal.id}: ${goal.title}`,
    color: goal.color
  }));

  // Check authentication on component mount
  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuthenticated');
    if (adminAuth === 'true') {
      setIsAuthenticated(true);
    } else {
      navigate('/');
    }
  }, [navigate]);

  // Form states
  const [newsForm, setNewsForm] = useState({
    title: '',
    category: '',
    content: '',
    summary: '',
    sdgTags: []
  });

  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    priority: 'normal',
    content: ''
  });

  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    sdgTags: []
  });

  const handleNewsSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setUploadError('');
  
  try {
    // Validate required fields
    if (!newsForm.title || !newsForm.content) {
      throw new Error('Title and content are required');
    }

    const newsData = {
      ...newsForm,
      date: new Date().toISOString().split('T')[0],
      type: 'news'
    };
    
    console.log('Submitting news:', newsData);
    const result = await createNews(newsData, newsForm.image);
    
    if (result.success) {
      setUploadSuccess('News article uploaded successfully!');
      setNewsForm({ title: '', category: '', content: '', summary: '', sdgTags: [], image: null });
      document.getElementById('news-image').value = '';
    } else {
      setUploadError(`Failed to upload news: ${result.error || 'Please try again.'}`);
    }
  } catch (error) {
    console.error('Submission error:', error);
    setUploadError('An error occurred: ' + error.message);
  } finally {
    setLoading(false);
    setTimeout(() => setUploadSuccess(''), 5000);
  }
};

  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUploadError('');
    
    try {
      const announcementData = {
        ...announcementForm,
        date: new Date().toISOString().split('T')[0],
        type: 'announcement'
      };
      
      const result = await createAnnouncement(announcementData);
      
      if (result.success) {
        setUploadSuccess('Announcement published successfully!');
        setAnnouncementForm({ title: '', priority: 'normal', content: '' });
      } else {
        setUploadError('Failed to publish announcement. Please try again.');
      }
    } catch (error) {
      setUploadError('An error occurred: ' + error.message);
    } finally {
      setLoading(false);
      setTimeout(() => setUploadSuccess(''), 3000);
    }
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUploadError('');
    
    try {
      const eventData = {
        ...eventForm,
        type: 'event'
      };
      
      const result = await createEvent(eventData, eventForm.image);
      
      if (result.success) {
        setUploadSuccess('Event created successfully!');
        setEventForm({ title: '', date: '', time: '', location: '', description: '', sdgTags: [], image: null });
        document.getElementById('event-image').value = '';
      } else {
        setUploadError('Failed to create event. Please try again.');
      }
    } catch (error) {
      setUploadError('An error occurred: ' + error.message);
    } finally {
      setLoading(false);
      setTimeout(() => setUploadSuccess(''), 3000);
    }
  };

  const handleFileChange = (e, formType) => {
    const file = e.target.files[0];
    if (formType === 'news') {
      setNewsForm({ ...newsForm, image: file });
    } else if (formType === 'event') {
      setEventForm({ ...eventForm, image: file });
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  const customSelectStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? state.data.color : state.isFocused ? state.data.color + '20' : 'white',
      color: state.isSelected ? 'white' : 'black',
      ':hover': {
        backgroundColor: state.data.color + '40',
      }
    }),
    multiValue: (provided, state) => ({
      ...provided,
      backgroundColor: state.data.color,
      color: 'white'
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'white'
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: 'white',
      ':hover': {
        backgroundColor: 'rgba(255,255,255,0.3)',
        color: 'white'
      }
    })
  };

  return (
    <div style={{ 
      backgroundColor: '#f4f6f9', 
      minHeight: '100vh',
      padding: '2rem 0'
    }}>
      <Container fluid style={{ maxWidth: '1400px' }}>
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <div style={{ 
              backgroundColor: '#00482D',
              color: '#ffffff',
              padding: '1.5rem 2rem',
              borderRadius: '10px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <i className="fas fa-cog" style={{ color: '#FFD326' }}></i>
                USM KCC Admin Dashboard
              </h2>
              <p style={{ margin: '0.5rem 0 0 0', opacity: '0.9' }}>
                Welcome back! Manage and upload content to the USM KCC website.
              </p>
            </div>
          </Col>
        </Row>

        {/* Success/Error Messages */}
        {uploadSuccess && (
          <Alert variant="success" className="mb-4" onClose={() => setUploadSuccess('')} dismissible>
            <i className="fas fa-check-circle me-2"></i>
            {uploadSuccess}
          </Alert>
        )}
        {uploadError && (
          <Alert variant="danger" className="mb-4" onClose={() => setUploadError('')} dismissible>
            <i className="fas fa-exclamation-circle me-2"></i>
            {uploadError}
          </Alert>
        )}

        {/* Main Content */}
        <Row>
          {/* Sidebar */}
          <Col lg={3} className="mb-4">
            <Card style={{ 
              border: 'none',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <Card.Body style={{ padding: '1.5rem' }}>
                <div className="text-center mb-4">
                  <div style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#00482D',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem'
                  }}>
                    <i className="fas fa-user-shield" style={{ fontSize: '2.5rem', color: '#FFD326' }}></i>
                  </div>
                  <h5 style={{ color: '#00482D', fontWeight: '600' }}>Administrator</h5>
                  <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>USM KCC</p>
                </div>

                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link 
                      eventKey="dashboard" 
                      active={activeTab === 'dashboard'}
                      onClick={() => setActiveTab('dashboard')}
                      style={{
                        color: activeTab === 'dashboard' ? '#FFD326' : '#00482D',
                        backgroundColor: activeTab === 'dashboard' ? '#00482D' : 'transparent',
                        marginBottom: '0.5rem',
                        borderRadius: '8px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      <i className="fas fa-tachometer-alt me-2"></i>
                      Dashboard
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      eventKey="news" 
                      active={activeTab === 'news'}
                      onClick={() => setActiveTab('news')}
                      style={{
                        color: activeTab === 'news' ? '#FFD326' : '#00482D',
                        backgroundColor: activeTab === 'news' ? '#00482D' : 'transparent',
                        marginBottom: '0.5rem',
                        borderRadius: '8px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      <i className="fas fa-newspaper me-2"></i>
                      Upload News
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      eventKey="announcements" 
                      active={activeTab === 'announcements'}
                      onClick={() => setActiveTab('announcements')}
                      style={{
                        color: activeTab === 'announcements' ? '#FFD326' : '#00482D',
                        backgroundColor: activeTab === 'announcements' ? '#00482D' : 'transparent',
                        marginBottom: '0.5rem',
                        borderRadius: '8px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      <i className="fas fa-bullhorn me-2"></i>
                      Announcements
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      eventKey="events" 
                      active={activeTab === 'events'}
                      onClick={() => setActiveTab('events')}
                      style={{
                        color: activeTab === 'events' ? '#FFD326' : '#00482D',
                        backgroundColor: activeTab === 'events' ? '#00482D' : 'transparent',
                        marginBottom: '0.5rem',
                        borderRadius: '8px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      <i className="fas fa-calendar-alt me-2"></i>
                      Events
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <hr className="my-3" />

                <Button 
                  variant="outline-danger" 
                  className="w-100"
                  onClick={() => {
                    localStorage.removeItem('adminAuthenticated');
                    navigate('/');
                  }}
                  style={{
                    borderColor: '#dc3545',
                    color: '#dc3545',
                    fontWeight: '500'
                  }}
                >
                  <i className="fas fa-sign-out-alt me-2"></i>
                  Logout
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Main Content Area */}
          <Col lg={9}>
            <Card style={{ 
              border: 'none',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              minHeight: '600px'
            }}>
              <Card.Body style={{ padding: '2rem' }}>
                {/* Dashboard Tab */}
                {activeTab === 'dashboard' && (
                  <div>
                    <h4 style={{ color: '#00482D', marginBottom: '1.5rem' }}>
                      <i className="fas fa-tachometer-alt me-2"></i>
                      Dashboard Overview
                    </h4>
                    <Row>
                      <Col md={6} lg={3} className="mb-3">
                        <Card style={{ backgroundColor: '#00482D', color: '#ffffff' }}>
                          <Card.Body className="text-center">
                            <i className="fas fa-newspaper" style={{ fontSize: '2rem', color: '#FFD326' }}></i>
                            <h3 className="mt-2">0</h3>
                            <p className="mb-0">News Articles</p>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={6} lg={3} className="mb-3">
                        <Card style={{ backgroundColor: '#1a3d7c', color: '#ffffff' }}>
                          <Card.Body className="text-center">
                            <i className="fas fa-bullhorn" style={{ fontSize: '2rem', color: '#FFD326' }}></i>
                            <h3 className="mt-2">0</h3>
                            <p className="mb-0">Announcements</p>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={6} lg={3} className="mb-3">
                        <Card style={{ backgroundColor: '#28a745', color: '#ffffff' }}>
                          <Card.Body className="text-center">
                            <i className="fas fa-calendar-alt" style={{ fontSize: '2rem', color: '#FFD326' }}></i>
                            <h3 className="mt-2">0</h3>
                            <p className="mb-0">Upcoming Events</p>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                )}

                {/* News Upload Tab */}
                {activeTab === 'news' && (
                  <div>
                    <h4 style={{ color: '#00482D', marginBottom: '1.5rem' }}>
                      <i className="fas fa-newspaper me-2"></i>
                      Upload News Article
                    </h4>
                    <Form onSubmit={handleNewsSubmit}>
                      <Row>
                        <Col md={8}>
                          <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter news title"
                              value={newsForm.title}
                              onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                              value={newsForm.category}
                              onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                              required
                            >
                              <option value="">Select category</option>
                              <option value="academic">Academic</option>
                              <option value="campus">Campus News</option>
                              <option value="research">Research</option>
                              <option value="student">Student Affairs</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Label>Summary/Excerpt</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          placeholder="Brief summary of the news article"
                          value={newsForm.summary}
                          onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>SDG Tags</Form.Label>
                        <Select
                          isMulti
                          options={sdgOptions}
                          value={sdgOptions.filter(option => newsForm.sdgTags.includes(option.value))}
                          onChange={(selected) => setNewsForm({ 
                            ...newsForm, 
                            sdgTags: selected.map(s => s.value) 
                          })}
                          styles={customSelectStyles}
                          placeholder="Select SDG tags..."
                        />
                        <Form.Text className="text-muted">
                          Select all SDGs that this news article relates to
                        </Form.Text>
                      </Form.Group>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Featured Image</Form.Label>
                            <Form.Control
                              id="news-image"
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileChange(e, 'news')}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={8}
                          placeholder="Write your news article here..."
                          value={newsForm.content}
                          onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                          required
                        />
                      </Form.Group>

                      <div className="d-flex gap-2">
                        <Button 
                          type="submit" 
                          style={{ backgroundColor: '#00482D', color: '#FFD326', border: 'none' }}
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Uploading...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-upload me-2"></i>
                              Publish News
                            </>
                          )}
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline-secondary" 
                          onClick={() => setNewsForm({ title: '', category: '', content: '', summary: '', sdgTags: [], image: null })}
                          disabled={loading}
                        >
                          Clear Form
                        </Button>
                      </div>
                    </Form>
                  </div>
                )}

                {/* Events Upload Tab */}
                {activeTab === 'events' && (
                  <div>
                    <h4 style={{ color: '#00482D', marginBottom: '1.5rem' }}>
                      <i className="fas fa-calendar-alt me-2"></i>
                      Create Event
                    </h4>
                    <Form onSubmit={handleEventSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label>Event Title</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter event title"
                          value={eventForm.title}
                          onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                          required
                        />
                      </Form.Group>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                              type="date"
                              value={eventForm.date}
                              onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Time</Form.Label>
                            <Form.Control
                              type="time"
                              value={eventForm.time}
                              onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter event location"
                          value={eventForm.location}
                          onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>SDG Tags</Form.Label>
                        <Select
                          isMulti
                          options={sdgOptions}
                          value={sdgOptions.filter(option => eventForm.sdgTags.includes(option.value))}
                          onChange={(selected) => setEventForm({ 
                            ...eventForm, 
                            sdgTags: selected.map(s => s.value) 
                          })}
                          styles={customSelectStyles}
                          placeholder="Select SDG tags..."
                        />
                        <Form.Text className="text-muted">
                          Select all SDGs that this event relates to
                        </Form.Text>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Event Image</Form.Label>
                        <Form.Control
                          id="event-image"
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, 'event')}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          placeholder="Describe the event..."
                          value={eventForm.description}
                          onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                          required
                        />
                      </Form.Group>

                      <div className="d-flex gap-2">
                        <Button 
                          type="submit" 
                          style={{ backgroundColor: '#00482D', color: '#FFD326', border: 'none' }}
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Creating...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-plus-circle me-2"></i>
                              Create Event
                            </>
                          )}
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline-secondary" 
                          onClick={() => setEventForm({ title: '', date: '', time: '', location: '', description: '', sdgTags: [], image: null })}
                          disabled={loading}
                        >
                          Clear Form
                        </Button>
                      </div>
                    </Form>
                  </div>
                )}

                {/* Announcements Tab */}
                {activeTab === 'announcements' && (
                  <div>
                    <h4 style={{ color: '#00482D', marginBottom: '1.5rem' }}>
                      <i className="fas fa-bullhorn me-2"></i>
                      Create Announcement
                    </h4>
                    <Form onSubmit={handleAnnouncementSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter announcement title"
                          value={announcementForm.title}
                          onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Priority</Form.Label>
                        <Form.Select
                          value={announcementForm.priority}
                          onChange={(e) => setAnnouncementForm({ ...announcementForm, priority: e.target.value })}
                          required
                        >
                          <option value="normal">Normal</option>
                          <option value="high">High Priority</option>
                          <option value="urgent">Urgent</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          placeholder="Write your announcement here..."
                          value={announcementForm.content}
                          onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
                          required
                        />
                      </Form.Group>

                      <div className="d-flex gap-2">
                        <Button 
                          type="submit" 
                          style={{ backgroundColor: '#00482D', color: '#FFD326', border: 'none' }}
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Publishing...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-paper-plane me-2"></i>
                              Publish Announcement
                            </>
                          )}
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline-secondary" 
                          onClick={() => setAnnouncementForm({ title: '', priority: 'normal', content: '' })}
                          disabled={loading}
                        >
                          Clear Form
                        </Button>
                      </div>
                    </Form>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Admin;