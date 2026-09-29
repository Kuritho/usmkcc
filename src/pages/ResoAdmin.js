// src/pages/ResoAdmin.js - Protected with Authentication
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Badge, Alert, Modal, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { createTemplate, getTemplates, deleteTemplate, updateTemplate } from '../supabase/services';

const ResoAdmin = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    type: 'undergraduate',
    file: null,
    fileUrl: '',
    is_active: true
  });

  // Categories for dropdown
  const undergradCategories = [
    { value: 'guides', label: 'Thesis Guides' },
    { value: 'ai-policies', label: 'AI Policies and Forms' },
    { value: 'outline-templates', label: 'Thesis Outline/Proposal Templates' },
    { value: 'manuscript-templates', label: 'Thesis Manuscript Templates' },
    { value: 'outline-forms', label: 'Outline Forms' },
    { value: 'manuscript-forms', label: 'Manuscript Forms' },
    { value: 'loose-sheets', label: 'Loose Sheets' }
  ];

  const gradCategories = [
    { value: 'grad-guides', label: 'Thesis Guide' },
    { value: 'defense', label: 'Application for Defense' },
    { value: 'grad-outline', label: 'Thesis Outline/Proposal Templates' },
    { value: 'grad-manuscript', label: 'Thesis Manuscript Templates' },
    { value: 'grad-other', label: 'Other Templates' }
  ];

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = authService.isAuthenticated();
      const user = authService.getCurrentUser();
      const role = authService.getUserRole();
      
      // Allow access if authenticated with 'reso' or 'admin' role
      if (isAuth && (role === 'reso' || role === 'admin')) {
        setIsAuthorized(true);
        setCurrentUser(user);
      } else {
        // Redirect to home if not authorized
        navigate('/');
      }
      setAuthLoading(false);
    };
    
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (isAuthorized) {
      loadTemplates();
    }
  }, [isAuthorized]);

  const loadTemplates = async () => {
    setLoading(true);
    try {
      const result = await getTemplates();
      if (result.success) {
        setTemplates(result.data);
      }
    } catch (error) {
      console.error('Error loading templates:', error);
      setError('Failed to load templates');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      file: file,
      fileUrl: file ? URL.createObjectURL(file) : ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      if (!formData.name || !formData.category || !formData.type) {
        throw new Error('Name, category, and type are required');
      }

      const templateData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        type: formData.type,
        is_active: formData.is_active
      };

      const result = await createTemplate(templateData, formData.file);
      
      if (result.success) {
        setSuccess('Template uploaded successfully!');
        setFormData({
          name: '',
          description: '',
          category: '',
          type: 'undergraduate',
          file: null,
          fileUrl: '',
          is_active: true
        });
        document.getElementById('file-input').value = '';
        await loadTemplates();
      } else {
        setError(result.error || 'Failed to upload template');
      }
    } catch (error) {
      setError(error.message || 'An error occurred');
    } finally {
      setSubmitting(false);
      setTimeout(() => setSuccess(''), 5000);
    }
  };

  const handleDelete = async () => {
    if (!selectedTemplate) return;
    
    try {
      const result = await deleteTemplate(selectedTemplate.id);
      if (result.success) {
        setSuccess('Template deleted successfully!');
        setShowDeleteModal(false);
        setSelectedTemplate(null);
        await loadTemplates();
      } else {
        setError(result.error || 'Failed to delete template');
      }
    } catch (error) {
      setError('An error occurred while deleting');
    }
  };

  const getCategoryLabel = (category, type) => {
    const categories = type === 'undergraduate' ? undergradCategories : gradCategories;
    const found = categories.find(c => c.value === category);
    return found ? found.label : category;
  };

  const getTypeLabel = (type) => {
    return type === 'undergraduate' ? 'Undergraduate' : 'Graduate';
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

  const getCategoriesForType = (type) => {
    return type === 'undergraduate' ? undergradCategories : gradCategories;
  };

  // Handle logout
  const handleLogout = async () => {
    const result = await authService.logout();
    if (result.success) {
      navigate('/');
    }
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', background: '#f8f9fa' }}>
        <div className="text-center">
          <Spinner animation="border" variant="success" style={{ width: '3rem', height: '3rem' }} />
          <p className="mt-3 text-muted">Verifying access...</p>
        </div>
      </div>
    );
  }

  // If not authorized, return null (will redirect)
  if (!isAuthorized) {
    return null;
  }

  return (
    <div style={{ 
      backgroundColor: '#f8f9fa', 
      minHeight: '100vh',
      padding: '2rem 0'
    }}>
      <Container>
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <Card className="border-0 shadow-sm" style={{ borderRadius: '12px' }}>
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                  <div>
                    <h2 className="fw-bold" style={{ color: '#00482D' }}>
                      <i className="fas fa-file-upload me-2" style={{ color: '#FFD326' }}></i>
                      RESO Templates Admin
                    </h2>
                    <p className="text-muted mb-0">Upload and manage downloadable templates for students</p>
                    {currentUser && (
                      <Badge bg="info" className="mt-2">
                        <i className="fas fa-user me-1"></i>
                        {currentUser.username} ({currentUser.role})
                      </Badge>
                    )}
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <Badge bg="success" className="me-2">Secure Access</Badge>
                    <Badge bg="info">{templates.length} Templates</Badge>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={handleLogout}
                      className="ms-2"
                    >
                      <i className="fas fa-sign-out-alt me-1"></i>
                      Logout
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Success/Error Messages */}
        {success && (
          <Alert variant="success" className="mb-4" dismissible onClose={() => setSuccess('')}>
            <i className="fas fa-check-circle me-2"></i>
            {success}
          </Alert>
        )}
        {error && (
          <Alert variant="danger" className="mb-4" dismissible onClose={() => setError('')}>
            <i className="fas fa-exclamation-circle me-2"></i>
            {error}
          </Alert>
        )}

        <Row className="g-4">
          {/* Upload Form */}
          <Col lg={5}>
            <Card className="border-0 shadow-sm" style={{ borderRadius: '12px' }}>
              <Card.Header style={{ backgroundColor: '#00482D', color: '#FFD326' }}>
                <h5 className="mb-0">
                  <i className="fas fa-plus-circle me-2"></i>
                  Upload New Template
                </h5>
              </Card.Header>
              <Card.Body className="p-4">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Template Name <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter template name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="description"
                      placeholder="Brief description of the template"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Type <span className="text-danger">*</span></Form.Label>
                        <Form.Select
                          name="type"
                          value={formData.type}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              type: e.target.value,
                              category: ''
                            });
                          }}
                          required
                        >
                          <option value="undergraduate">Undergraduate</option>
                          <option value="graduate">Graduate</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Category <span className="text-danger">*</span></Form.Label>
                        <Form.Select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select category</option>
                          {getCategoriesForType(formData.type).map(cat => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>File <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      id="file-input"
                      type="file"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                      onChange={handleFileChange}
                      required
                    />
                    <Form.Text className="text-muted">
                      Supported: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX (Max 10MB)
                    </Form.Text>
                    {formData.fileUrl && (
                      <div className="mt-2">
                        <Badge bg="success">
                          <i className="fas fa-check me-1"></i>
                          {formData.file?.name || 'File selected'}
                        </Badge>
                      </div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Active"
                      name="is_active"
                      checked={formData.is_active}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Button 
                    type="submit" 
                    variant="success"
                    className="w-100"
                    style={{ backgroundColor: '#00482D', borderColor: '#00482D' }}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-upload me-2"></i>
                        Upload Template
                      </>
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Templates List */}
          <Col lg={7}>
            <Card className="border-0 shadow-sm" style={{ borderRadius: '12px' }}>
              <Card.Header style={{ backgroundColor: '#00482D', color: '#FFD326' }}>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <i className="fas fa-list me-2"></i>
                    Uploaded Templates ({templates.length})
                  </h5>
                  <div className="d-flex gap-2">
                    <Button 
                      variant="outline-light" 
                      size="sm"
                      onClick={loadTemplates}
                      style={{ borderColor: '#FFD326', color: '#FFD326' }}
                    >
                      <i className="fas fa-sync-alt"></i>
                    </Button>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                {loading ? (
                  <div className="text-center py-4">
                    <Spinner animation="border" variant="success" />
                    <p className="mt-2 text-muted">Loading templates...</p>
                  </div>
                ) : templates.length > 0 ? (
                  <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                    <Table striped bordered hover responsive>
                      <thead style={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>
                        <tr>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Type</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {templates.map(template => (
                          <tr key={template.id}>
                            <td>
                              <strong>{template.name}</strong>
                              {template.description && (
                                <div><small className="text-muted">{template.description}</small></div>
                              )}
                            </td>
                            <td>
                              <Badge bg={getCategoryColor(template.category)}>
                                {getCategoryLabel(template.category, template.type)}
                              </Badge>
                            </td>
                            <td>
                              <Badge bg="secondary">
                                {getTypeLabel(template.type)}
                              </Badge>
                            </td>
                            <td>
                              <Badge bg={template.is_active ? 'success' : 'danger'}>
                                {template.is_active ? 'Active' : 'Inactive'}
                              </Badge>
                            </td>
                            <td>
                              <div className="d-flex gap-1 flex-wrap">
                                {template.file_url && (
                                  <Button 
                                    variant="outline-primary" 
                                    size="sm"
                                    href={template.file_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <i className="fas fa-download"></i>
                                  </Button>
                                )}
                                <Button 
                                  variant="outline-danger" 
                                  size="sm"
                                  onClick={() => {
                                    setSelectedTemplate(template);
                                    setShowDeleteModal(true);
                                  }}
                                >
                                  <i className="fas fa-trash"></i>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <i className="fas fa-file-alt" style={{ fontSize: '2rem', color: '#dee2e6' }}></i>
                    <p className="text-muted mt-2">No templates uploaded yet.</p>
                    <p className="text-muted small">Use the form to upload your first template.</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Footer Note */}
        <Row className="mt-4">
          <Col>
            <div className="text-center p-3" style={{ backgroundColor: '#f0f7f0', borderRadius: '8px' }}>
              <p className="mb-0 text-muted" style={{ fontSize: '0.9rem' }}>
                <i className="fas fa-info-circle me-2" style={{ color: '#00482D' }}></i>
                Templates uploaded here will be displayed on the <strong>RESO Page</strong> and <strong>Downloadable Forms Center</strong>.
              </p>
              <p className="mb-0 text-muted mt-1" style={{ fontSize: '0.85rem' }}>
                <i className="fas fa-lock me-1" style={{ color: '#00482D' }}></i>
                Secure access: Only authorized RESO and Admin users can manage templates.
              </p>
            </div>
          </Col>
        </Row>

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
          <Modal.Header closeButton style={{ backgroundColor: '#dc3545', color: '#fff' }}>
            <Modal.Title>
              <i className="fas fa-exclamation-triangle me-2"></i>
              Confirm Delete
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this template?</p>
            <p><strong>Name:</strong> {selectedTemplate?.name}</p>
            <p><strong>Category:</strong> {selectedTemplate && getCategoryLabel(selectedTemplate.category, selectedTemplate.type)}</p>
            <p className="text-danger"><small>This action cannot be undone.</small></p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              <i className="fas fa-trash me-2"></i>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default ResoAdmin;