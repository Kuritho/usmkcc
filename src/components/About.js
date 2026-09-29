// About.js - Updated with gallery detail modal (Title removed from pictures)
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Carousel, Spinner, Modal } from 'react-bootstrap';
import { getGalleryImages } from '../supabase/services';
import './About.css';

const About = () => {
  const [activeButton, setActiveButton] = useState('about-usm-kcc');
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(true);
  
  // Modal state for gallery details
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    loadGalleryImages();
  }, []);

  const loadGalleryImages = async () => {
    setLoadingGallery(true);
    try {
      const result = await getGalleryImages();
      if (result.success && result.data.length > 0) {
        setGalleryImages(result.data);
      } else {
        // Fallback to local images if no gallery images in database
        setGalleryImages([
          { id: 1, image_url: "/images/turnover.jpg", title: "Turnover Ceremony", description: "The formal turnover ceremony of USM-KCC leadership" },
          { id: 2, image_url: "/images/turnover1.jpg", title: "Campus Event", description: "Students and faculty gathering for a campus event" },
          { id: 3, image_url: "/images/pic1.jpg", title: "Campus Building", description: "Modern academic building at USM-KCC" },
          { id: 4, image_url: "/images/pic2.jpg", title: "Student Activity", description: "Students participating in campus activities" },
          { id: 5, image_url: "/images/pic3.jpg", title: "Graduation Ceremony", description: "Annual graduation ceremony celebrating student achievements" },
          { id: 6, image_url: "/images/pic4.jpg", title: "Faculty Meeting", description: "Faculty members in a collaborative meeting" }
        ]);
      }
    } catch (error) {
      console.error('Error loading gallery:', error);
      // Fallback to local images
      setGalleryImages([
        { id: 1, image_url: "/images/turnover.jpg", title: "Turnover Ceremony", description: "The formal turnover ceremony of USM-KCC leadership" },
        { id: 2, image_url: "/images/turnover1.jpg", title: "Campus Event", description: "Students and faculty gathering for a campus event" },
        { id: 3, image_url: "/images/pic1.jpg", title: "Campus Building", description: "Modern academic building at USM-KCC" },
        { id: 4, image_url: "/images/pic2.jpg", title: "Student Activity", description: "Students participating in campus activities" },
        { id: 5, image_url: "/images/pic3.jpg", title: "Graduation Ceremony", description: "Annual graduation ceremony celebrating student achievements" },
        { id: 6, image_url: "/images/pic4.jpg", title: "Faculty Meeting", description: "Faculty members in a collaborative meeting" }
      ]);
    } finally {
      setLoadingGallery(false);
    }
  };

  // Handle image click to show details
  const handleImageClick = (image) => {
    console.log('🖼️ Image clicked:', image);
    setSelectedImage(image);
    setShowModal(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <Container className="py-5 about-container">
      {/* Banner image at the top */}
      <Row className="mb-4">
        <Col>
          <img 
            src="/images/usmbggate.jpg" 
            alt="USM-KCC Campus Overview" 
            className="img-fluid rounded shadow campus-banner"
            style={{ width: '100%', height: 'auto' }}
          />
        </Col>
      </Row>

      {/* Horizontal Navigation Buttons */}
      <Row className="mb-4 nav-button-row">
        <Col className="d-flex flex-wrap px-0">
          <Button 
            href="#about-usm-kcc"
            className={`nav-btn ${activeButton === 'about-usm-kcc' ? 'active-nav-btn' : ''}`}
            onClick={() => setActiveButton('about-usm-kcc')}
          >
            About USM-KCC
          </Button>
          
          <Button 
            href="#goals-objectives"
            className={`nav-btn ${activeButton === 'goals-objectives' ? 'active-nav-btn' : ''}`}
            onClick={() => setActiveButton('goals-objectives')}
          >
            Goals and Objectives
          </Button>
          
          <Button 
            href="#our-campus"
            className={`nav-btn ${activeButton === 'our-campus' ? 'active-nav-btn' : ''}`}
            onClick={() => setActiveButton('our-campus')}
          >
            Our Campus
          </Button>
          
          <Button 
            href="#gallery"
            className={`nav-btn ${activeButton === 'gallery' ? 'active-nav-btn' : ''}`}
            onClick={() => setActiveButton('gallery')}
          >
            Gallery
          </Button>
        </Col>
      </Row>

      {/* About USM-KCC Section */}
      <h1 className="text-center mb-5 section-title">About USM-KCC</h1>
      
      <Row id="about-usm-kcc" className="mb-5 section-content">
        <Col md={6}>
          <h2 className="section-subtitle">Our History</h2>
          <p>
            The University of Southern Mindanao- Kidapawan City Campus (USM-KCC) is known to be the former North Cotabato College of Arts and Trades (NCCAT). Prior to NCCAT it was named Kidapawan Trade School (KTS) established in 1962 with the passage of Republic Act No. 3329, otherwise known as the "Higher Modernization Act of 1997" and pursuant to the Special Provision No. 2 of CHED FY 1999 Budget under the General Appropriation Act of 1999 or RA 8745 on the Integration of CHED-Supervised Institutions (CSIs) to State Universities and Colleges (SUCs), the commission on Higher Education issues guidelines to effect integration of CSIs to the SUCs for immediate implementation. As per CHED Memorandum Order no. 18, series of 1999, North Cotabato College of Arts and Trades was integrated to the University of Southern Mindanao as the host SUC. On June 31, 2000 dated the formal turn-over of NCCAT to USM by CHEDRO XII Regional Director to the University President.
          </p>
          <p>
            This external campus of USM is headed by the Campus Dean by virtue of BOR Resolution no. 30 s. 1999. The first USM-KCC Campus dean was Dr. Palasig U. Ampang, followed by Dr. Rogelio S. Tabora, Dr. Rufino S. Garzon, Dr. Rene U. Handoc, Dr. Herminigildo M. Gutierrez, Prof. Alfredo E. Naparan as OIC dean, Dr. Luz A. Taposok, then a short period for Prof. Alfredo E. Naparan as dean. At present, the campus has now the fiscal autonomy from University of Southern Mindanao, Kabacan, Cotabato and headed by Chancellor Dr. Ronielyn F Pinsoy.
          </p>
        </Col>
        <Col md={6}>
          <img 
            src="/images/kccampus.jpg" 
            alt="USMKC Campus History" 
            className="img-fluid rounded shadow content-image"
          />
          <img 
            src="/images/Pinsoy.png" 
            alt="Chancellor Pinsoy" 
            className="img-fluid rounded shadow mt-3 content-image portrait"
          />
        </Col>
        <Col xs={12} className="mt-3">
          <small className="text-muted fst-italic" style={{ fontSize: '0.75rem' }}>
            Source: <a 
              href="https://www.usm.edu.ph/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="source-link"
              style={{
                color: '#00482D',
                textDecoration: 'none',
                fontSize: '0.75rem',
                fontWeight: 'normal',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.textDecoration = 'underline';
                e.target.style.color = '#FFD326';
              }}
              onMouseLeave={(e) => {
                e.target.style.textDecoration = 'none';
                e.target.style.color = '#00482D';
              }}
            >
              https://www.usm.edu.ph/
            </a>
          </small>
        </Col>
      </Row>
      
      {/* Goals and Objectives Section */}
      <Row id="goals-objectives" className="mb-5 py-3 section-content">
        <Col>
          <h2 className="section-subtitle">Goals and Objectives</h2>
          <p>
            <strong>Vision:</strong> Quality and relevant education for its clientele to be globally competitive, culture-sensitive and morally responsive human resources for sustainable development.
          </p>
          <p>
            <strong>Mission:</strong> Help accelerate socio-economic development, promote harmony among diverse communities and improve quality of life through instruction, research, extension and resource generation in Southern Philippines.
          </p>
          <p>
            <strong>Goals:</strong> In general, the USM-KCC aims to provide quality comprehensive education while at the same time establish a vibrant, well-managed campus which fosters internal harmony and responsive to issues and concerns affecting its external environment. Specifically, USM-KCC aims to:
          </p>
          <ol>
            <li>Provide effective, efficient and transparent governance and management practices;</li>
            <li>Become a leader and model for teaching and learning in the fields of education, engineering, technology and other areas;</li>
            <li>Heighten the empowerment of communities particularly in alleviating poverty and sustainable management of resources through research, training and extension;</li>
            <li>Increase and manage enrolment, enhance and expand facilities, strengthen its financial position; and</li>
            <li>Make USM-KCC an excellent place to work and study.</li>
          </ol>
          <h5 className="mt-4">Core Objectives:</h5>
          <ul>
            <li>To provide effective, efficient and transparent governance and management practices
              <ol>
                <li>Implement fully the enhanced autonomy policy for USM-KCC</li>
                <li>Sustain efficient, transparent and effective management with consensus decision-making and guidance from the USM Main Campus; and</li>
                <li>Automate and make more convenient the financial and enrolment systems for USM-KCC constituents.</li>
              </ol>
            </li>
            <li>Become a leader and model for teaching and learning in the field of education, engineering, technology and other areas;
              <ol>
                <li>Continue and improve on its use of information and communications technology to facilitate teaching and learning both inside and outside the classroom;</li>
                <li>Provide adequate laboratory, classroom, library, health and other facilities;</li>
                <li>Offer additional programs which will contribute to the development of the campus' area of responsibility;</li>
                <li>Continued program accreditation with appropriate bodies both international and local;</li>
                <li>Continue monitoring the performance of alumni in board exams and employment in both private and public sectors; and</li>
                <li>Hiring and retention of highly competent and qualified faculty and staff members (preferably those on CHED scholarships);</li>
              </ol>
            </li>
            <li>Heighten the empowerment of communities particularly in alleviating poverty and sustainable management of resources through research, training, and extension
              <ol>
                <li>Relevant and quality RET that responds to the needs of USM-KCC constituents;</li>
                <li>Enhance cultural heritage of indigenous peoples in the area of coverage;</li>
                <li>Provide adequate campus RET facilities that will encourage faculty, staff, and students to conduct RET activities</li>
                <li>Seek ways by which the intellectual output of USM-KCC personnel can be utilized and disseminated such as the establishment of a RET journal, participation in research and extension fora, or patenting/copyrighting intellectual properties;</li>
              </ol>
            </li>
            <li>Increase and manage enrolment, enhance and expand facilities, and strengthen financial position
              <ol>
                <li>Conduct consultations with constituents, especially as to courses that will be offered and/or revisions to existing ones which will redound towards better quality graduates and access to education especially among those coming from the underprivileged sectors of society;</li>
                <li>Enhance enrolment system that will allow enrolment from outside the campus;</li>
                <li>Improve farm production through adoption of modern practices and provision of adequate facilities;</li>
                <li>Improve income generation by providing improved facilities and new investments;</li>
                <li>Intensify efforts to seek fund sources and partnerships with outside sectors; and</li>
                <li>Improve funds utilization through judicious and timely expenditures made in accordance with government and USM rules and regulations.</li>
              </ol>
            </li>
            <li>Make USM-KCC a convivial place to work and study
              <ol>
                <li>Improve benefits of campus personnel within limits set by university policies and pertinent laws;</li>
                <li>Increase participation in campus extracurricular activities such as sports competitions, field trips, and others which promote harmony among personnel, students, alumni, parents/guardians of students, and surrounding communities;</li>
                <li>Increase participation in civic activities together with relevant local government units and agencies that will enhance the corporate responsiveness of the campus;</li>
                <li>Improve linkage with the private sector to implement projects designed to improve the welfare of campus constituents; and</li>
                <li>Explore more ways by which students and USM-KCC personnel can avail of scholarships and other forms of assistance for their education and professional development.</li>             
              </ol>
            </li>
          </ul>
          <Col xs={12} className="mt-3">
            <small className="text-muted fst-italic" style={{ fontSize: '0.75rem' }}>
              Source: <a 
                href="https://www.usm.edu.ph/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="source-link"
                style={{
                  color: '#00482D',
                  textDecoration: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 'normal',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.target.style.textDecoration = 'underline';
                  e.target.style.color = '#FFD326';
                }}
                onMouseLeave={(e) => {
                  e.target.style.textDecoration = 'none';
                  e.target.style.color = '#00482D';
                }}
              >
                https://www.usm.edu.ph/
              </a>
            </small>
          </Col>
        </Col>
      </Row>
      
      {/* Our Campus Section */}
      <Row id="our-campus" className="mb-5 py-3 section-content">
        <Col md={6} className="order-md-2">
          <h2 className="section-subtitle">Our Campus</h2>
          <p>
            The University of Southern Mindanao - Kidapawan City Campus (USM-KCC) is located in Sudapin, Kidapawan City. Specifically, the campus is situated in Kidapawan City, Cotabato. The USM Kidapawan City Campus (USM KCC) has 14.97 hectares of land. 
          </p>
          <p>
            USM‑KCC features modern academic buildings, laboratories, and a learning resource center. The campus has recently undertaken improvements in coordination with local government to enhance road access and parking for students and staff.
          </p>
          <p>
            Aligned with USM's overarching mandate, the Kidapawan campus aims to "empower everyone" through quality instruction, research, and community engagement. It plays a vital role in delivering technical, industrial, and education programs to the region. There have been active pushes to gain autonomy, including proposals to convert the campus into the Kidapawan City State College to allow more fiscal flexibility and expansion of academic offerings. As of June 2025, two new academic buildings were inaugurated, signalling steady infrastructural growth.
          </p>
        </Col>
        <Col md={6} className="order-md-1">
          <img 
            src="/images/maingate.jpg" 
            alt="USMKC Campus Aerial View" 
            className="img-fluid rounded shadow content-image"
          />
          <img 
            src="/images/adminbuilding.jpg" 
            alt="USMKC Campus Aerial View" 
            className="img-fluid rounded shadow content-image"
          />
        </Col>
        <Col xs={12} className="mt-3">
          <small className="text-muted fst-italic" style={{ fontSize: '0.75rem' }}>
            Source: <a 
              href="https://www.usm.edu.ph/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="source-link"
              style={{
                color: '#00482D',
                textDecoration: 'none',
                fontSize: '0.75rem',
                fontWeight: 'normal',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.textDecoration = 'underline';
                e.target.style.color = '#FFD326';
              }}
              onMouseLeave={(e) => {
                e.target.style.textDecoration = 'none';
                e.target.style.color = '#00482D';
              }}
            >
              https://www.usm.edu.ph/
            </a>
          </small>
        </Col>
      </Row>
      
      {/* Gallery Section - Connected to Supabase with Clickable Images (Title removed from display) */}
      <Row id="gallery" className="mb-5 py-3 section-content">
        <Col>
          <h2 className="section-subtitle mb-4">Gallery</h2>
          
          {loadingGallery ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="success" />
              <p className="mt-2">Loading gallery...</p>
            </div>
          ) : galleryImages.length > 0 ? (
            <>
              <Carousel 
                activeIndex={galleryIndex} 
                onSelect={(selectedIndex) => setGalleryIndex(selectedIndex)}
                indicators={false}
                prevIcon={
                  <span aria-hidden="true" className="carousel-control-prev-icon gallery-nav-icon" />
                }
                nextIcon={
                  <span aria-hidden="true" className="carousel-control-next-icon gallery-nav-icon" />
                }
              >
                {galleryImages.map((image) => (
                  <Carousel.Item key={image.id}>
                    <div 
                      className="d-flex justify-content-center"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleImageClick(image)}
                    >
                      <img
                        className="d-block img-fluid rounded shadow gallery-image"
                        src={image.image_url}
                        alt={image.title || 'Gallery image'}
                        style={{ 
                          maxHeight: '500px', 
                          objectFit: 'contain',
                          transition: 'transform 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'scale(1.02)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'scale(1)';
                        }}
                      />
                    </div>
                    {/* Title and description removed from carousel caption */}
                    <Carousel.Caption 
                      className="d-none d-md-block" 
                      style={{ 
                        backgroundColor: 'rgba(0,0,0,0.5)', 
                        borderRadius: '8px', 
                        padding: '8px 15px',
                        cursor: 'pointer',
                        bottom: '20px'
                      }}
                      onClick={() => handleImageClick(image)}
                    >
                      <small className="text-light" style={{ opacity: 0.9 }}>
                        <i className="fas fa-search-plus me-2"></i>
                        Click to view details
                      </small>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>

              {/* Thumbnail navigation - Clickable */}
              <div className="d-flex flex-wrap justify-content-center mt-3">
                {galleryImages.map((image, index) => (
                  <img
                    key={image.id}
                    src={image.image_url}
                    alt={`Thumbnail ${index + 1}`}
                    className={`img-thumbnail mx-1 gallery-thumbnail ${galleryIndex === index ? 'active-thumbnail' : ''}`}
                    onClick={() => setGalleryIndex(index)}
                    style={{ 
                      width: '80px', 
                      height: '60px', 
                      objectFit: 'cover',
                      cursor: 'pointer',
                      border: galleryIndex === index ? '3px solid #00482D' : '1px solid #ddd',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.1)';
                      e.target.style.borderColor = '#00482D';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                      if (galleryIndex !== index) {
                        e.target.style.borderColor = '#ddd';
                      }
                    }}
                  />
                ))}
              </div>

              {/* Click hint */}
              <div className="text-center mt-3">
                <small className="text-muted">
                  <i className="fas fa-hand-pointer me-1"></i>
                  Click on any image to view full details
                </small>
              </div>
            </>
          ) : (
            <p className="text-center text-muted py-4">No gallery images available.</p>
          )}
        </Col>
      </Row>

      {/* Gallery Detail Modal */}
      <Modal show={showModal} onHide={handleModalClose} centered size="lg">
        <Modal.Header closeButton style={{ backgroundColor: '#00482D', color: '#FFD326' }}>
          <Modal.Title>
            <i className="fas fa-image me-2"></i>
            {selectedImage?.title || 'Image Details'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '0' }}>
          <div style={{ 
            width: '100%', 
            maxHeight: '70vh', 
            overflow: 'hidden',
            backgroundColor: '#f8f9fa',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <img 
              src={selectedImage?.image_url} 
              alt={selectedImage?.title || 'Gallery image'}
              style={{ 
                width: '100%',
                height: 'auto',
                maxHeight: '60vh',
                objectFit: 'contain',
                padding: '20px'
              }}
            />
          </div>
          <div style={{ padding: '20px', backgroundColor: '#ffffff' }}>
            {selectedImage?.title && (
              <h3 style={{ color: '#00482D', marginBottom: '10px' }}>
                {selectedImage.title}
              </h3>
            )}
            {selectedImage?.description && (
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#333', marginBottom: '0' }}>
                {selectedImage.description}
              </p>
            )}
            {!selectedImage?.title && !selectedImage?.description && (
              <p className="text-muted" style={{ marginBottom: '0' }}>
                No additional details available for this image.
              </p>
            )}
            <div className="mt-3 text-muted" style={{ fontSize: '0.85rem' }}>
              <i className="fas fa-calendar-alt me-1"></i>
              Uploaded: {selectedImage?.created_at ? new Date(selectedImage.created_at).toLocaleDateString() : 'Date not available'}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#f8f9fa' }}>
          <Button variant="secondary" onClick={handleModalClose}>
            <i className="fas fa-times me-2"></i>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default About;