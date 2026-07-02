import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ResearchExtensionPage = () => {
  // State for lightbox
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 40 images (last one removed)
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

  // Sort by numeric value
  const sortedFiles = rawFiles.sort((a, b) => {
    const numA = parseInt(a.name.replace('reso', ''), 10);
    const numB = parseInt(b.name.replace('reso', ''), 10);
    return numA - numB;
  });

  const images = sortedFiles.map((file, index) => ({
    id: index + 1,
    url: `/images/reso/${file.name}.${file.ext}`,
    title: `Activity ${index + 1}`
  }));

  // Modal handlers
  const openModal = (url) => {
    setSelectedImage(url);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape' && isModalOpen) closeModal(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isModalOpen]);

  return (
    <div style={{
      backgroundColor: '#f0f4f8',
      fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
      minHeight: '100vh',
      scrollBehavior: 'smooth'
    }}>
      {/* ========== HERO ========== */}
      <div style={{
        position: 'relative',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'linear-gradient(135deg, rgba(0,72,45,0.85) 0%, rgba(0,40,25,0.9) 100%), url(https://picsum.photos/id/16/1920/1080)',
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
              <h1 style={{
                fontSize: '3.5rem',
                fontWeight: '700',
                letterSpacing: '-0.02em',
                marginBottom: '20px',
                textShadow: '0 2px 20px rgba(0,0,0,0.3)'
              }}>
                Research &amp; Extension Services Office
              </h1>
              {/* <p style={{
                fontSize: '1.25rem',
                opacity: 0.9,
                maxWidth: '700px',
                margin: '0 auto 30px',
                lineHeight: 1.6
              }}>
                Advancing knowledge, fostering innovation, and serving communities through research and extension.
              </p> */}
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {/* <Link to="#gallery" style={{
                  backgroundColor: '#FFD326',
                  color: '#00482D',
                  padding: '12px 30px',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(255,211,38,0.3)'
                }}
                onMouseEnter={(e) => { e.target.style.transform = 'scale(1.05)'; e.target.style.boxShadow = '0 8px 25px rgba(255,211,38,0.5)'; }}
                onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = '0 4px 15px rgba(255,211,38,0.3)'; }}>
                  View Activities
                </Link>
                <Link to="/contact" style={{
                  backgroundColor: 'transparent',
                  color: '#fff',
                  padding: '12px 30px',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  border: '2px solid rgba(255,255,255,0.6)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => { e.target.style.backgroundColor = 'rgba(255,255,255,0.15)'; e.target.style.borderColor = '#fff'; }}
                onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.borderColor = 'rgba(255,255,255,0.6)'; }}>
                  Get Involved
                </Link> */}
              </div>
            </Col>
          </Row>
        </Container>
        {/* Scroll indicator */}
        {/* <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          animation: 'bounceDown 2s infinite',
          fontSize: '2rem',
          color: 'rgba(255,255,255,0.6)'
        }}>
          <i className="fas fa-chevron-down"></i>
        </div> */}
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
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#2d3748', textAlign: 'justify' }}>
                  The University of Southern Mindanao–Kidapawan City Campus (USM-KCC) Research and Extension Services Office provides guidance and support to students and faculty members in the development, implementation, and management of research studies, extension projects, trainings, and related activities. It promotes the application of research ethics, responsible conduct of research, scholarly publication, and protection of intellectual property rights.
                </p>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#2d3748', marginTop: '15px', textAlign: 'justify' }}>
                  The Research and Extension Services Office oversees the conduct of student thesis defenses, facilitates the implementation and monitoring of faculty research projects and extension initiatives within and beyond the campus, and provides assistance to faculty members and students in securing research ethics assessments, publishing research outputs in recognized academic journals, and processing intellectual property applications such as patents, copyrights, utility models, and industrial designs. Through these efforts, the office strengthens the campus’s commitment to advancing knowledge generation, innovation, community engagement, and sustainable development.
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

        {/* ========== GALLERY ========== */}
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
                <p style={{ color: '#4a5568', marginTop: '15px', fontSize: '1.1rem' }}>
                  Click any image to view in full size
                </p>
              </div>
            </Col>
          </Row>

          <Row className="g-4">
            {images.map((image, index) => (
              <Col key={image.id} xs={6} sm={4} md={3} lg={3} style={{
                animation: 'fadeInUp 0.6s ease forwards',
                animationDelay: `${index * 0.05}s`,
                opacity: 0
              }}>
                <div
                  style={{
                    overflow: 'hidden',
                    borderRadius: '16px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.07)',
                    transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                    cursor: 'pointer',
                    backgroundColor: '#fff',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.03)';
                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.07)';
                  }}
                  onClick={() => openModal(image.url)}
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block'
                    }}
                  />
                  {/* Optional overlay: a subtle gradient at bottom (you can remove if you want pure image) */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '40%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.2), transparent)',
                    pointerEvents: 'none'
                  }}></div>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* ========== RESEARCH THRUSTS & EXTENSION FOCUS ========== */}
        <Row className="mt-5 pt-3 g-4">
          <Col md={6}>
            <Card style={{
              border: 'none',
              borderRadius: '20px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
              height: '100%',
              padding: '30px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 15px 50px rgba(0,0,0,0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.05)'; }}>
              <h3 style={{ color: '#00482D', fontWeight: '700', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ backgroundColor: '#FFD326', padding: '8px 12px', borderRadius: '12px', color: '#00482D', fontSize: '1.4rem' }}>
                  <i className="fas fa-microscope"></i>
                </span>
                Research Thrusts
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                {[
                  'Agricultural productivity & food security',
                  'Climate change adaptation & mitigation',
                  'Biodiversity conservation & management',
                  'Indigenous knowledge systems',
                  'Educational innovation & technology',
                  'Sustainable community development'
                ].map((item, idx) => (
                  <div key={idx} style={{
                    backgroundColor: '#f8fafc',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e9f0f9'}>
                    <i className="fas fa-check-circle" style={{ color: '#FFD326', fontSize: '1.2rem' }}></i>
                    <span style={{ fontSize: '0.95rem', color: '#2d3748', fontWeight: '500' }}>{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </Col>

          <Col md={6}>
            <Card style={{
              border: 'none',
              borderRadius: '20px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
              height: '100%',
              padding: '30px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 15px 50px rgba(0,0,0,0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.05)'; }}>
              <h3 style={{ color: '#00482D', fontWeight: '700', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ backgroundColor: '#FFD326', padding: '8px 12px', borderRadius: '12px', color: '#00482D', fontSize: '1.4rem' }}>
                  <i className="fas fa-hand-holding-heart"></i>
                </span>
                Extension Focus Areas
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                {[
                  'Livelihood & skills training',
                  'Health & nutrition campaigns',
                  'Environmental education & advocacy',
                  'Community-based research partnerships',
                  'Technology transfer & demo farms',
                  'Youth & leadership development'
                ].map((item, idx) => (
                  <div key={idx} style={{
                    backgroundColor: '#f8fafc',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e9f0f9'}>
                    <i className="fas fa-check-circle" style={{ color: '#FFD326', fontSize: '1.2rem' }}></i>
                    <span style={{ fontSize: '0.95rem', color: '#2d3748', fontWeight: '500' }}>{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>

        {/* ========== CALL TO ACTION ========== */}
        <Row className="mt-5">
          <Col>
            <div style={{
              background: 'linear-gradient(135deg, #00482D 0%, #002b1c 100%)',
              borderRadius: '24px',
              padding: '50px 40px',
              textAlign: 'center',
              color: '#ffffff',
              boxShadow: '0 20px 60px rgba(0,72,45,0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '-30%',
                right: '-10%',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: 'rgba(255,211,38,0.08)',
                pointerEvents: 'none'
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: '-20%',
                left: '-5%',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: 'rgba(255,211,38,0.06)',
                pointerEvents: 'none'
              }}></div>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <i className="fas fa-handshake" style={{ fontSize: '3.5rem', color: '#FFD326', marginBottom: '15px', display: 'block' }}></i>
                <h3 style={{ fontWeight: '700', fontSize: '2rem', marginBottom: '15px' }}>Partner With Us</h3>
                <p style={{ fontSize: '1.15rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 30px', lineHeight: 1.6 }}>
                  Interested in collaborating on research or extension projects? We welcome partnerships with government agencies, NGOs, private sector, and community organizations.
                </p>
                <Link to="/contact" style={{
                  backgroundColor: '#FFD326',
                  color: '#00482D',
                  padding: '14px 40px',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '1.1rem',
                  display: 'inline-block',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 6px 20px rgba(255,211,38,0.4)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 8px 30px rgba(255,211,38,0.6)';
                  e.target.style.backgroundColor = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 6px 20px rgba(255,211,38,0.4)';
                  e.target.style.backgroundColor = '#FFD326';
                }}>
                  Contact Research & Extension Office
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

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
                <a href="#" style={{ color: 'rgba(255,255,255,0.6)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#FFD326'} onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}><i className="fab fa-facebook-f"></i></a>
                <a href="#" style={{ color: 'rgba(255,255,255,0.6)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#FFD326'} onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}><i className="fab fa-twitter"></i></a>
                <a href="#" style={{ color: 'rgba(255,255,255,0.6)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#FFD326'} onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}><i className="fab fa-youtube"></i></a>
                <a href="#" style={{ color: 'rgba(255,255,255,0.6)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#FFD326'} onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}><i className="fab fa-instagram"></i></a>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>

      {/* ========== LIGHTBOX MODAL ========== */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
            cursor: 'pointer',
            animation: 'fadeIn 0.3s ease'
          }}
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
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
          <img
            src={selectedImage}
            alt="Full view"
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain',
              borderRadius: '12px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
              cursor: 'default',
              animation: 'zoomIn 0.3s ease'
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* ========== GLOBAL STYLES (Animations) ========== */}
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
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes bounceDown {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
};

export default ResearchExtensionPage;