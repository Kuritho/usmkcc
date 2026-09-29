// src/components/NewsDetail.js - Full-Screen with Duplicated First Image

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner, Badge } from 'react-bootstrap';
import { supabase } from '../supabase/supabaseClient';
import SDGTags from './SDGTags';
import SEO from './SEO';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);
  const [seoData, setSeoData] = useState({});
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [bodyImages, setBodyImages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [processedContent, setProcessedContent] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    loadContent();
  }, [id, location.pathname]);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log('Fullscreen error:', err);
      });
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const loadContent = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const path = location.pathname;
      let result;
      
      if (path.includes('/announcement/')) {
        result = await fetchFromTable('announcements', id);
      } else if (path.includes('/event/')) {
        result = await fetchFromTable('events', id);
      } else {
        result = await fetchFromTable('news', id);
      }
      
      if (result.success && result.data) {
        setContent(result.data);
        
        const images = processImages(result.data);
        setThumbnailImage(images.thumbnail);
        setBodyImages(images.bodyImages);
        setGalleryImages(images.galleryImages);
        
        const processed = processContentWithImages(
          result.data.content || result.data.description || '', 
          images.bodyImages,
          images.thumbnail // Pass the thumbnail for duplication
        );
        setProcessedContent(processed);
        
        const imageUrl = images.thumbnail || getImageUrl(result.data.image_url);
        const title = result.data.title;
        const description = result.data.summary || result.data.content?.substring(0, 160) || '';
        const publishedDate = result.data.date || result.data.created_at;
        const contentType = path.includes('/announcement/') ? 'announcement' : 
                           path.includes('/event/') ? 'event' : 'article';
        
        setSeoData({
          title: title,
          description: description,
          image: imageUrl,
          url: window.location.href,
          publishedTime: publishedDate,
          modifiedTime: publishedDate,
          type: contentType,
          keywords: result.data.tags || 'USM-KCC, education, Mindanao'
        });
      } else {
        setError(result.error || 'Content not found');
      }
    } catch (error) {
      console.error('Error loading content:', error);
      setError('An error occurred while loading the content.');
    } finally {
      setLoading(false);
    }
  };

  const fetchFromTable = async (table, id) => {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) {
        console.error(`Error fetching from ${table}:`, error);
        return { success: false, error: error.message };
      }
      
      if (!data) {
        return { success: false, error: 'No data found' };
      }
      
      return { success: true, data };
    } catch (error) {
      console.error(`Exception fetching from ${table}:`, error);
      return { success: false, error: error.message };
    }
  };

  const getImageUrl = (imageUrl) => {
    const siteUrl = process.env.REACT_APP_SITE_URL || 'https://usmkcc.edu.ph';
    
    if (!imageUrl) {
      return `${siteUrl}/images/usm-logo.png`;
    }
    
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    if (imageUrl.startsWith('/')) {
      return `${siteUrl}${imageUrl}`;
    }
    
    try {
      const { data: { publicUrl } } = supabase.storage
        .from('news-images')
        .getPublicUrl(imageUrl);
      return publicUrl || `${siteUrl}/images/usm-logo.png`;
    } catch (error) {
      console.error('Error getting public URL:', error);
      return `${siteUrl}/images/usm-logo.png`;
    }
  };

  const processImages = (data) => {
    const siteUrl = process.env.REACT_APP_SITE_URL || 'https://usmkcc.edu.ph';
    let thumbnail = null;
    const bodyImages = [];
    const galleryImages = [];

    const processImage = (img) => {
      if (!img) return null;
      if (img.startsWith('http://') || img.startsWith('https://')) {
        return img;
      }
      if (img.startsWith('/')) {
        return `${siteUrl}${img}`;
      }
      try {
        const { data: { publicUrl } } = supabase.storage
          .from('news-images')
          .getPublicUrl(img);
        return publicUrl || null;
      } catch {
        return null;
      }
    };

    let allImages = [];
    if (data.images && Array.isArray(data.images) && data.images.length > 0) {
      allImages = data.images.map(img => processImage(img)).filter(img => img !== null);
    } else if (data.image_url) {
      const img = processImage(data.image_url);
      if (img) allImages.push(img);
    }

    if (allImages.length === 0) {
      allImages.push(`${siteUrl}/images/usm-logo.png`);
    }

    // Get thumbnail (first image)
    thumbnail = allImages[0];
    
    // Get remaining images (excluding the first one)
    const remainingImages = allImages.slice(1);
    
    // For body images: Duplicate the FIRST image (thumbnail) as the first body image
    // Then add up to 2 more images from the remaining images
    bodyImages.push(thumbnail); // Always duplicate the first image
    
    // Add up to 2 more images from the remaining images
    const additionalBodyCount = Math.min(2, remainingImages.length);
    for (let i = 0; i < additionalBodyCount; i++) {
      bodyImages.push(remainingImages[i]);
    }
    
    // The rest go to gallery (starting from where we left off)
    // Skip the first image (thumbnail) and the images already used in body
    const galleryStartIndex = additionalBodyCount;
    for (let i = galleryStartIndex; i < remainingImages.length; i++) {
      galleryImages.push(remainingImages[i]);
    }

    return { thumbnail, bodyImages, galleryImages };
  };

  const processContentWithImages = (content, images, thumbnail) => {
    if (!content) return '';
    
    let processed = content;
    
    // Always insert the thumbnail as the first image in the content if we have a thumbnail
    const allContentImages = [...images];
    
    if (allContentImages.length > 0) {
      let paragraphs = processed.split(/\n\s*\n/).filter(p => p.trim());
      
      paragraphs = paragraphs.map(p => {
        let cleaned = p.replace(/\[Image\s*[:]?\s*\d+\]/gi, '').trim();
        cleaned = cleaned.replace(/\s+/g, ' ');
        return cleaned;
      }).filter(p => p.length > 0);
      
      let result = [];
      let imageIndex = 0;
      
      for (let i = 0; i < paragraphs.length; i++) {
        const paragraph = paragraphs[i];
        
        result.push(`<p class="article-paragraph">${paragraph}</p>`);
        
        if (imageIndex < allContentImages.length) {
          const shouldInsertImage = (
            (i === 0 && imageIndex === 0) || // First image after first paragraph
            (i > 0 && i % 2 === 0 && imageIndex < allContentImages.length) // Every 2 paragraphs
          );
          
          const originalParagraph = processed.split(/\n\s*\n/).filter(p => p.trim())[i] || '';
          const hasImageMarker = /\[Image\s*[:]?\s*\d+\]/i.test(originalParagraph);
          
          if (shouldInsertImage || hasImageMarker) {
            let imgIndex = imageIndex;
            const markerMatch = originalParagraph.match(/\[Image\s*[:]?\s*(\d+)\]/i);
            if (markerMatch) {
              const specifiedIndex = parseInt(markerMatch[1]) - 1;
              if (specifiedIndex >= 0 && specifiedIndex < allContentImages.length) {
                imgIndex = specifiedIndex;
              }
            }
            
            if (imgIndex < allContentImages.length) {
              const imageSrc = allContentImages[imgIndex];
              result.push(`
                <div class="content-image-wrapper-full" data-image-src="${imageSrc}" data-image-alt="Image ${imgIndex + 1}">
                  <div class="content-image-container-full">
                    <img src="${imageSrc}" alt="Image ${imgIndex + 1}" class="content-image-full" loading="lazy" onerror="this.src='/images/usm-logo.png'" />
                    <div class="content-image-overlay">
                      <i class="fas fa-search-plus"></i>
                      <span>Click to zoom</span>
                    </div>
                  </div>
                </div>
              `);
              imageIndex++;
            }
          }
        }
      }
      
      // Add remaining images at the end
      while (imageIndex < allContentImages.length) {
        const imageSrc = allContentImages[imageIndex];
        result.push(`
          <div class="content-image-wrapper-full" data-image-src="${imageSrc}" data-image-alt="Image ${imageIndex + 1}">
            <div class="content-image-container-full">
              <img src="${imageSrc}" alt="Image ${imageIndex + 1}" class="content-image-full" loading="lazy" onerror="this.src='/images/usm-logo.png'" />
              <div class="content-image-overlay">
                <i class="fas fa-search-plus"></i>
                <span>Click to zoom</span>
              </div>
            </div>
          </div>
        `);
        imageIndex++;
      }
      
      processed = result.join('\n');
    } else {
      const paragraphs = processed.split(/\n\s*\n/).filter(p => p.trim());
      const formattedParagraphs = paragraphs.map(p => {
        const cleaned = p.replace(/\s+/g, ' ').trim();
        return `<p class="article-paragraph">${cleaned}</p>`;
      });
      processed = formattedParagraphs.join('\n');
    }
    
    return processed;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    try {
      const date = new Date(dateString);
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const month = months[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();
      return `${month} ${day}, ${year}`;
    } catch {
      return dateString;
    }
  };

  const handleFacebookShare = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    const toast = document.createElement('div');
    toast.className = 'copy-toast';
    toast.innerHTML = 'Link copied to clipboard!';
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 300);
      }, 2000);
    }, 100);
  };

  const openImageModal = (imageSrc, imageAlt) => {
    const existingModal = document.querySelector('.image-modal');
    if (existingModal) {
      document.body.removeChild(existingModal);
    }

    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
      <div class="image-modal-content">
        <button class="image-modal-close">&times;</button>
        <div class="image-modal-image-wrapper">
          <img src="${imageSrc}" alt="${imageAlt || 'Image'}" class="image-modal-image" />
        </div>
        <div class="image-modal-caption">${imageAlt || 'Image'}</div>
        <div class="image-modal-nav">
          <span class="image-modal-zoom-in" title="Zoom In (+)" data-action="zoom-in"><i class="fas fa-search-plus"></i></span>
          <span class="image-modal-zoom-out" title="Zoom Out (-)" data-action="zoom-out"><i class="fas fa-search-minus"></i></span>
          <span class="image-modal-reset" title="Reset (0)" data-action="reset"><i class="fas fa-undo"></i></span>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    
    const img = modal.querySelector('.image-modal-image');
    const closeBtn = modal.querySelector('.image-modal-close');
    const zoomInBtn = modal.querySelector('.image-modal-zoom-in');
    const zoomOutBtn = modal.querySelector('.image-modal-zoom-out');
    const resetBtn = modal.querySelector('.image-modal-reset');
    
    let currentZoom = 1;
    const zoomStep = 0.2;
    let isDragging = false;
    let startX, startY, translateX = 0, translateY = 0;
    
    const closeModal = () => {
      if (document.body.contains(modal)) {
        document.body.removeChild(modal);
      }
      document.removeEventListener('keydown', keyHandler);
    };
    
    const zoomIn = () => {
      currentZoom = Math.min(currentZoom + zoomStep, 3);
      updateTransform();
    };
    
    const zoomOut = () => {
      currentZoom = Math.max(currentZoom - zoomStep, 0.5);
      if (currentZoom === 0.5) {
        translateX = 0;
        translateY = 0;
      }
      updateTransform();
    };
    
    const resetZoom = () => {
      currentZoom = 1;
      translateX = 0;
      translateY = 0;
      updateTransform();
    };
    
    const updateTransform = () => {
      img.style.transform = `scale(${currentZoom}) translate(${translateX}px, ${translateY}px)`;
      img.style.cursor = currentZoom > 1 ? 'grab' : 'default';
    };
    
    closeBtn.onclick = closeModal;
    
    zoomInBtn.onclick = (e) => {
      e.stopPropagation();
      zoomIn();
    };
    
    zoomOutBtn.onclick = (e) => {
      e.stopPropagation();
      zoomOut();
    };
    
    resetBtn.onclick = (e) => {
      e.stopPropagation();
      resetZoom();
    };
    
    img.onmousedown = (e) => {
      if (currentZoom > 1) {
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        img.style.cursor = 'grabbing';
      }
    };
    
    document.onmousemove = (e) => {
      if (isDragging) {
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        updateTransform();
      }
    };
    
    document.onmouseup = () => {
      if (isDragging) {
        isDragging = false;
        img.style.cursor = currentZoom > 1 ? 'grab' : 'default';
      }
    };
    
    let touchStartX, touchStartY, touchTranslateX, touchTranslateY;
    
    img.ontouchstart = (e) => {
      if (currentZoom > 1) {
        const touch = e.touches[0];
        touchStartX = touch.clientX - translateX;
        touchStartY = touch.clientY - translateY;
        touchTranslateX = translateX;
        touchTranslateY = translateY;
      }
    };
    
    img.ontouchmove = (e) => {
      if (currentZoom > 1) {
        const touch = e.touches[0];
        translateX = touch.clientX - touchStartX;
        translateY = touch.clientY - touchStartY;
        updateTransform();
      }
    };
    
    const keyHandler = (e) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === '+' || e.key === '=') zoomIn();
      if (e.key === '-') zoomOut();
      if (e.key === '0') resetZoom();
    };
    
    document.addEventListener('keydown', keyHandler);
    
    modal.onclick = (e) => {
      if (e.target === modal) closeModal();
    };
  };

  const handleImageClick = (e) => {
    const target = e.target.closest('.content-image-wrapper-full');
    if (target) {
      const imageSrc = target.getAttribute('data-image-src');
      const imageAlt = target.getAttribute('data-image-alt') || 'Image';
      if (imageSrc) {
        openImageModal(imageSrc, imageAlt);
        e.preventDefault();
      }
    }
    
    const hero = e.target.closest('.hero-fullscreen-section');
    if (hero) {
      const img = hero.querySelector('.hero-image-fullscreen');
      if (img) {
        openImageModal(img.src, content?.title || 'Article thumbnail');
        e.preventDefault();
      }
    }
    
    const galleryItem = e.target.closest('.gallery-item-fullscreen');
    if (galleryItem) {
      const img = galleryItem.querySelector('.gallery-image-fullscreen');
      if (img) {
        openImageModal(img.src, 'Gallery image');
        e.preventDefault();
      }
    }
  };

  const renderContentWithImages = () => {
    if (!processedContent) return null;
    
    return (
      <div 
        className="article-content-full"
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />
    );
  };

  if (loading) {
    return (
      <div className="fullscreen-loader">
        <Spinner animation="border" variant="success" />
        <p className="mt-3">Loading content...</p>
      </div>
    );
  }

  if (error || !content) {
    return (
      <Container className="py-5">
        <Row>
          <Col md={8} className="mx-auto">
            <Card className="text-center">
              <Card.Body className="py-5">
                <i className="fas fa-exclamation-triangle" style={{ fontSize: '3rem', color: '#ffc107' }}></i>
                <h3 className="mt-3">Content Not Found</h3>
                <p className="text-muted">{error || 'The requested content could not be found.'}</p>
                <Button variant="success" onClick={() => navigate('/campus-updates')}>
                  <i className="fas fa-arrow-left me-2"></i>
                  Back to Campus Updates
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <>
      <SEO 
        title={seoData.title}
        description={seoData.description}
        image={seoData.image}
        url={seoData.url}
        type={seoData.type}
        publishedTime={seoData.publishedTime}
        modifiedTime={seoData.modifiedTime}
        keywords={seoData.keywords}
      />

      <div className={`article-fullscreen-wrapper ${isFullScreen ? 'fullscreen-active' : ''}`}>
        {/* Floating Controls */}
        <div className="floating-controls">
          <button 
            className="floating-btn back-btn"
            onClick={() => navigate('/campus-updates')}
            title="Go Back"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <button 
            className="floating-btn fullscreen-btn"
            onClick={toggleFullScreen}
            title={isFullScreen ? 'Exit Full Screen' : 'Enter Full Screen'}
          >
            <i className={`fas ${isFullScreen ? 'fa-compress' : 'fa-expand'}`}></i>
          </button>
          <button 
            className="floating-btn share-btn"
            onClick={handleFacebookShare}
            title="Share on Facebook"
          >
            <i className="fab fa-facebook-f"></i>
          </button>
          <button 
            className="floating-btn copy-btn"
            onClick={handleCopyLink}
            title="Copy Link"
          >
            <i className="fas fa-link"></i>
          </button>
        </div>

        <Container fluid className="px-0">
          <div className="article-fullscreen-container" onClick={handleImageClick}>
            {/* Hero Section - FULL SCREEN MAXIMIZED */}
            {thumbnailImage && (
              <div className="hero-fullscreen-section">
                <div className="hero-image-wrapper">
                  <img 
                    src={thumbnailImage} 
                    alt={content.title || 'Article thumbnail'}
                    className="hero-image-fullscreen"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/usm-logo.png';
                    }}
                  />
                  <div className="hero-overlay-gradient"></div>
                  <div className="hero-content-overlay">
                    <div className="hero-badges">
                      {location.pathname.includes('/announcement/') && (
                        <span className="hero-badge announcement">Announcement</span>
                      )}
                      {location.pathname.includes('/news/') && (
                        <span className="hero-badge news">News</span>
                      )}
                      {location.pathname.includes('/event/') && (
                        <span className="hero-badge event">Event</span>
                      )}
                      {content.priority === 'urgent' && (
                        <span className="hero-badge urgent">⚠️ URGENT</span>
                      )}
                      {content.priority === 'high' && (
                        <span className="hero-badge high-priority">⚡ HIGH PRIORITY</span>
                      )}
                    </div>
                    <h1 className="hero-title">{content.title}</h1>
                    <div className="hero-meta">
                      <span>
                        <i className="far fa-calendar-alt"></i>
                        {formatDate(content.date || content.created_at)}
                      </span>
                      {content.author && (
                        <span>
                          <i className="far fa-user"></i>
                          {content.author}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="hero-click-hint">
                  <i className="fas fa-search-plus"></i>
                  <span>Click to zoom</span>
                </div>
              </div>
            )}

            {/* Article Content */}
            <div className="article-body-section">
              <div className="article-body-container">
                {/* Summary */}
                {content.summary && (
                  <div className="article-summary-fullscreen">
                    <p className="summary-text">{content.summary}</p>
                  </div>
                )}

                {/* SDG Tags */}
                {content.sdg_tags && content.sdg_tags.length > 0 && (
                  <div className="article-sdg-tags-fullscreen">
                    <span className="sdg-label">SDG Tags:</span>
                    <SDGTags sdgIds={content.sdg_tags} />
                  </div>
                )}

                {/* Main Content - Includes the duplicated first image */}
                <div className="article-content-fullscreen">
                  {renderContentWithImages()}
                </div>

                {/* Location */}
                {content.location && (
                  <div className="article-location-fullscreen">
                    <i className="fas fa-map-marker-alt"></i>
                    <div>
                      <h6>Location</h6>
                      <p>{content.location}</p>
                    </div>
                  </div>
                )}

                {/* Gallery - Remaining images */}
                {galleryImages.length > 0 && (
                  <div className="article-gallery-fullscreen">
                    <h5>
                      <i className="fas fa-images"></i>
                      Photo Gallery
                      <span className="gallery-count">{galleryImages.length} images</span>
                    </h5>
                    <div className="gallery-grid-fullscreen">
                      {galleryImages.map((img, index) => (
                        <div key={index} className="gallery-item-fullscreen">
                          <img 
                            src={img} 
                            alt={`Gallery image ${index + 1}`}
                            loading="lazy"
                            className="gallery-image-fullscreen"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/images/usm-logo.png';
                            }}
                          />
                          <div className="gallery-overlay-fullscreen">
                            <i className="fas fa-search-plus"></i>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="article-footer-fullscreen">
                  <div className="footer-share">
                    <span>Share this article:</span>
                    <button onClick={handleFacebookShare} className="share-btn-facebook">
                      <i className="fab fa-facebook-f"></i> Facebook
                    </button>
                    <button onClick={handleCopyLink} className="share-btn-copy">
                      <i className="fas fa-link"></i> Copy Link
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <style jsx>{`
        /* Fullscreen Wrapper */
        .article-fullscreen-wrapper {
          position: relative;
          background: #ffffff;
          min-height: 100vh;
        }

        .fullscreen-active {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 9999;
          background: #ffffff;
          overflow-y: auto;
        }

        /* Floating Controls */
        .floating-controls {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .floating-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }

        .floating-btn:hover {
          transform: scale(1.1);
          background: rgba(0, 72, 45, 0.9);
        }

        .floating-btn.back-btn {
          background: rgba(0, 0, 0, 0.5);
        }

        .floating-btn.fullscreen-btn {
          background: rgba(0, 72, 45, 0.8);
        }

        .floating-btn.share-btn {
          background: rgba(24, 119, 242, 0.8);
        }

        .floating-btn.copy-btn {
          background: rgba(0, 0, 0, 0.5);
        }

        /* Hero Section - FULL SCREEN MAXIMIZED */
        .hero-fullscreen-section {
          position: relative;
          width: 100vw;
          height: 100vh;
          max-height: 100vh;
          overflow: hidden;
          background: #1a1a2e;
          margin: 0;
          padding: 0;
        }

        .hero-image-wrapper {
          position: relative;
          width: 100vw;
          height: 100vh;
          max-height: 100vh;
          overflow: hidden;
        }

        .hero-image-fullscreen {
          width: 100vw;
          height: 100vh;
          object-fit: cover;
          object-position: center;
          display: block;
          margin: 0;
          padding: 0;
        }

        .hero-overlay-gradient {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.1) 0%,
            rgba(0, 0, 0, 0.3) 30%,
            rgba(0, 0, 0, 0.6) 60%,
            rgba(0, 0, 0, 0.85) 85%,
            rgba(0, 0, 0, 0.95) 100%
          );
        }

        .hero-content-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 5rem 4rem 4rem 4rem;
          color: white;
          max-width: 1200px;
          margin: 0 auto;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.8) 0%,
            rgba(0, 0, 0, 0.3) 50%,
            transparent 100%
          );
        }

        .hero-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 1.5rem;
        }

        .hero-badge {
          padding: 8px 20px;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .hero-badge.announcement { background: rgba(13, 110, 253, 0.9); }
        .hero-badge.news { background: rgba(25, 135, 84, 0.9); }
        .hero-badge.event { background: rgba(13, 202, 240, 0.9); color: #000; }
        .hero-badge.urgent { 
          background: rgba(220, 53, 69, 0.9); 
          animation: pulse-badge 1.5s infinite;
        }
        .hero-badge.high-priority { background: rgba(255, 193, 7, 0.9); color: #000; }

        @keyframes pulse-badge {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.2rem;
          text-shadow: 0 4px 30px rgba(0, 0, 0, 0.6);
          max-width: 900px;
        }

        .hero-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          font-size: 1.05rem;
          opacity: 0.95;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        .hero-meta span {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .hero-meta i {
          font-size: 1.2rem;
        }

        .hero-click-hint {
          position: absolute;
          bottom: 30px;
          right: 40px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(0, 0, 0, 0.4);
          padding: 10px 20px;
          border-radius: 50px;
          backdrop-filter: blur(10px);
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .hero-click-hint:hover {
          opacity: 1;
          background: rgba(0, 0, 0, 0.6);
          transform: scale(1.05);
        }

        .hero-click-hint i {
          font-size: 1.2rem;
        }

        /* Article Body */
        .article-body-section {
          background: #ffffff;
          padding: 4rem 2rem;
        }

        .article-body-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .article-summary-fullscreen {
          background: #f8f9fa;
          border-left: 5px solid #00482D;
          padding: 2rem 2.5rem;
          border-radius: 8px;
          margin-bottom: 2.5rem;
        }

        .summary-text {
          font-size: 1.25rem;
          line-height: 1.8;
          color: #2c3e50;
          font-style: italic;
          margin: 0;
        }

        .article-sdg-tags-fullscreen {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
          padding: 0.5rem 0;
        }

        .sdg-label {
          font-weight: 600;
          color: #6c757d;
        }

        .article-content-fullscreen {
          color: #2c3e50;
        }

        .article-paragraph {
          font-size: 1.1rem;
          line-height: 2;
          margin-bottom: 1.8rem;
          color: #2c3e50;
          text-align: justify;
          word-spacing: 0.5px;
        }

        .article-paragraph:first-of-type {
          font-size: 1.2rem;
          line-height: 2.1;
        }

        /* Content Images */
        .content-image-wrapper-full {
          margin: 2.5rem -2rem;
          cursor: pointer;
          position: relative;
          border-radius: 12px;
          overflow: hidden;
        }

        .content-image-wrapper-full:hover .content-image-overlay {
          opacity: 1;
        }

        .content-image-container-full {
          background: #f8f9fa;
          padding: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .content-image-full {
          width: 100%;
          height: auto;
          display: block;
        }

        .content-image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          color: white;
        }

        .content-image-overlay i {
          font-size: 2.5rem;
          margin-bottom: 8px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        .content-image-overlay span {
          font-size: 0.9rem;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        /* Location */
        .article-location-fullscreen {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          background: #f8f9fa;
          padding: 1.5rem 2rem;
          border-radius: 12px;
          margin: 2.5rem 0;
        }

        .article-location-fullscreen i {
          font-size: 1.5rem;
          color: #00482D;
          margin-top: 2px;
        }

        .article-location-fullscreen h6 {
          font-weight: 700;
          margin-bottom: 4px;
          color: #00482D;
        }

        .article-location-fullscreen p {
          margin: 0;
          color: #6c757d;
        }

        /* Gallery */
        .article-gallery-fullscreen {
          margin-top: 3rem;
          padding-top: 2.5rem;
          border-top: 2px solid #e9ecef;
        }

        .article-gallery-fullscreen h5 {
          font-size: 1.4rem;
          font-weight: 700;
          color: #00482D;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .gallery-count {
          font-size: 0.85rem;
          background: #e9ecef;
          padding: 4px 14px;
          border-radius: 50px;
          color: #6c757d;
          font-weight: 500;
        }

        .gallery-grid-fullscreen {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 16px;
        }

        .gallery-item-fullscreen {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          cursor: pointer;
          background: #f8f9fa;
          aspect-ratio: 1 / 1;
        }

        .gallery-image-fullscreen {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .gallery-item-fullscreen:hover .gallery-image-fullscreen {
          transform: scale(1.08);
        }

        .gallery-overlay-fullscreen {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .gallery-item-fullscreen:hover .gallery-overlay-fullscreen {
          opacity: 1;
        }

        .gallery-overlay-fullscreen i {
          color: white;
          font-size: 2.5rem;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        /* Footer */
        .article-footer-fullscreen {
          margin-top: 3.5rem;
          padding-top: 2.5rem;
          border-top: 2px solid #e9ecef;
        }

        .footer-share {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
        }

        .footer-share span {
          font-weight: 600;
          color: #6c757d;
          margin-right: 8px;
        }

        .footer-share button {
          padding: 10px 24px;
          border: none;
          border-radius: 50px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .share-btn-facebook {
          background: #1877f2;
          color: white;
        }

        .share-btn-facebook:hover {
          background: #1664d9;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(24, 119, 242, 0.3);
        }

        .share-btn-copy {
          background: #e9ecef;
          color: #2c3e50;
        }

        .share-btn-copy:hover {
          background: #dee2e6;
          transform: translateY(-2px);
        }

        /* Image Modal */
        .image-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.92);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: modalFadeIn 0.3s ease;
        }

        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .image-modal-content {
          position: relative;
          max-width: 95vw;
          max-height: 95vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .image-modal-close {
          position: absolute;
          top: -50px;
          right: -10px;
          background: none;
          border: none;
          color: white;
          font-size: 2.5rem;
          cursor: pointer;
          padding: 10px 15px;
          transition: transform 0.3s ease;
          z-index: 10;
        }

        .image-modal-close:hover {
          transform: rotate(90deg);
        }

        .image-modal-image-wrapper {
          max-width: 100%;
          max-height: 75vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .image-modal-image {
          max-width: 100%;
          max-height: 75vh;
          width: auto;
          height: auto;
          object-fit: contain;
          border-radius: 8px;
          transition: transform 0.2s ease;
          cursor: grab;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          user-select: none;
          -webkit-user-select: none;
        }

        .image-modal-image:active {
          cursor: grabbing;
        }

        .image-modal-caption {
          color: rgba(255, 255, 255, 0.8);
          margin-top: 12px;
          font-size: 1rem;
          text-align: center;
          max-width: 80%;
        }

        .image-modal-nav {
          position: absolute;
          bottom: -60px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 20px;
          background: rgba(255, 255, 255, 0.1);
          padding: 10px 20px;
          border-radius: 30px;
          backdrop-filter: blur(10px);
        }

        .image-modal-nav span {
          color: white;
          cursor: pointer;
          font-size: 1.2rem;
          padding: 5px 10px;
          border-radius: 50%;
          transition: background 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
        }

        .image-modal-nav span:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .copy-toast {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%) translateY(100px);
          background: #00482D;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          font-weight: 500;
          z-index: 9999;
          opacity: 0;
          transition: all 0.3s ease;
        }

        .copy-toast.show {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        .fullscreen-loader {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: #f8f9fa;
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .hero-title {
            font-size: 3.5rem;
          }

          .hero-content-overlay {
            padding: 4rem 3rem 3rem 3rem;
          }
        }

        @media (max-width: 992px) {
          .hero-title {
            font-size: 2.8rem;
          }

          .hero-content-overlay {
            padding: 3rem 2.5rem 2.5rem 2.5rem;
          }

          .hero-meta {
            font-size: 0.95rem;
            gap: 1.5rem;
          }

          .article-body-section {
            padding: 3rem 1.5rem;
          }

          .content-image-wrapper-full {
            margin: 2rem -1.5rem;
          }

          .gallery-grid-fullscreen {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .floating-controls {
            top: 15px;
            right: 15px;
            gap: 8px;
          }

          .floating-btn {
            width: 40px;
            height: 40px;
            font-size: 0.95rem;
          }

          .hero-fullscreen-section {
            height: 60vh;
            max-height: 60vh;
          }

          .hero-image-wrapper {
            height: 60vh;
            max-height: 60vh;
          }

          .hero-image-fullscreen {
            height: 60vh;
            object-fit: cover;
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-content-overlay {
            padding: 2rem 1.5rem 1.5rem 1.5rem;
          }

          .hero-badges {
            gap: 6px;
            margin-bottom: 1rem;
          }

          .hero-badge {
            font-size: 0.7rem;
            padding: 5px 14px;
          }

          .hero-meta {
            font-size: 0.85rem;
            gap: 1rem;
          }

          .hero-click-hint {
            bottom: 15px;
            right: 15px;
            font-size: 0.75rem;
            padding: 8px 14px;
          }

          .hero-click-hint i {
            font-size: 1rem;
          }

          .article-body-section {
            padding: 2rem 1rem;
          }

          .article-paragraph {
            font-size: 1rem;
            line-height: 1.8;
            margin-bottom: 1.5rem;
          }

          .article-paragraph:first-of-type {
            font-size: 1.05rem;
          }

          .summary-text {
            font-size: 1rem;
          }

          .content-image-wrapper-full {
            margin: 1.5rem -1rem;
          }

          .gallery-grid-fullscreen {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 10px;
          }

          .article-summary-fullscreen {
            padding: 1.2rem 1.5rem;
            margin-bottom: 2rem;
          }

          .article-location-fullscreen {
            padding: 1rem 1.5rem;
            flex-direction: column;
            gap: 0.5rem;
            margin: 2rem 0;
          }

          .footer-share {
            flex-direction: column;
            align-items: stretch;
          }

          .footer-share button {
            justify-content: center;
          }

          .image-modal-image-wrapper {
            max-height: 50vh;
          }

          .image-modal-image {
            max-height: 50vh;
          }

          .image-modal-nav {
            bottom: -50px;
            padding: 8px 16px;
            gap: 12px;
          }

          .image-modal-nav span {
            width: 32px;
            height: 32px;
            font-size: 1rem;
          }

          .image-modal-close {
            top: -40px;
            right: 0;
            font-size: 2rem;
          }
        }

        @media (max-width: 480px) {
          .hero-fullscreen-section {
            height: 50vh;
            max-height: 50vh;
          }

          .hero-image-wrapper {
            height: 50vh;
            max-height: 50vh;
          }

          .hero-image-fullscreen {
            height: 50vh;
          }

          .hero-title {
            font-size: 1.5rem;
          }

          .hero-content-overlay {
            padding: 1.5rem 1rem 1rem 1rem;
          }

          .hero-badge {
            font-size: 0.6rem;
            padding: 4px 10px;
          }

          .hero-meta {
            font-size: 0.75rem;
            gap: 0.8rem;
          }

          .hero-meta i {
            font-size: 0.9rem;
          }

          .hero-click-hint {
            bottom: 10px;
            right: 10px;
            font-size: 0.65rem;
            padding: 6px 12px;
          }

          .gallery-grid-fullscreen {
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            gap: 8px;
          }

          .article-paragraph {
            font-size: 0.95rem;
          }

          .floating-btn {
            width: 36px;
            height: 36px;
            font-size: 0.85rem;
          }

          .article-gallery-fullscreen h5 {
            font-size: 1.1rem;
          }

          .gallery-count {
            font-size: 0.75rem;
            padding: 2px 10px;
          }
        }
      `}</style>
    </>
  );
};

export default NewsDetail;