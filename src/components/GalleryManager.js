// GalleryManager.js - Admin gallery management component
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Table, Modal, Spinner } from 'react-bootstrap';
import { getGalleryImages, uploadGalleryImage, deleteGalleryImage } from '../supabase/services';

const GalleryManager = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageFile: null
  });

  useEffect(() => {
    loadGalleryImages();
  }, []);

  const loadGalleryImages = async () => {
    setLoading(true);
    try {
      const result = await getGalleryImages();
      if (result.success) {
        setImages(result.data);
      } else {
        setUploadError('Failed to load gallery images');
      }
    } catch (error) {
      console.error('Error loading gallery:', error);
      setUploadError('Error loading gallery images');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imageFile: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.imageFile) {
      setUploadError('Please select an image to upload');
      return;
    }

    setUploading(true);
    setUploadError('');
    setUploadSuccess('');

    try {
      const result = await uploadGalleryImage(
        formData.imageFile,
        formData.title,
        formData.description
      );

      if (result.success) {
        setUploadSuccess('Gallery image uploaded successfully!');
        setFormData({ title: '', description: '', imageFile: null });
        document.getElementById('gallery-image-input').value = '';
        await loadGalleryImages();
      } else {
        setUploadError(result.error || 'Failed to upload gallery image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError('An error occurred while uploading');
    } finally {
      setUploading(false);
      setTimeout(() => setUploadSuccess(''), 5000);
    }
  };

  const handleDeleteClick = (image) => {
    setImageToDelete(image);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!imageToDelete) return;
    
    setDeleting(true);
    try {
      const result = await deleteGalleryImage(imageToDelete.id, imageToDelete.image_path);
      if (result.success) {
        setUploadSuccess('Image deleted successfully!');
        await loadGalleryImages();
        setShowDeleteModal(false);
        setImageToDelete(null);
      } else {
        setUploadError(result.error || 'Failed to delete image');
      }
    } catch (error) {
      console.error('Delete error:', error);
      setUploadError('An error occurred while deleting');
    } finally {
      setDeleting(false);
      setTimeout(() => setUploadSuccess(''), 5000);
    }
  };

  return (
    <div>
      {/* Upload Form */}
      <Card className="mb-4">
        <Card.Header style={{ backgroundColor: '#00482D', color: '#FFD326' }}>
          <h5 className="mb-0">
            <i className="fas fa-upload me-2"></i>
            Upload Gallery Image
          </h5>
        </Card.Header>
        <Card.Body>
          {uploadSuccess && (
            <Alert variant="success" dismissible onClose={() => setUploadSuccess('')}>
              <i className="fas fa-check-circle me-2"></i>
              {uploadSuccess}
            </Alert>
          )}
          {uploadError && (
            <Alert variant="danger" dismissible onClose={() => setUploadError('')}>
              <i className="fas fa-exclamation-circle me-2"></i>
              {uploadError}
            </Alert>
          )}
          
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter image title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter image description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Select Image</Form.Label>
              <Form.Control
                id="gallery-image-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
              <Form.Text className="text-muted">
                Supported formats: JPG, PNG, GIF, WebP (Max 10MB)
              </Form.Text>
            </Form.Group>

            <Button 
              type="submit" 
              style={{ backgroundColor: '#00482D', color: '#FFD326', border: 'none' }}
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Uploading...
                </>
              ) : (
                <>
                  <i className="fas fa-cloud-upload-alt me-2"></i>
                  Upload Image
                </>
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Gallery List */}
      <Card>
        <Card.Header style={{ backgroundColor: '#00482D', color: '#FFD326' }}>
          <h5 className="mb-0">
            <i className="fas fa-images me-2"></i>
            Gallery Images ({images.length})
            <Button 
              variant="outline-light" 
              size="sm" 
              className="ms-2"
              onClick={loadGalleryImages}
              style={{ borderColor: '#FFD326', color: '#FFD326' }}
            >
              <i className="fas fa-sync-alt"></i>
            </Button>
          </h5>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="success" />
              <p className="mt-2">Loading gallery...</p>
            </div>
          ) : images.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Uploaded</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {images.map((image) => (
                  <tr key={image.id}>
                    <td>
                      <img 
                        src={image.image_url} 
                        alt={image.title || 'Gallery image'}
                        style={{ 
                          width: '60px', 
                          height: '60px', 
                          objectFit: 'cover',
                          borderRadius: '4px'
                        }}
                      />
                    </td>
                    <td>{image.title || 'Untitled'}</td>
                    <td>{image.description || 'No description'}</td>
                    <td>{new Date(image.created_at).toLocaleDateString()}</td>
                    <td>
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => handleDeleteClick(image)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-center text-muted py-4">No gallery images uploaded yet.</p>
          )}
        </Card.Body>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => {
        setShowDeleteModal(false);
        setImageToDelete(null);
      }} centered>
        <Modal.Header closeButton style={{ backgroundColor: '#dc3545', color: '#ffffff' }}>
          <Modal.Title>
            <i className="fas fa-exclamation-triangle me-2"></i>
            Confirm Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this gallery image?</p>
          <p><strong>Title:</strong> {imageToDelete?.title || 'Untitled'}</p>
          <p className="text-danger"><small>This action cannot be undone.</small></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setShowDeleteModal(false);
            setImageToDelete(null);
          }} disabled={deleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete} disabled={deleting}>
            {deleting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Deleting...
              </>
            ) : (
              <>
                <i className="fas fa-trash me-2"></i>
                Delete
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GalleryManager;