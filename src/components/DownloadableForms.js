// src/components/DownloadableForms.js - Redesigned
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert, Nav, Tab, InputGroup, Form, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getTemplates } from '../supabase/services';

const DownloadableForms = () => {
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [activeTab, setActiveTab] = useState('undergraduate');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await getTemplates();
      if (result.success) {
        const activeTemplates = result.data.filter(t => t.is_active !== false);
        setTemplates(activeTemplates);
        setFilteredTemplates(activeTemplates);
      } else {
        setError('Failed to load templates. Please try again.');
      }
    } catch (error) {
      console.error('Error loading templates:', error);
      setError('An error occurred while loading templates.');
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories
  const getCategories = () => {
    const categories = new Set();
    templates.forEach(t => {
      if (t.category) categories.add(t.category);
    });
    return ['all', ...Array.from(categories)];
  };

  // Get category label
  const getCategoryLabel = (category) => {
    const labels = {
      'guides': '📘 Thesis Guides',
      'ai-policies': '🤖 AI Policies',
      'outline-templates': '📋 Outline/Proposal Templates',
      'manuscript-templates': '📄 Manuscript Templates',
      'outline-forms': '📝 Outline Forms',
      'manuscript-forms': '📑 Manuscript Forms',
      'loose-sheets': '📎 Loose Sheets',
      'grad-guides': '🎓 Graduate Thesis Guides',
      'defense': '🛡️ Application for Defense',
      'grad-outline': '📋 Graduate Outline/Proposal',
      'grad-manuscript': '📄 Graduate Manuscript',
      'grad-other': '📁 Other Templates'
    };
    return labels[category] || category;
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    const icons = {
      'guides': 'fa-book',
      'ai-policies': 'fa-robot',
      'outline-templates': 'fa-list-ul',
      'manuscript-templates': 'fa-file-alt',
      'outline-forms': 'fa-pen',
      'manuscript-forms': 'fa-file-signature',
      'loose-sheets': 'fa-paperclip',
      'grad-guides': 'fa-graduation-cap',
      'defense': 'fa-shield-alt',
      'grad-outline': 'fa-list-check',
      'grad-manuscript': 'fa-file-pdf',
      'grad-other': 'fa-folder-open'
    };
    return icons[category] || 'fa-file';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'guides': 'success',
      'ai-policies': 'danger',
      'outline-templates': 'primary',
      'manuscript-templates': 'info',
      'outline-forms': 'warning',
      'manuscript-forms': 'secondary',
      'loose-sheets': 'dark',
      'grad-guides': 'success',
      'defense': 'danger',
      'grad-outline': 'primary',
      'grad-manuscript': 'info',
      'grad-other': 'secondary'
    };
    return colors[category] || 'secondary';
  };

  const getTypeLabel = (type) => {
    return type === 'undergraduate' ? 'Undergraduate' : 'Graduate';
  };

  // Filter templates
  useEffect(() => {
    let filtered = templates.filter(t => t.type === activeTab);

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(t => t.category === selectedCategory);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(t => 
        t.name.toLowerCase().includes(term) ||
        (t.description && t.description.toLowerCase().includes(term))
      );
    }

    setFilteredTemplates(filtered);
    setCurrentPage(1);
  }, [templates, activeTab, selectedCategory, searchTerm]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTemplates.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Template Card Component
  const TemplateCard = ({ template }) => {
    return (
      <Card 
        className="h-100 shadow-sm border-0 template-card"
        style={{ 
          borderRadius: '16px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          background: 'linear-gradient(145deg, #ffffff, #f8f9fa)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px) scale(1.01)';
          e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.06)';
        }}
      >
        <div style={{
          height: '6px',
          background: `linear-gradient(90deg, ${template.category === 'guides' || template.category === 'grad-guides' ? '#28a745' : 
            template.category === 'ai-policies' || template.category === 'defense' ? '#dc3545' :
            template.category === 'outline-templates' || template.category === 'grad-outline' ? '#007bff' :
            template.category === 'manuscript-templates' || template.category === 'grad-manuscript' ? '#17a2b8' :
            '#6c757d'}, #${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')})`
        }}></div>
        <Card.Body className="p-4">
          <div className="d-flex align-items-start mb-3">
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '14px',
              flexShrink: 0,
              background: `linear-gradient(135deg, ${getCategoryColor(template.category) === 'success' ? '#d4edda' :
                getCategoryColor(template.category) === 'danger' ? '#f8d7da' :
                getCategoryColor(template.category) === 'primary' ? '#cce5ff' :
                getCategoryColor(template.category) === 'info' ? '#d1ecf1' :
                getCategoryColor(template.category) === 'warning' ? '#fff3cd' :
                '#e9ecef'}, #f8f9fa)`
            }}>
              <i className={`fas ${getCategoryIcon(template.category)}`} style={{
                fontSize: '1.3rem',
                color: getCategoryColor(template.category) === 'success' ? '#28a745' :
                  getCategoryColor(template.category) === 'danger' ? '#dc3545' :
                  getCategoryColor(template.category) === 'primary' ? '#007bff' :
                  getCategoryColor(template.category) === 'info' ? '#17a2b8' :
                  getCategoryColor(template.category) === 'warning' ? '#ffc107' :
                  '#6c757d'
              }}></i>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h6 className="fw-bold mb-1" style={{ color: '#00482D', fontSize: '0.95rem', wordBreak: 'break-word' }}>
                {template.name}
              </h6>
              <Badge 
                bg={getCategoryColor(template.category)}
                className="rounded-pill px-2 py-1"
                style={{ fontSize: '0.65rem', fontWeight: '500' }}
              >
                {getCategoryLabel(template.category)}
              </Badge>
            </div>
          </div>

          {template.description && (
            <p style={{ 
              color: '#6c757d', 
              fontSize: '0.85rem', 
              marginBottom: '1rem', 
              lineHeight: '1.6',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {template.description}
            </p>
          )}

          <div className="d-flex justify-content-between align-items-center mt-3 pt-3" style={{ borderTop: '1px solid #e9ecef' }}>
            <div>
              <small style={{ color: '#adb5bd' }}>
                <i className="fas fa-graduation-cap me-1"></i>
                {getTypeLabel(template.type)}
              </small>
            </div>
            {template.file_url && (
              <Button 
                variant="outline-success"
                size="sm"
                className="rounded-pill px-3"
                href={template.file_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  fontWeight: '500',
                  borderColor: '#00482D',
                  color: '#00482D',
                  transition: 'all 0.3s ease'
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
                <i className="fas fa-download me-1"></i> Download
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    );
  };

  // Category Filter Button
  const CategoryFilter = ({ category, label, count, isActive, onClick }) => (
    <Button
      variant={isActive ? 'usmkc-green' : 'outline-secondary'}
      size="sm"
      className="rounded-pill px-3 py-1"
      onClick={onClick}
      style={{
        backgroundColor: isActive ? '#00482D' : 'transparent',
        borderColor: isActive ? '#00482D' : '#6c757d',
        color: isActive ? '#fff' : '#6c757d',
        fontWeight: '500',
        fontSize: '0.8rem',
        transition: 'all 0.3s ease'
      }}
    >
      {label}
      <Badge 
        bg={isActive ? 'light' : 'secondary'} 
        className="ms-1"
        style={{ 
          color: isActive ? '#00482D' : '#fff',
          fontSize: '0.6rem',
          padding: '2px 6px'
        }}
      >
        {count}
      </Badge>
    </Button>
  );

  if (loading) {
    return (
      <div className="py-5 text-center" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
        <div>
          <div className="spinner-border text-success mb-3" style={{ width: '3rem', height: '3rem', borderColor: '#00482D' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Loading templates...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)',
      minHeight: '100vh',
      padding: '3rem 0'
    }}>
      <Container>
        {/* Page Header with Gradient */}
        <Row className="mb-5">
          <Col>
            <div className="text-center position-relative">
              <div style={{
                background: 'linear-gradient(135deg, rgba(0,72,45,0.05) 0%, rgba(255,211,38,0.08) 100%)',
                padding: '3rem 2rem',
                borderRadius: '24px',
                border: '1px solid rgba(0,72,45,0.08)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-50px',
                  right: '-50px',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,211,38,0.1) 0%, transparent 70%)',
                  pointerEvents: 'none'
                }}></div>
                <div style={{
                  position: 'absolute',
                  bottom: '-80px',
                  left: '-80px',
                  width: '250px',
                  height: '250px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(0,72,45,0.05) 0%, transparent 70%)',
                  pointerEvents: 'none'
                }}></div>
                
                <div className="position-relative">
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
                    <i className="fas fa-file-download" style={{ fontSize: '2.5rem', color: '#FFD326' }}></i>
                  </div>
                  <h1 className="display-4 fw-bold" style={{ color: '#00482D' }}>
                    Downloadable Forms Center
                  </h1>
                  <p style={{ 
                    fontSize: '1.2rem', 
                    color: '#6c757d',
                    maxWidth: '600px',
                    margin: '0.5rem auto 0'
                  }}>
                    Access thesis guides, proposal templates, and manuscript templates for your academic journey
                  </p>
                  <div className="d-flex justify-content-center gap-3 mt-3 flex-wrap">
                    <Link to="/">
                      <Button variant="outline-secondary" className="rounded-pill px-4">
                        <i className="fas fa-arrow-left me-2"></i>
                        Back to Home
                      </Button>
                    </Link>
                    <Link to="/research-extension">
                      <Button variant="outline-usmkc-green" className="rounded-pill px-4">
                        <i className="fas fa-flask me-2"></i>
                        RESO Page
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Error Alert */}
        {error && (
          <Alert variant="danger" className="mb-4 shadow-sm rounded-3" dismissible onClose={() => setError('')}>
            <i className="fas fa-exclamation-circle me-2"></i>
            {error}
          </Alert>
        )}

        {/* Stats Cards */}
        <Row className="g-3 mb-4">
          <Col md={3} xs={6}>
            <Card className="border-0 shadow-sm text-center" style={{ borderRadius: '16px', background: 'linear-gradient(135deg, #e8f5e9, #f1f8f4)' }}>
              <Card.Body className="py-3">
                <h3 className="fw-bold mb-0" style={{ color: '#00482D' }}>{templates.filter(t => t.type === 'undergraduate').length}</h3>
                <small className="text-muted">Undergraduate</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} xs={6}>
            <Card className="border-0 shadow-sm text-center" style={{ borderRadius: '16px', background: 'linear-gradient(135deg, #e3f2fd, #f0f7ff)' }}>
              <Card.Body className="py-3">
                <h3 className="fw-bold mb-0" style={{ color: '#00482D' }}>{templates.filter(t => t.type === 'graduate').length}</h3>
                <small className="text-muted">Graduate</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} xs={6}>
            <Card className="border-0 shadow-sm text-center" style={{ borderRadius: '16px', background: 'linear-gradient(135deg, #fff3e0, #fff8f0)' }}>
              <Card.Body className="py-3">
                <h3 className="fw-bold mb-0" style={{ color: '#00482D' }}>{templates.length}</h3>
                <small className="text-muted">Total Templates</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} xs={6}>
            <Card className="border-0 shadow-sm text-center" style={{ borderRadius: '16px', background: 'linear-gradient(135deg, #fce4ec, #fdf0f3)' }}>
              <Card.Body className="py-3">
                <h3 className="fw-bold mb-0" style={{ color: '#00482D' }}>{new Set(templates.map(t => t.category)).size}</h3>
                <small className="text-muted">Categories</small>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Search and Filter Bar */}
        <Row className="mb-4">
          <Col lg={8} className="mx-auto">
            <Card className="border-0 shadow-sm" style={{ borderRadius: '16px' }}>
              <Card.Body className="p-3">
                <Row className="g-2 align-items-center">
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
                        placeholder="Search templates..."
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
                    <div className="d-flex gap-1 flex-wrap">
                      <Button
                        variant={activeTab === 'undergraduate' ? 'usmkc-green' : 'outline-secondary'}
                        size="sm"
                        className="rounded-pill px-3"
                        onClick={() => setActiveTab('undergraduate')}
                        style={{ 
                          backgroundColor: activeTab === 'undergraduate' ? '#00482D' : 'transparent',
                          borderColor: activeTab === 'undergraduate' ? '#00482D' : '#6c757d',
                          color: activeTab === 'undergraduate' ? '#fff' : '#6c757d',
                          fontWeight: '500'
                        }}
                      >
                        <i className="fas fa-graduation-cap me-1"></i> Undergraduate
                      </Button>
                      <Button
                        variant={activeTab === 'graduate' ? 'usmkc-green' : 'outline-secondary'}
                        size="sm"
                        className="rounded-pill px-3"
                        onClick={() => setActiveTab('graduate')}
                        style={{ 
                          backgroundColor: activeTab === 'graduate' ? '#00482D' : 'transparent',
                          borderColor: activeTab === 'graduate' ? '#00482D' : '#6c757d',
                          color: activeTab === 'graduate' ? '#fff' : '#6c757d',
                          fontWeight: '500'
                        }}
                      >
                        <i className="fas fa-user-graduate me-1"></i> Graduate
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Category Filters */}
        <div className="mb-4 d-flex flex-wrap gap-2 justify-content-center">
          <CategoryFilter
            category="all"
            label="All"
            count={templates.filter(t => t.type === activeTab).length}
            isActive={selectedCategory === 'all'}
            onClick={() => setSelectedCategory('all')}
          />
          {getCategories()
            .filter(c => c !== 'all')
            .map(cat => {
              const count = templates.filter(t => t.type === activeTab && t.category === cat).length;
              if (count === 0) return null;
              return (
                <CategoryFilter
                  key={cat}
                  category={cat}
                  label={getCategoryLabel(cat).split(' ').slice(1).join(' ')}
                  count={count}
                  isActive={selectedCategory === cat}
                  onClick={() => setSelectedCategory(cat)}
                />
              );
            })}
        </div>

        {/* Templates Grid */}
        {filteredTemplates.length > 0 ? (
          <>
            <Row className="g-4">
              {currentItems.map(template => (
                <Col key={template.id} md={6} lg={4}>
                  <TemplateCard template={template} />
                </Col>
              ))}
            </Row>

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

            <div className="text-center mt-3">
              <small className="text-muted">
                Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredTemplates.length)} of {filteredTemplates.length} templates
              </small>
            </div>
          </>
        ) : (
          <div className="text-center py-5">
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: '#f8f9fa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              <i className="fas fa-file-alt" style={{ fontSize: '3rem', color: '#dee2e6' }}></i>
            </div>
            <h5 className="text-muted">No templates found</h5>
            <p className="text-muted small">
              {searchTerm ? 'Try adjusting your search or filter criteria.' : 'No templates available in this category.'}
            </p>
            {(searchTerm || selectedCategory !== 'all') && (
              <Button 
                variant="outline-secondary" 
                size="sm"
                className="rounded-pill"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
              >
                <i className="fas fa-undo me-1"></i> Reset Filters
              </Button>
            )}
          </div>
        )}

        {/* Footer Note */}
        <Row className="mt-5">
          <Col>
            <Card className="border-0 shadow-sm" style={{ borderRadius: '16px', background: 'linear-gradient(135deg, #f0faf0, #f8f9fa)' }}>
              <Card.Body className="p-4 text-center">
                <i className="fas fa-info-circle me-2" style={{ color: '#00482D' }}></i>
                <span className="text-muted">
                  For questions or assistance, please contact the 
                  <strong style={{ color: '#00482D' }}> Research and Extension Services Office</strong>
                </span>
                <div className="mt-2">
                  <Badge bg="light" className="text-muted me-2">📧 usmkccreso2020@gmail.com</Badge>
                  <Badge bg="light" className="text-muted">https://www.facebook.com/USMKCCRES</Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <style>{`
        .template-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .template-card:hover {
          transform: translateY(-8px) scale(1.01);
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
        .btn-outline-usmkc-green {
          border: 2px solid #00482D !important;
          color: #00482D !important;
          background: transparent !important;
        }
        .btn-outline-usmkc-green:hover {
          background-color: #00482D !important;
          color: #fff !important;
        }
        .badge.bg-usmkc-green {
          background-color: #00482D !important;
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

export default DownloadableForms;