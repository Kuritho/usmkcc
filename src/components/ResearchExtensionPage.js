// src/components/ResearchExtensionPage.js - Full Updated with Professional Article Design
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Tab, Nav, Button, Spinner, Modal, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getNews, getTemplates } from '../supabase/services';
import { sdgGoals } from '../components/SDGHub';

const ResearchExtensionPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const [imageErrors, setImageErrors] = useState({});
  const [images, setImages] = useState([]);
  const [activeTab, setActiveTab] = useState('research');
  const [showTemplates, setShowTemplates] = useState(false);
  
  // State for news data
  const [researchNews, setResearchNews] = useState([]);
  const [extensionNews, setExtensionNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  
  // State for templates
  const [templates, setTemplates] = useState([]);
  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for viewing full article
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showArticleModal, setShowArticleModal] = useState(false);

  // Load news from Supabase
  useEffect(() => {
    loadNews();
    loadImages();
    loadTemplates();
  }, []);

  const loadNews = async () => {
    setLoadingNews(true);
    try {
      const result = await getNews();
      if (result.success) {
        // Filter research news - only include items with showOnReso flag or category 'research'
        const research = result.data.filter(item => 
          item.showOnReso === true || 
          item.category?.toLowerCase() === 'research'
        );
        
        // Filter extension news - only include extension category
        const extension = result.data.filter(item => 
          item.category?.toLowerCase() === 'extension'
        );
        
        setResearchNews(research);
        setExtensionNews(extension);
      }
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setLoadingNews(false);
    }
  };

  const loadTemplates = async () => {
    setLoadingTemplates(true);
    try {
      const result = await getTemplates();
      if (result.success) {
        // Only show active templates
        const activeTemplates = result.data.filter(t => t.is_active !== false);
        setTemplates(activeTemplates);
      }
    } catch (error) {
      console.error('Error loading templates:', error);
    } finally {
      setLoadingTemplates(false);
    }
  };

  // Function to check if image exists
  const checkImageExists = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  const loadImages = async () => {
    const rawFiles = [
      { name: 'reso1', ext: 'jpg' }, { name: 'reso2', ext: 'jpg' },
      { name: 'reso3', ext: 'jpg' }, { name: 'reso4', ext: 'jpg' },
      { name: 'reso5', ext: 'jpg' }, { name: 'reso6', ext: 'jpg' },
      { name: 'reso7', ext: 'jpg' }, { name: 'reso8', ext: 'jpg' },
      { name: 'reso9', ext: 'jpg' }, { name: 'reso91', ext: 'jpg' },
      { name: 'reso92', ext: 'jpg' }, { name: 'reso93', ext: 'jpg' },
      { name: 'reso94', ext: 'jpg' }, { name: 'reso95', ext: 'jpg' },
      { name: 'reso96', ext: 'jpg' }, { name: 'reso97', ext: 'jpg' },
      { name: 'reso98', ext: 'jpg' }, { name: 'reso99', ext: 'png' },
      { name: 'reso991', ext: 'jpg' }, { name: 'reso992', ext: 'jpg' },
      { name: 'reso993', ext: 'jpg' }, { name: 'reso994', ext: 'jpg' },
      { name: 'reso995', ext: 'jpg' }, { name: 'reso996', ext: 'jpg' },
      { name: 'reso997', ext: 'jpg' }, { name: 'reso998', ext: 'jpg' },
      { name: 'reso999', ext: 'jpg' }, { name: 'reso9991', ext: 'jpg' },
      { name: 'reso9992', ext: 'jpg' }, { name: 'reso9993', ext: 'jpg' },
      { name: 'reso9994', ext: 'jpg' }, { name: 'reso9995', ext: 'jpg' },
      { name: 'reso9996', ext: 'jpg' }, { name: 'reso9997', ext: 'jpg' },
      { name: 'reso9998', ext: 'jpg' }, { name: 'reso9999', ext: 'jpg' },
      { name: 'reso99991', ext: 'jpg' }, { name: 'reso99992', ext: 'jpg' },
      { name: 'reso99993', ext: 'jpg' }, { name: 'reso99994', ext: 'jpg' }
    ];

    const sortedFiles = rawFiles.sort((a, b) => {
      const numA = parseInt(a.name.replace('reso', ''), 10);
      const numB = parseInt(b.name.replace('reso', ''), 10);
      return numA - numB;
    });

    const imageList = sortedFiles.map((file, index) => ({
      id: index + 1,
      url: `/images/reso/${file.name}.${file.ext}`,
      title: `Activity ${index + 1}`,
      filename: `${file.name}.${file.ext}`
    }));

    const validImages = [];
    for (const img of imageList) {
      const exists = await checkImageExists(img.url);
      if (exists) {
        validImages.push(img);
      } else {
        console.warn(`Image not found: ${img.url}`);
        setImageErrors(prev => ({ ...prev, [img.id]: true }));
      }
    }

    setImages(validImages.length > 0 ? validImages : imageList);
  };

  // Modal handlers
  const openImageModal = (url) => {
    setSelectedImage(url);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  // Article modal handlers
  const openArticleModal = (article) => {
    setSelectedArticle(article);
    setShowArticleModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeArticleModal = () => {
    setShowArticleModal(false);
    setSelectedArticle(null);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleKey = (e) => { 
      if (e.key === 'Escape') {
        if (isModalOpen) closeImageModal();
        if (showArticleModal) closeArticleModal();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isModalOpen, showArticleModal]);

  const handleImageLoad = (id) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  const getPlaceholderUrl = (title) => {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23e9ecef'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='Arial' font-size='24' fill='%236c757d'%3E${encodeURIComponent(title)}%3C/text%3E%3C/svg%3E`;
  };

  // Get template categories for filtering
  const getTemplateCategories = () => {
    const categories = new Set();
    templates.forEach(t => {
      if (t.category) categories.add(t.category);
    });
    return ['all', ...Array.from(categories)];
  };

  // Get category label
  const getCategoryLabel = (category) => {
    const labels = {
      'guides': 'Thesis Guides',
      'ai-policies': 'AI Policies',
      'outline-templates': 'Outline/Proposal Templates',
      'manuscript-templates': 'Manuscript Templates',
      'outline-forms': 'Outline Forms',
      'manuscript-forms': 'Manuscript Forms',
      'loose-sheets': 'Loose Sheets',
      'grad-guides': 'Graduate Thesis Guides',
      'defense': 'Application for Defense',
      'grad-outline': 'Graduate Outline/Proposal',
      'grad-manuscript': 'Graduate Manuscript',
      'grad-other': 'Other Templates'
    };
    return labels[category] || category;
  };

  // Filter templates by category and search
  const getFilteredTemplates = () => {
    let filtered = templates;
    
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
    
    return filtered;
  };

  // Template Card Component - Redesigned for RESO Page
  const TemplateCard = ({ template }) => {
    const getCategoryColor = (category) => {
      const colors = {
        'guides': '#28a745',
        'ai-policies': '#dc3545',
        'outline-templates': '#007bff',
        'manuscript-templates': '#17a2b8',
        'outline-forms': '#ffc107',
        'manuscript-forms': '#6c757d',
        'loose-sheets': '#343a40',
        'grad-guides': '#28a745',
        'defense': '#dc3545',
        'grad-outline': '#007bff',
        'grad-manuscript': '#17a2b8',
        'grad-other': '#6c757d'
      };
      return colors[category] || '#6c757d';
    };

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

    const getShortCategoryLabel = (category) => {
      const labels = {
        'guides': 'Guide',
        'ai-policies': 'AI Policy',
        'outline-templates': 'Outline',
        'manuscript-templates': 'Manuscript',
        'outline-forms': 'Outline Form',
        'manuscript-forms': 'Manuscript Form',
        'loose-sheets': 'Loose Sheet',
        'grad-guides': 'Grad Guide',
        'defense': 'Defense',
        'grad-outline': 'Grad Outline',
        'grad-manuscript': 'Grad Manuscript',
        'grad-other': 'Other'
      };
      return labels[category] || category;
    };

    return (
      <Card 
        className="h-100 border-0"
        style={{ 
          borderRadius: '14px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          background: '#ffffff',
          boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
          border: '1px solid #f0f0f0'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)';
          e.currentTarget.style.borderColor = getCategoryColor(template.category);
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)';
          e.currentTarget.style.borderColor = '#f0f0f0';
        }}
      >
        <div style={{
          height: '4px',
          background: `linear-gradient(90deg, ${getCategoryColor(template.category)}, ${getCategoryColor(template.category)}dd)`
        }}></div>
        <Card.Body className="p-4">
          <div className="d-flex align-items-start mb-3">
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '12px',
              flexShrink: 0,
              background: `${getCategoryColor(template.category)}15`
            }}>
              <i className={`fas ${getCategoryIcon(template.category)}`} style={{
                fontSize: '1.1rem',
                color: getCategoryColor(template.category)
              }}></i>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h6 className="fw-bold mb-1" style={{ color: '#00482D', fontSize: '0.9rem', wordBreak: 'break-word' }}>
                {template.name}
              </h6>
              <Badge 
                style={{ 
                  backgroundColor: getCategoryColor(template.category),
                  color: '#fff',
                  fontSize: '0.6rem',
                  padding: '2px 10px',
                  borderRadius: '20px',
                  fontWeight: '500'
                }}
              >
                {getShortCategoryLabel(template.category)}
              </Badge>
            </div>
          </div>

          {template.description && (
            <p style={{ 
              color: '#6c757d', 
              fontSize: '0.8rem', 
              marginBottom: '1rem', 
              lineHeight: '1.5',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {template.description}
            </p>
          )}

          <div className="d-flex justify-content-between align-items-center mt-2 pt-2" style={{ borderTop: '1px solid #f0f0f0' }}>
            <small style={{ color: '#adb5bd', fontSize: '0.7rem' }}>
              <i className="fas fa-graduation-cap me-1"></i>
              {template.type === 'undergraduate' ? 'Undergrad' : 'Graduate'}
            </small>
            {template.file_url && (
              <Button 
                variant="link"
                size="sm"
                className="p-0"
                href={template.file_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  color: '#00482D',
                  fontWeight: '600',
                  fontSize: '0.8rem',
                  textDecoration: 'none'
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

  // News Card Component - Professional Design
  const NewsCard = ({ item }) => {
    // Get thumbnail image (first image or image_url)
    const thumbnail = item.images && item.images.length > 0 ? item.images[0] : item.image_url;
    
    return (
      <Card 
        className="h-100 border-0"
        style={{
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          cursor: 'pointer',
          background: '#ffffff'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-6px)';
          e.currentTarget.style.boxShadow = '0 12px 35px rgba(0,0,0,0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.06)';
        }}
        onClick={() => openArticleModal(item)}
      >
        {/* Image Container */}
        <div style={{
          height: '220px',
          backgroundColor: '#f8f9fa',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {thumbnail ? (
            <img 
              src={thumbnail} 
              alt={item.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `
                  <div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;background:linear-gradient(135deg, #e9ecef, #dee2e6);color:#adb5bd;font-size:3rem;">
                    <i class="fas fa-newspaper"></i>
                  </div>
                `;
              }}
            />
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #e9ecef, #dee2e6)',
              color: '#adb5bd',
              fontSize: '3rem'
            }}>
              <i className="fas fa-newspaper"></i>
            </div>
          )}
          
          {/* Category Badge */}
          <Badge 
            bg={item.category?.toLowerCase() === 'extension' ? 'success' : 'primary'}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.7rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}
          >
            <i className={`fas ${item.category?.toLowerCase() === 'extension' ? 'fa-hands-helping' : 'fa-flask'} me-1`}></i>
            {item.category || 'News'}
          </Badge>

          {/* Click to read indicator */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            backgroundColor: 'rgba(0,0,0,0.6)',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '0.7rem',
            color: '#fff',
            backdropFilter: 'blur(4px)'
          }}>
            <i className="fas fa-hand-pointer me-1"></i>
            Click to read
          </div>

          {/* Image count badge */}
          {item.images && item.images.length > 1 && (
            <div style={{
              position: 'absolute',
              bottom: '16px',
              right: '16px',
              backgroundColor: 'rgba(0,0,0,0.6)',
              padding: '2px 10px',
              borderRadius: '20px',
              fontSize: '0.65rem',
              color: '#fff',
              backdropFilter: 'blur(4px)'
            }}>
              <i className="fas fa-images me-1"></i>
              {item.images.length}
            </div>
          )}
        </div>

        {/* Content */}
        <Card.Body style={{ padding: '20px' }}>
          <h6 style={{ 
            color: '#00482D', 
            fontWeight: '700', 
            fontSize: '1rem',
            marginBottom: '8px',
            lineHeight: '1.4',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {item.title}
          </h6>
          
          <p style={{ 
            color: '#6c757d', 
            fontSize: '0.85rem', 
            marginBottom: '14px',
            lineHeight: '1.6',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {item.summary || item.content?.substring(0, 120) || ''}
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '12px',
            borderTop: '1px solid #f0f0f0'
          }}>
            <span style={{ fontSize: '0.75rem', color: '#adb5bd' }}>
              <i className="far fa-calendar-alt me-1"></i>
              {new Date(item.created_at || item.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
            <span style={{ 
              fontSize: '0.7rem', 
              color: '#00482D',
              fontWeight: '600'
            }}>
              Read More <i className="fas fa-arrow-right ms-1"></i>
            </span>
          </div>
        </Card.Body>
      </Card>
    );
  };

  if (loadingNews) {
    return (
      <div style={{
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <Spinner animation="border" variant="success" />
          <p style={{ marginTop: '20px', color: '#6c757d' }}>Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
      minHeight: '100vh',
      scrollBehavior: 'smooth'
    }}>
      {/* ========== HERO SECTION ========== */}
      <div style={{
        position: 'relative',
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'linear-gradient(135deg, rgba(0,72,45,0.88) 0%, rgba(0,40,25,0.92) 100%), url(https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1920&h=1080&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        padding: '80px 20px',
        textAlign: 'center',
        color: '#fff',
        overflow: 'hidden'
      }}>
        <Container style={{ position: 'relative', zIndex: 2 }}>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div style={{
                display: 'inline-block',
                backgroundColor: 'rgba(255, 211, 38, 0.2)',
                padding: '8px 24px',
                borderRadius: '50px',
                marginBottom: '20px',
                border: '1px solid rgba(255, 211, 38, 0.3)'
              }}>
                <span style={{ color: '#FFD326', fontWeight: '600', letterSpacing: '1px', fontSize: '0.9rem' }}>
                  <i className="fas fa-flask me-2"></i>
                  RESEARCH & EXTENSION
                </span>
              </div>
              
              <h1 style={{
                fontSize: '3.5rem',
                fontWeight: '700',
                letterSpacing: '-0.02em',
                marginBottom: '20px',
                textShadow: '0 2px 20px rgba(0,0,0,0.3)'
              }}>
                Research &amp; Extension Services Office
              </h1>
              <p style={{
                fontSize: '1.2rem',
                opacity: 0.9,
                maxWidth: '700px',
                margin: '0 auto 30px',
                lineHeight: 1.7
              }}>
                Advancing knowledge, fostering innovation, and serving communities through research and extension.
              </p>
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="#content" style={{
                  backgroundColor: '#FFD326',
                  color: '#00482D',
                  padding: '14px 35px',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(255,211,38,0.3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
                onMouseEnter={(e) => { e.target.style.transform = 'scale(1.05)'; e.target.style.boxShadow = '0 8px 25px rgba(255,211,38,0.5)'; }}
                onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = '0 4px 15px rgba(255,211,38,0.3)'; }}>
                  <i className="fas fa-arrow-down"></i>
                  Explore Content
                </a>
              </div>
            </Col>
          </Row>
        </Container>
        <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          animation: 'bounceDown 2s infinite',
          fontSize: '2rem',
          color: 'rgba(255,255,255,0.5)'
        }}>
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>

      <Container style={{ padding: '60px 0' }}>
        {/* ========== INTRODUCTION ========== */}
        <Row className="mb-5 justify-content-center">
          <Col lg={10}>
            <Card style={{
              border: 'none',
              borderRadius: '20px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
              overflow: 'hidden',
              background: '#ffffff'
            }}>
              <Card.Body style={{ padding: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                  <div style={{
                    backgroundColor: '#FFD326',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.8rem',
                    color: '#00482D'
                  }}>
                    <i className="fas fa-flask"></i>
                  </div>
                  <h2 style={{ color: '#00482D', fontWeight: '700', margin: 0 }}>
                    Research &amp; Extension Services
                  </h2>
                </div>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#2d3748', textAlign: 'justify' }}>
                  The University of Southern Mindanao–Kidapawan City Campus (USM-KCC) Research and Extension Services Office provides guidance and support to students and faculty members in the development, implementation, and management of research studies, extension projects, trainings, and related activities. It promotes the application of research ethics, responsible conduct of research, scholarly publication, and protection of intellectual property rights.
                </p>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#2d3748', marginTop: '15px', textAlign: 'justify' }}>
                  The Research and Extension Services Office oversees the conduct of student thesis defenses, facilitates the implementation and monitoring of faculty research projects and extension initiatives within and beyond the campus, and provides assistance to faculty members and students in securing research ethics assessments, publishing research outputs in recognized academic journals, and processing intellectual property applications such as patents, copyrights, utility models, and industrial designs.
                </p>
                <div style={{
                  backgroundColor: '#f0faf0',
                  padding: '20px 25px',
                  borderRadius: '12px',
                  marginTop: '25px',
                  borderLeft: '5px solid #FFD326',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '15px'
                }}>
                  <i className="fas fa-quote-left" style={{ color: '#00482D', fontSize: '2rem', opacity: 0.5 }}></i>
                  <em style={{ fontSize: '1.05rem', color: '#00482D', fontStyle: 'italic' }}>
                    "Research and extension are twin pillars of academic excellence, transforming knowledge into action for community development."
                  </em>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* ========== RESEARCH & EXTENSION NEWS TABS ========== */}
        <div id="content" className="mb-5">
          <Row className="mb-4">
            <Col>
              <div style={{ textAlign: 'center' }}>
                <h2 style={{
                  color: '#00482D',
                  fontWeight: '700',
                  fontSize: '2.2rem',
                  display: 'inline-block',
                  position: 'relative',
                  marginBottom: '10px'
                }}>
                  <i className="fas fa-newspaper me-2" style={{ color: '#FFD326' }}></i>
                  News
                </h2>
                <div style={{
                  width: '80px',
                  height: '4px',
                  backgroundColor: '#FFD326',
                  margin: '0 auto',
                  borderRadius: '2px'
                }}></div>
                <p style={{ color: '#4a5568', marginTop: '15px', fontSize: '1.05rem' }}>
                  Stay updated with the latest research and extension news
                </p>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                <Nav variant="tabs" style={{
                  borderBottom: '2px solid #e9ecef',
                  justifyContent: 'center',
                  marginBottom: '30px'
                }}>
                  <Nav.Item>
                    <Nav.Link 
                      eventKey="research"
                      style={{
                        color: activeTab === 'research' ? '#00482D' : '#6c757d',
                        fontWeight: '600',
                        padding: '12px 30px',
                        border: 'none',
                        borderRadius: '8px 8px 0 0',
                        backgroundColor: activeTab === 'research' ? '#f8f9fa' : 'transparent',
                        borderBottom: activeTab === 'research' ? '3px solid #FFD326' : 'none'
                      }}
                    >
                      <i className="fas fa-flask me-2"></i>
                      Research News ({researchNews.length})
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      eventKey="extension"
                      style={{
                        color: activeTab === 'extension' ? '#00482D' : '#6c757d',
                        fontWeight: '600',
                        padding: '12px 30px',
                        border: 'none',
                        borderRadius: '8px 8px 0 0',
                        backgroundColor: activeTab === 'extension' ? '#f8f9fa' : 'transparent',
                        borderBottom: activeTab === 'extension' ? '3px solid #FFD326' : 'none'
                      }}
                    >
                      <i className="fas fa-hands-helping me-2"></i>
                      Extension News ({extensionNews.length})
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content>
                  {/* RESEARCH TAB */}
                  <Tab.Pane eventKey="research">
                    <Row>
                      {researchNews.length > 0 ? (
                        researchNews.map(item => (
                          <Col key={item.id} md={6} lg={4} className="mb-4">
                            <NewsCard item={item} />
                          </Col>
                        ))
                      ) : (
                        <Col>
                          <div style={{
                            textAlign: 'center',
                            padding: '60px 20px',
                            backgroundColor: '#fff',
                            borderRadius: '12px'
                          }}>
                            <i className="fas fa-flask" style={{ fontSize: '3rem', color: '#dee2e6' }}></i>
                            <p style={{ color: '#6c757d', marginTop: '15px' }}>
                              No research news available yet.
                            </p>
                            <p style={{ color: '#adb5bd', fontSize: '0.9rem' }}>
                              Check back later for updates on research activities and initiatives.
                            </p>
                          </div>
                        </Col>
                      )}
                    </Row>
                  </Tab.Pane>

                  {/* EXTENSION TAB */}
                  <Tab.Pane eventKey="extension">
                    <Row>
                      {extensionNews.length > 0 ? (
                        extensionNews.map(item => (
                          <Col key={item.id} md={6} lg={4} className="mb-4">
                            <NewsCard item={item} />
                          </Col>
                        ))
                      ) : (
                        <Col>
                          <div style={{
                            textAlign: 'center',
                            padding: '60px 20px',
                            backgroundColor: '#fff',
                            borderRadius: '12px'
                          }}>
                            <i className="fas fa-hands-helping" style={{ fontSize: '3rem', color: '#dee2e6' }}></i>
                            <p style={{ color: '#6c757d', marginTop: '15px' }}>
                              No extension news available yet.
                            </p>
                            <p style={{ color: '#adb5bd', fontSize: '0.9rem' }}>
                              Check back later for updates on extension programs and community initiatives.
                            </p>
                          </div>
                        </Col>
                      )}
                    </Row>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Col>
          </Row>
        </div>

        {/* ========== DOWNLOADABLE TEMPLATES SECTION - REDESIGNED ========== */}
        <div className="mb-5">
          <Row className="mb-4">
            <Col>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #00482D, #006641)',
                  marginBottom: '1rem',
                  boxShadow: '0 4px 15px rgba(0,72,45,0.2)'
                }}>
                  <i className="fas fa-file-download" style={{ fontSize: '1.8rem', color: '#FFD326' }}></i>
                </div>
                <h2 style={{
                  color: '#00482D',
                  fontWeight: '700',
                  fontSize: '2.2rem',
                  display: 'inline-block',
                  position: 'relative',
                  marginBottom: '10px'
                }}>
                  Downloadable Templates
                </h2>
                <div style={{
                  width: '80px',
                  height: '4px',
                  backgroundColor: '#FFD326',
                  margin: '0 auto',
                  borderRadius: '2px'
                }}></div>
                <p style={{ color: '#4a5568', marginTop: '15px', fontSize: '1.05rem' }}>
                  Access thesis guides, proposal templates, and manuscript templates
                </p>
                <div className="mt-3 d-flex flex-wrap justify-content-center gap-2">
                  <Button 
                    variant={showTemplates ? 'usmkc-green' : 'outline-usmkc-green'}
                    className="rounded-pill px-4 py-2"
                    onClick={() => setShowTemplates(!showTemplates)}
                    style={{ 
                      backgroundColor: showTemplates ? '#00482D' : 'transparent', 
                      borderColor: '#00482D', 
                      color: showTemplates ? '#fff' : '#00482D',
                      fontWeight: '500',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <i className={`fas ${showTemplates ? 'fa-chevron-up' : 'fa-chevron-down'} me-2`}></i>
                    {showTemplates ? 'Hide Templates' : 'Show Templates'} 
                    <Badge bg={showTemplates ? 'light' : 'secondary'} className="ms-1" style={{ color: showTemplates ? '#00482D' : '#fff' }}>
                      {templates.length}
                    </Badge>
                  </Button>
                  <Link to="/downloadable-forms">
                    <Button 
                      variant="outline-usmkc-green" 
                      className="rounded-pill px-4 py-2"
                      style={{ fontWeight: '500' }}
                    >
                      <i className="fas fa-arrow-right me-2"></i>
                      View All Templates
                    </Button>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>

          {showTemplates && (
            <Row>
              <Col>
                <Card style={{
                  border: 'none',
                  borderRadius: '20px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                  overflow: 'hidden',
                  background: '#ffffff'
                }}>
                  <Card.Body className="p-4">
                    {/* Search Bar */}
                    <div className="mb-4">
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
                    </div>

                    {/* Category Filter - Modern Design */}
                    <div className="mb-4">
                      <div className="d-flex flex-wrap gap-2">
                        <Button 
                          variant={selectedCategory === 'all' ? 'usmkc-green' : 'outline-secondary'}
                          size="sm"
                          className="rounded-pill px-3 py-1"
                          onClick={() => setSelectedCategory('all')}
                          style={{ 
                            backgroundColor: selectedCategory === 'all' ? '#00482D' : 'transparent',
                            borderColor: selectedCategory === 'all' ? '#00482D' : '#6c757d',
                            color: selectedCategory === 'all' ? '#fff' : '#6c757d',
                            fontWeight: '500',
                            fontSize: '0.8rem'
                          }}
                        >
                          <i className="fas fa-th-large me-1"></i>
                          All
                          <Badge 
                            bg={selectedCategory === 'all' ? 'light' : 'secondary'} 
                            className="ms-1"
                            style={{ 
                              color: selectedCategory === 'all' ? '#00482D' : '#fff',
                              fontSize: '0.6rem',
                              padding: '2px 6px'
                            }}
                          >
                            {templates.length}
                          </Badge>
                        </Button>
                        {getTemplateCategories().filter(c => c !== 'all').map(cat => {
                          const count = templates.filter(t => t.category === cat).length;
                          if (count === 0) return null;
                          return (
                            <Button 
                              key={cat}
                              variant={selectedCategory === cat ? 'usmkc-green' : 'outline-secondary'}
                              size="sm"
                              className="rounded-pill px-3 py-1"
                              onClick={() => setSelectedCategory(cat)}
                              style={{ 
                                backgroundColor: selectedCategory === cat ? '#00482D' : 'transparent',
                                borderColor: selectedCategory === cat ? '#00482D' : '#6c757d',
                                color: selectedCategory === cat ? '#fff' : '#6c757d',
                                fontWeight: '500',
                                fontSize: '0.8rem',
                                transition: 'all 0.3s ease'
                              }}
                            >
                              {getCategoryLabel(cat)}
                              <Badge 
                                bg={selectedCategory === cat ? 'light' : 'secondary'} 
                                className="ms-1"
                                style={{ 
                                  color: selectedCategory === cat ? '#00482D' : '#fff',
                                  fontSize: '0.6rem',
                                  padding: '2px 6px'
                                }}
                              >
                                {count}
                              </Badge>
                            </Button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Templates Grid */}
                    {loadingTemplates ? (
                      <div className="text-center py-4">
                        <Spinner animation="border" variant="success" />
                        <p className="mt-2 text-muted">Loading templates...</p>
                      </div>
                    ) : getFilteredTemplates().length > 0 ? (
                      <Row className="g-4">
                        {getFilteredTemplates().map(template => (
                          <Col key={template.id} md={6} lg={4}>
                            <TemplateCard template={template} />
                          </Col>
                        ))}
                      </Row>
                    ) : (
                      <div className="text-center py-5">
                        <div style={{
                          width: '80px',
                          height: '80px',
                          borderRadius: '50%',
                          backgroundColor: '#f8f9fa',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 1rem'
                        }}>
                          <i className="fas fa-file-alt" style={{ fontSize: '2.5rem', color: '#dee2e6' }}></i>
                        </div>
                        <p className="text-muted">
                          {searchTerm ? 'No templates match your search.' : 'No templates available in this category.'}
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

                    {/* View All Link */}
                    {getFilteredTemplates().length > 0 && (
                      <div className="text-center mt-4">
                        <Link to="/downloadable-forms">
                          <Button 
                            variant="outline-usmkc-green" 
                            className="rounded-pill px-4"
                            style={{ fontWeight: '500' }}
                          >
                            <i className="fas fa-arrow-right me-2"></i>
                            View All Templates ({templates.length})
                          </Button>
                        </Link>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </div>

        {/* ========== ACTIVITIES & INITIATIVES GALLERY ========== */}
        <div id="gallery" className="mb-5">
          <Row className="mb-4">
            <Col>
              <div style={{ textAlign: 'center' }}>
                <h2 style={{
                  color: '#00482D',
                  fontWeight: '700',
                  fontSize: '2.2rem',
                  display: 'inline-block',
                  position: 'relative',
                  marginBottom: '10px'
                }}>
                  <i className="fas fa-images me-2" style={{ color: '#FFD326' }}></i>
                  Activities &amp; Initiatives
                </h2>
                <div style={{
                  width: '80px',
                  height: '4px',
                  backgroundColor: '#FFD326',
                  margin: '0 auto',
                  borderRadius: '2px'
                }}></div>
                <p style={{ color: '#4a5568', marginTop: '15px', fontSize: '1.05rem' }}>
                  {images.length} activities available - Click any image to view in full size
                </p>
              </div>
            </Col>
          </Row>

          <Row className="g-3 g-md-4">
            {images.map((image, index) => (
              <Col key={image.id} xs={6} sm={4} md={3} lg={2.4} style={{
                animation: 'fadeInUp 0.5s ease forwards',
                animationDelay: `${Math.min(index * 0.03, 0.8)}s`,
                opacity: 0
              }}>
                <div
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '14px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    backgroundColor: '#f0f0f0',
                    paddingTop: '100%',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(0,0,0,0.18)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                  }}
                  onClick={() => openImageModal(image.url)}
                >
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}>
                    {!loadedImages[image.id] && !imageErrors[image.id] && (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#e9ecef',
                        color: '#adb5bd'
                      }}>
                        <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem' }}></i>
                      </div>
                    )}
                    <img
                      src={imageErrors[image.id] ? getPlaceholderUrl(image.title) : image.url}
                      alt={image.title}
                      loading="lazy"
                      onLoad={() => handleImageLoad(image.id)}
                      onError={() => handleImageError(image.id)}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: loadedImages[image.id] || imageErrors[image.id] ? 'block' : 'none'
                      }}
                    />
                  </div>
                  
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '12px 14px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                    color: '#fff',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = 0}>
                    {image.title}
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          <Row className="mt-4">
            <Col>
              <div style={{
                textAlign: 'center',
                color: '#6c757d',
                fontSize: '0.95rem',
                padding: '15px',
                backgroundColor: '#fff',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
              }}>
                <i className="fas fa-images me-2" style={{ color: '#00482D' }}></i>
                Showing {images.length} activities and initiatives
                {Object.keys(imageErrors).length > 0 && (
                  <span style={{ color: '#dc3545', marginLeft: '10px' }}>
                    <i className="fas fa-exclamation-circle me-1"></i>
                    {Object.keys(imageErrors).length} images loading with fallback
                  </span>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </Container>

      {/* ========== ARTICLE VIEW MODAL - Professional Design ========== */}
      <Modal 
        show={showArticleModal} 
        onHide={closeArticleModal}
        size="lg"
        centered
        scrollable
        className="article-modal"
      >
        <Modal.Header closeButton style={{ 
          backgroundColor: '#00482D', 
          color: '#ffffff', 
          borderBottom: '3px solid #FFD326',
          padding: '20px 30px'
        }}>
          <Modal.Title style={{ fontWeight: '700', fontSize: '1.3rem' }}>
            <i className="fas fa-newspaper me-2" style={{ color: '#FFD326' }}></i>
            {selectedArticle?.title || 'Article'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '30px' }}>
          {selectedArticle && (
            <>
              {/* Article Meta Info */}
              <div className="mb-4 d-flex flex-wrap gap-2 align-items-center">
                <span style={{ color: '#6c757d', fontSize: '0.9rem' }}>
                  <i className="far fa-calendar-alt me-1"></i>
                  {new Date(selectedArticle.created_at || selectedArticle.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <Badge 
                  bg={selectedArticle.category?.toLowerCase() === 'extension' ? 'success' : 'primary'} 
                  style={{ padding: '6px 14px', borderRadius: '20px', fontSize: '0.75rem' }}
                >
                  <i className={`fas ${selectedArticle.category?.toLowerCase() === 'extension' ? 'fa-hands-helping' : 'fa-flask'} me-1`}></i>
                  {selectedArticle.category || 'General'}
                </Badge>
                {selectedArticle.showOnReso && (
                  <Badge bg="success" style={{ padding: '6px 14px', borderRadius: '20px', fontSize: '0.75rem' }}>
                    <i className="fas fa-flask me-1"></i>
                    RESO
                  </Badge>
                )}
                {selectedArticle.images && selectedArticle.images.length > 0 && (
                  <Badge bg="info" style={{ padding: '6px 14px', borderRadius: '20px', fontSize: '0.75rem' }}>
                    <i className="fas fa-image me-1"></i>
                    {selectedArticle.images.length} images
                  </Badge>
                )}
              </div>

              {/* Article Images - Professional Gallery */}
              {selectedArticle.images && selectedArticle.images.length > 0 && (
                <div className="mb-4">
                  <div className="d-flex flex-wrap gap-2">
                    {selectedArticle.images.map((img, idx) => (
                      <div 
                        key={idx}
                        style={{
                          flex: idx === 0 ? '0 0 100%' : '0 0 calc(50% - 8px)',
                          maxWidth: idx === 0 ? '100%' : 'calc(50% - 8px)',
                          position: 'relative',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                        }}
                        onClick={() => openImageModal(img)}
                      >
                        <img 
                          src={img} 
                          alt={`Article image ${idx + 1}`}
                          style={{
                            width: '100%',
                            maxHeight: idx === 0 ? '450px' : '280px',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.02)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1)';
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <div style={{
                          position: 'absolute',
                          bottom: '10px',
                          right: '10px',
                          backgroundColor: 'rgba(0,0,0,0.6)',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '0.7rem',
                          color: '#fff',
                          backdropFilter: 'blur(4px)'
                        }}>
                          <i className="fas fa-search-plus me-1"></i>
                          Click to enlarge
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Article Content */}
              <div style={{ 
                fontSize: '1.05rem', 
                lineHeight: '1.8', 
                color: '#2d3748'
              }}>
                {selectedArticle.content || selectedArticle.description || 'No content available.'}
              </div>

              {/* SDG Tags */}
              {selectedArticle.sdg_tags && selectedArticle.sdg_tags.length > 0 && (
                <div className="mt-4 pt-3" style={{ borderTop: '1px solid #e9ecef' }}>
                  <h6 style={{ color: '#00482D', fontWeight: '700', fontSize: '1rem' }}>
                    <i className="fas fa-globe-americas me-2" style={{ color: '#FFD326' }}></i>
                    Sustainable Development Goals
                  </h6>
                  <div className="d-flex flex-wrap gap-2">
                    {selectedArticle.sdg_tags.map(tag => {
                      const sdg = sdgGoals.find(g => g.id === tag);
                      return (
                        <Badge 
                          key={tag}
                          style={{ 
                            backgroundColor: sdg?.color || '#6c757d', 
                            color: '#fff',
                            padding: '8px 16px',
                            fontSize: '0.8rem',
                            borderRadius: '20px',
                            fontWeight: '500'
                          }}
                        >
                          SDG {tag}: {sdg?.title || ''}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer style={{ 
          borderTop: '1px solid #e9ecef',
          padding: '16px 30px'
        }}>
          <Button 
            variant="secondary" 
            onClick={closeArticleModal}
            style={{ borderRadius: '50px', padding: '8px 24px' }}
          >
            <i className="fas fa-times me-2"></i>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ========== IMAGE LIGHTBOX MODAL ========== */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
            cursor: 'pointer',
            animation: 'fadeIn 0.3s ease'
          }}
          onClick={closeImageModal}
        >
          <button
            onClick={closeImageModal}
            style={{
              position: 'absolute',
              top: '25px',
              right: '35px',
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '3rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              zIndex: 10000,
              opacity: 0.8
            }}
            onMouseEnter={(e) => { e.target.style.transform = 'scale(1.2)'; e.target.style.opacity = 1; }}
            onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.opacity = 0.8; }}
          >
            ✕
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              const currentIndex = images.findIndex(img => img.url === selectedImage);
              if (currentIndex > 0) {
                setSelectedImage(images[currentIndex - 1].url);
              }
            }}
            style={{
              position: 'absolute',
              left: '30px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              color: '#fff',
              fontSize: '2.5rem',
              padding: '15px 20px',
              borderRadius: '50%',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              display: images.findIndex(img => img.url === selectedImage) > 0 ? 'block' : 'none'
            }}
            onMouseEnter={(e) => { e.target.style.background = 'rgba(255,255,255,0.3)'; }}
            onMouseLeave={(e) => { e.target.style.background = 'rgba(255,255,255,0.15)'; }}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <img
            src={selectedImage}
            alt="Full view"
            style={{
              maxWidth: '85vw',
              maxHeight: '85vh',
              objectFit: 'contain',
              borderRadius: '12px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
              cursor: 'default',
              animation: 'zoomIn 0.3s ease'
            }}
            onClick={(e) => e.stopPropagation()}
            onError={(e) => {
              e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23333'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='Arial' font-size='24' fill='%23666'%3EImage%20Not%20Found%3C/text%3E%3C/svg%3E`;
            }}
          />
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              const currentIndex = images.findIndex(img => img.url === selectedImage);
              if (currentIndex < images.length - 1) {
                setSelectedImage(images[currentIndex + 1].url);
              }
            }}
            style={{
              position: 'absolute',
              right: '30px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              color: '#fff',
              fontSize: '2.5rem',
              padding: '15px 20px',
              borderRadius: '50%',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              display: images.findIndex(img => img.url === selectedImage) < images.length - 1 ? 'block' : 'none'
            }}
            onMouseEnter={(e) => { e.target.style.background = 'rgba(255,255,255,0.3)'; }}
            onMouseLeave={(e) => { e.target.style.background = 'rgba(255,255,255,0.15)'; }}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
          
          <div style={{
            position: 'absolute',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.6)',
            fontSize: '0.9rem',
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: '8px 20px',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)'
          }}>
            {images.findIndex(img => img.url === selectedImage) + 1} / {images.length}
          </div>
        </div>
      )}

      {/* ========== FOOTER ========== */}
      <footer style={{
        backgroundColor: '#002b1c',
        color: 'rgba(255,255,255,0.7)',
        padding: '30px 0',
        marginTop: '20px'
      }}>
        <Container>
          <Row className="align-items-center">
            <Col md={6} style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '0.95rem' }}>
                &copy; {new Date().getFullYear()} USM-KCC Research &amp; Extension Services Office.
              </span>
            </Col>
            <Col md={6} style={{ textAlign: 'right' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
                <Link to="/downloadable-forms" style={{ color: 'rgba(255,255,255,0.6)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#FFD326'} onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}>
                  <i className="fas fa-file-download me-1"></i> Templates
                </Link>
                <a href="#" style={{ color: 'rgba(255,255,255,0.6)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#FFD326'} onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}><i className="fab fa-facebook-f"></i></a>
                <a href="#" style={{ color: 'rgba(255,255,255,0.6)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#FFD326'} onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}><i className="fab fa-twitter"></i></a>
                <a href="#" style={{ color: 'rgba(255,255,255,0.6)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#FFD326'} onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}><i className="fab fa-youtube"></i></a>
                <a href="#" style={{ color: 'rgba(255,255,255,0.6)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#FFD326'} onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}><i className="fab fa-instagram"></i></a>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoomIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes bounceDown {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
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
        
        /* Article Modal Styles */
        .article-modal .modal-content {
          border-radius: 20px;
          overflow: hidden;
          border: none;
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        }
        
        .article-modal .modal-header {
          border-bottom: 3px solid #FFD326;
        }
        
        .article-modal .modal-header .btn-close {
          filter: brightness(0) invert(1);
          opacity: 0.8;
        }
        
        .article-modal .modal-header .btn-close:hover {
          opacity: 1;
        }
        
        .article-modal .modal-body {
          max-height: 80vh;
          overflow-y: auto;
        }
        
        .article-modal .modal-body::-webkit-scrollbar {
          width: 6px;
        }
        
        .article-modal .modal-body::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        
        .article-modal .modal-body::-webkit-scrollbar-thumb {
          background: #00482D;
          border-radius: 3px;
        }
        
        .article-modal .modal-body::-webkit-scrollbar-thumb:hover {
          background: #002b1c;
        }
        
        @media (min-width: 1200px) {
          .col-lg-2-4 {
            flex: 0 0 20%;
            max-width: 20%;
          }
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
          background: #00482D;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #002b1c;
        }
        
        html { scroll-behavior: smooth; }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .display-4 {
            font-size: 2.5rem !important;
          }
          .container {
            padding: 0 15px;
          }
          .card-body {
            padding: 20px !important;
          }
          .article-modal .modal-body {
            max-height: 70vh;
          }
        }
        @media (max-width: 576px) {
          .display-4 {
            font-size: 2rem !important;
          }
          h1 {
            font-size: 2rem !important;
          }
          h2 {
            font-size: 1.6rem !important;
          }
          .article-modal .modal-body {
            max-height: 60vh;
          }
        }
      `}</style>
    </div>
  );
};

export default ResearchExtensionPage;