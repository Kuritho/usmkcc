// src/components/OfficeDetails.js - Complete Modern Office Details
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner, Badge, ListGroup, Breadcrumb } from 'react-bootstrap';
import { getOfficeById } from '../supabase/services';

const OfficeDetails = () => {
  const { officeId } = useParams();
  const navigate = useNavigate();
  const [office, setOffice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (officeId) {
      loadOfficeDetails();
    }
    // Scroll to top on load
    window.scrollTo(0, 0);
  }, [officeId]);

  const loadOfficeDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('🔍 Fetching office with ID:', officeId);
      const result = await getOfficeById(officeId);
      console.log('📊 Office result:', result);
      
      if (result.success && result.data) {
        setOffice(result.data);
      } else {
        setError(result.error || 'Office not found');
        console.error('Error loading office:', result.error);
      }
    } catch (error) {
      console.error('❌ Error loading office details:', error);
      setError('An error occurred while loading the office details.');
    } finally {
      setLoading(false);
    }
  };

  const getIconClass = (iconName) => {
    return iconName || 'bi-building';
  };

  // Helper to format staff name for display
  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  // Helper to get color based on position
  const getStaffColor = (position) => {
    const colors = {
      'Head': '#00482D',
      'Director': '#1a3d7c',
      'Coordinator': '#fd7e14',
      'Officer': '#6f42c1',
      'Staff': '#17a2b8'
    };
    for (const [key, color] of Object.entries(colors)) {
      if (position?.toLowerCase().includes(key.toLowerCase())) {
        return color;
      }
    }
    return '#00482D';
  };

  if (loading) {
    return (
      <div style={{
        backgroundColor: '#f8f9fa',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Container className="text-center py-5">
          <Spinner animation="border" variant="success" style={{ width: '3rem', height: '3rem' }} />
          <p className="mt-3 text-muted">Loading office details...</p>
        </Container>
      </div>
    );
  }

  if (error || !office) {
    return (
      <div style={{
        backgroundColor: '#f8f9fa',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Container className="py-5">
          <Row>
            <Col md={8} lg={6} className="mx-auto">
              <Card className="text-center shadow-sm border-0">
                <Card.Body className="py-5">
                  <div style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#fff3cd',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px'
                  }}>
                    <i className="fas fa-exclamation-triangle" style={{ fontSize: '2.5rem', color: '#ffc107' }}></i>
                  </div>
                  <h3 className="mb-3" style={{ color: '#00482D' }}>Office Not Found</h3>
                  <p className="text-muted">{error || 'The requested office could not be found.'}</p>
                  <p className="text-muted small">Office ID: {officeId}</p>
                  <Button 
                    variant="success" 
                    onClick={() => navigate('/offices')}
                    style={{ 
                      backgroundColor: '#00482D',
                      borderColor: '#00482D',
                      padding: '10px 30px'
                    }}
                  >
                    <i className="fas fa-arrow-left me-2"></i>
                    Back to Offices
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '70vh', padding: '30px 0' }}>
      <Container>
        {/* Breadcrumb Navigation */}
        <Breadcrumb className="mb-4" style={{ backgroundColor: 'transparent', padding: 0 }}>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }} style={{ color: '#00482D' }}>
            <i className="fas fa-home me-1"></i> Home
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/offices' }} style={{ color: '#00482D' }}>
            Offices
          </Breadcrumb.Item>
          <Breadcrumb.Item active style={{ color: '#6c757d' }}>
            {office.name}
          </Breadcrumb.Item>
        </Breadcrumb>

        <Row>
          <Col lg={10} className="mx-auto">
            {/* Main Card */}
            <Card className="shadow-sm border-0 overflow-hidden">
              {/* Header Section - Gradient Background */}
              <div style={{
                background: 'linear-gradient(135deg, #00482D 0%, #006b44 50%, #008a5a 100%)',
                padding: '2.5rem 2.5rem 2rem',
                color: '#fff',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Decorative Elements */}
                <div style={{
                  position: 'absolute',
                  right: '-50px',
                  top: '-50px',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  background: 'rgba(255, 211, 38, 0.05)',
                  pointerEvents: 'none'
                }}></div>
                <div style={{
                  position: 'absolute',
                  left: '-30px',
                  bottom: '-30px',
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  background: 'rgba(255, 211, 38, 0.03)',
                  pointerEvents: 'none'
                }}></div>

                <Row className="align-items-center">
                  <Col md={8}>
                    <div className="d-flex align-items-center">
                      {/* Icon Circle */}
                      <div style={{
                        width: '80px',
                        height: '80px',
                        backgroundColor: 'rgba(255, 211, 38, 0.2)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '20px',
                        fontSize: '2.5rem',
                        color: '#FFD326',
                        flexShrink: 0,
                        border: '2px solid rgba(255, 211, 38, 0.3)'
                      }}>
                        <i className={`bi ${getIconClass(office.icon)}`}></i>
                      </div>
                      <div>
                        <h1 className="mb-1" style={{ color: '#FFD326', fontSize: '2rem', fontWeight: '700' }}>
                          {office.name}
                        </h1>
                        {office.location && (
                          <p className="mb-0" style={{ opacity: 0.9, fontSize: '0.95rem' }}>
                            {/* <i className="fas fa-map-marker-alt me-2" style={{ color: '#FFD326' }}></i> */}
                            {/* {office.location} */}
                          </p>
                        )}
                      </div>
                    </div>
                  </Col>
                  <Col md={4} className="text-md-end mt-3 mt-md-0">
                    <div className="d-flex flex-wrap gap-2 justify-content-md-end">
                      <Badge 
                        bg="light" 
                        style={{ 
                          color: '#00482D', 
                          padding: '8px 16px',
                          fontSize: '0.8rem',
                          borderRadius: '20px'
                        }}
                      >
                        <i className="fas fa-building me-1"></i>
                        Office
                      </Badge>
                      {office.staff && office.staff.length > 0 && (
                        <Badge 
                          bg="warning" 
                          style={{ 
                            color: '#00482D', 
                            padding: '8px 16px',
                            fontSize: '0.8rem',
                            borderRadius: '20px'
                          }}
                        >
                          <i className="fas fa-users me-1"></i>
                          {office.staff.length} Personnel
                        </Badge>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>

              {/* Body Section */}
              <Card.Body style={{ padding: '2.5rem' }}>
                {/* Description */}
                {office.description && (
                  <div className="mb-4">
                    <h5 style={{ color: '#00482D', fontWeight: '600', marginBottom: '15px' }}>
                      <i className="fas fa-info-circle me-2" style={{ color: '#FFD326' }}></i>
                      About This Office
                    </h5>
                    <div style={{
                      fontSize: '1.05rem',
                      lineHeight: '1.8',
                      color: '#2d3748',
                      backgroundColor: '#f8f9fa',
                      padding: '20px 25px',
                      borderRadius: '12px',
                      borderLeft: '4px solid #FFD326'
                    }}>
                      {office.description}
                    </div>
                  </div>
                )}

                {/* Contact Information & Staff */}
                <Row className="g-4">
                  {/* Contact Information */}
                  {(office.contact || office.email || office.hours || office.location) && (
                    <Col lg={office.staff && office.staff.length > 0 ? 6 : 12}>
                      <Card className="border-0 h-100" style={{ backgroundColor: '#f8f9fa' }}>
                        <Card.Body>
                          <h6 style={{ 
                            color: '#00482D', 
                            fontWeight: '600', 
                            marginBottom: '1.2rem',
                            fontSize: '1rem',
                            borderBottom: '2px solid #FFD326',
                            paddingBottom: '10px'
                          }}>
                            <i className="fas fa-address-card me-2" style={{ color: '#FFD326' }}></i>
                            Contact Information
                          </h6>
                          <ListGroup variant="flush" style={{ backgroundColor: 'transparent' }}>
                            {office.contact && (
                              <ListGroup.Item style={{ 
                                backgroundColor: 'transparent', 
                                padding: '10px 0',
                                borderBottom: '1px solid rgba(0,0,0,0.05)'
                              }}>
                                <div className="d-flex align-items-start">
                                  <div style={{
                                    width: '32px',
                                    height: '32px',
                                    backgroundColor: 'rgba(0, 72, 45, 0.1)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: '12px',
                                    flexShrink: 0,
                                    color: '#00482D'
                                  }}>
                                    <i className="fas fa-phone" style={{ fontSize: '0.8rem' }}></i>
                                  </div>
                                  <div>
                                    <div style={{ fontSize: '0.75rem', color: '#6c757d', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                      Phone
                                    </div>
                                    <div style={{ fontWeight: '500', color: '#00482D' }}>
                                      {office.contact}
                                    </div>
                                  </div>
                                </div>
                              </ListGroup.Item>
                            )}
                            {office.email && (
                              <ListGroup.Item style={{ 
                                backgroundColor: 'transparent', 
                                padding: '10px 0',
                                borderBottom: '1px solid rgba(0,0,0,0.05)'
                              }}>
                                <div className="d-flex align-items-start">
                                  <div style={{
                                    width: '32px',
                                    height: '32px',
                                    backgroundColor: 'rgba(0, 72, 45, 0.1)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: '12px',
                                    flexShrink: 0,
                                    color: '#00482D'
                                  }}>
                                    <i className="fas fa-envelope" style={{ fontSize: '0.8rem' }}></i>
                                  </div>
                                  <div>
                                    <div style={{ fontSize: '0.75rem', color: '#6c757d', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                      Email
                                    </div>
                                    <div style={{ fontWeight: '500' }}>
                                      <a 
                                        href={`mailto:${office.email}`} 
                                        style={{ color: '#00482D', textDecoration: 'none' }}
                                        onMouseEnter={(e) => e.target.style.color = '#FFD326'}
                                        onMouseLeave={(e) => e.target.style.color = '#00482D'}
                                      >
                                        {office.email}
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </ListGroup.Item>
                            )}
                            {office.location && (
                              <ListGroup.Item style={{ 
                                backgroundColor: 'transparent', 
                                padding: '10px 0',
                                borderBottom: '1px solid rgba(0,0,0,0.05)'
                              }}>
                                <div className="d-flex align-items-start">
                                  <div style={{
                                    width: '32px',
                                    height: '32px',
                                    backgroundColor: 'rgba(0, 72, 45, 0.1)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: '12px',
                                    flexShrink: 0,
                                    color: '#00482D'
                                  }}>
                                    <i className="fas fa-map-marker-alt" style={{ fontSize: '0.8rem' }}></i>
                                  </div>
                                  <div>
                                    <div style={{ fontSize: '0.75rem', color: '#6c757d', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                      Location
                                    </div>
                                    <div style={{ fontWeight: '500', color: '#00482D' }}>
                                      {office.location}
                                    </div>
                                  </div>
                                </div>
                              </ListGroup.Item>
                            )}
                            {office.hours && (
                              <ListGroup.Item style={{ 
                                backgroundColor: 'transparent', 
                                padding: '10px 0'
                              }}>
                                <div className="d-flex align-items-start">
                                  <div style={{
                                    width: '32px',
                                    height: '32px',
                                    backgroundColor: 'rgba(0, 72, 45, 0.1)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: '12px',
                                    flexShrink: 0,
                                    color: '#00482D'
                                  }}>
                                    <i className="fas fa-clock" style={{ fontSize: '0.8rem' }}></i>
                                  </div>
                                  <div>
                                    <div style={{ fontSize: '0.75rem', color: '#6c757d', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                      Office Hours
                                    </div>
                                    <div style={{ fontWeight: '500', color: '#00482D' }}>
                                      {office.hours}
                                    </div>
                                  </div>
                                </div>
                              </ListGroup.Item>
                            )}
                          </ListGroup>
                        </Card.Body>
                      </Card>
                    </Col>
                  )}

                  {/* Staff Members */}
                  {office.staff && office.staff.length > 0 && (
                    <Col lg={6}>
                      <Card className="border-0 h-100" style={{ backgroundColor: '#f8f9fa' }}>
                        <Card.Body>
                          <h6 style={{ 
                            color: '#00482D', 
                            fontWeight: '600', 
                            marginBottom: '1.2rem',
                            fontSize: '1rem',
                            borderBottom: '2px solid #FFD326',
                            paddingBottom: '10px'
                          }}>
                            <i className="fas fa-users me-2" style={{ color: '#FFD326' }}></i>
                            Personnel
                            <Badge bg="secondary" style={{ marginLeft: '8px', fontSize: '0.7rem' }}>
                              {office.staff.length}
                            </Badge>
                          </h6>
                          <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                            {office.staff.map((person, index) => (
                              <div 
                                key={person.id || index} 
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  padding: '10px 12px',
                                  borderRadius: '10px',
                                  marginBottom: '8px',
                                  backgroundColor: '#ffffff',
                                  transition: 'all 0.2s ease',
                                  border: '1px solid transparent'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.borderColor = '#FFD326';
                                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.borderColor = 'transparent';
                                  e.currentTarget.style.boxShadow = 'none';
                                }}
                              >
                                {/* Avatar */}
                                <div style={{ position: 'relative', marginRight: '14px', flexShrink: 0 }}>
                                  <img 
                                    src={person.image_url || '/images/staff/placeholder.png'} 
                                    alt={person.name}
                                    style={{
                                      width: '48px',
                                      height: '48px',
                                      borderRadius: '50%',
                                      objectFit: 'cover',
                                      border: '2px solid #e9ecef'
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.style.display = 'none';
                                      e.target.parentElement.innerHTML = `
                                        <div style="
                                          width: 48px;
                                          height: 48px;
                                          borderRadius: 50%;
                                          background: ${getStaffColor(person.position)};
                                          display: flex;
                                          align-items: center;
                                          justify-content: center;
                                          color: #fff;
                                          font-weight: 600;
                                          font-size: 1.1rem;
                                        ">${getInitials(person.name)}</div>
                                      `;
                                    }}
                                  />
                                  {/* Status indicator */}
                                  <div style={{
                                    position: 'absolute',
                                    bottom: '2px',
                                    right: '2px',
                                    width: '12px',
                                    height: '12px',
                                    backgroundColor: '#28a745',
                                    borderRadius: '50%',
                                    border: '2px solid #fff'
                                  }}></div>
                                </div>
                                
                                {/* Staff Info */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ 
                                    fontWeight: '600', 
                                    color: '#00482D',
                                    fontSize: '0.95rem'
                                  }}>
                                    {person.name}
                                  </div>
                                  <div style={{ 
                                    fontSize: '0.8rem', 
                                    color: '#6c757d',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                  }}>
                                    <span style={{
                                      display: 'inline-block',
                                      width: '6px',
                                      height: '6px',
                                      borderRadius: '50%',
                                      backgroundColor: getStaffColor(person.position),
                                      flexShrink: 0
                                    }}></span>
                                    {person.position}
                                  </div>
                                </div>
                                
                                {/* Badge */}
                                <div style={{ flexShrink: 0 }}>
                                  <Badge 
                                    style={{ 
                                      backgroundColor: getStaffColor(person.position),
                                      color: '#fff',
                                      padding: '4px 10px',
                                      fontSize: '0.65rem',
                                      borderRadius: '12px'
                                    }}
                                  >
                                    {person.position?.split(' ').pop() || 'Staff'}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  )}
                </Row>

                {/* Action Buttons */}
                <div className="mt-5 pt-3 d-flex flex-wrap gap-3 justify-content-between align-items-center">
                  <Button 
                    variant="outline-secondary"
                    onClick={() => navigate('/offices')}
                    style={{ 
                      borderColor: '#00482D',
                      color: '#00482D',
                      padding: '10px 25px',
                      borderRadius: '8px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#00482D';
                      e.target.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#00482D';
                    }}
                  >
                    <i className="fas fa-arrow-left me-2"></i>
                    Back to All Offices
                  </Button>
                  
                  <div className="d-flex gap-2">
                    <Button 
                      variant="success"
                      onClick={() => window.location.href = `mailto:${office.email || 'usmkcc_info@usm.edu.ph'}`}
                      style={{ 
                        backgroundColor: '#00482D',
                        borderColor: '#00482D',
                        padding: '10px 25px',
                        borderRadius: '8px'
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
                      <i className="fas fa-envelope me-2"></i>
                      Send Email
                    </Button>
                    {office.contact && (
                      <Button 
                        variant="info"
                        onClick={() => window.location.href = `tel:${office.contact}`}
                        style={{ 
                          backgroundColor: '#17a2b8',
                          borderColor: '#17a2b8',
                          color: '#fff',
                          padding: '10px 25px',
                          borderRadius: '8px'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#138496';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#17a2b8';
                        }}
                      >
                        <i className="fas fa-phone me-2"></i>
                        Call
                      </Button>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Floating Back Button (Mobile) */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        display: 'block',
        zIndex: 1000
      }}>
        <Button
          onClick={() => navigate('/offices')}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: '#00482D',
            border: 'none',
            color: '#FFD326',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1)';
            e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
          }}
        >
          <i className="fas fa-arrow-up"></i>
        </Button>
      </div>
    </div>
  );
};

export default OfficeDetails;