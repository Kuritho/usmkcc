// src/components/Academics.js - Professional School Design with Faculty Hierarchy Tree (No Description Overlay)
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Image, Button, Badge, Spinner, Tab, Nav } from 'react-bootstrap';
import { getFacultyByCollege, getFacultyByProgram, getDeansByCollege, getProgramHeads, getDepartmentHeads, getFaculty } from '../supabase/services';

import coeImage from '../assets/images/coe.jpg';
import cotImage from '../assets/images/cot.jpg';
import ceasImage from '../assets/images/ceas.jpg';
import graduateImage from '../assets/images/graduate.jpg';
import defaultCollegeImage from '../assets/images/default-college.jpg';

const Academics = () => {
  const [loading, setLoading] = useState(true);
  const [facultyData, setFacultyData] = useState({});
  const [deansData, setDeansData] = useState({});
  const [programHeadsData, setProgramHeadsData] = useState({});
  const [departmentHeadsData, setDepartmentHeadsData] = useState({});
  const [allFaculty, setAllFaculty] = useState([]);
  const [activeCollege, setActiveCollege] = useState(null);
  const [selectedTab, setSelectedTab] = useState('programs');

  // College definitions - GEP is still in the data but will be filtered out for display
  const colleges = [
    {
      id: 1,
      name: "College of Engineering",
      image: coeImage,
      programs: [
        "Bachelor of Science in Industrial Engineering",
        "Bachelor of Science in Mechanical Engineering",
        "Bachelor of Science in Electrical Engineering",
      ],
      description: "The College of Engineering at USM-Kidapawan City Campus offers programs designed to develop competent engineers equipped with technical knowledge and practical skills. Our curriculum emphasizes hands-on learning and industry partnerships to prepare students for real-world challenges.",
      mission: "To produce globally competitive engineers who are innovative, ethical, and committed to sustainable development.",
      vision: "A center of excellence in engineering education, research, and community service.",
      colors: "#00482D",
      icon: "fa-engine"
    },
    {
      id: 2,
      name: "College of Education, Arts and Sciences",
      image: ceasImage,
      programs: [
        "Bachelor of Secondary Education major in Filipino",
        "Bachelor of Secondary Education major in English",
        "Bachelor of Secondary Education major in Mathematics",
        "Bachelor of Secondary Education major in Social Studies",
        "Bachelor of Technical-Vocational Teacher Education major in Automotive Technology",
        "Bachelor of Technical-Vocational Teacher Education major in Electronics Technology",
        "Bachelor of Technical-Vocational Teacher Education major in Food and Services Management",
        "Bachelor of Technical-Vocational Teacher Education major in Garments, Fashion, and Design",
        "General and Professional Education Program"
      ],
      description: "The College of Education, Arts, and Sciences (CEAS) is committed to producing highly competent teachers and professionals. We provide quality education through innovative teaching methods, research, and community engagement to develop morally upright and globally competitive graduates.",
      mission: "To develop competent educators and professionals who are catalysts of change in their communities.",
      vision: "A premier college producing transformative educators and leaders in the arts and sciences.",
      colors: "#1a3d7c",
      icon: "fa-graduation-cap"
    },
    {
      id: 3,
      name: "College of Technology",
      image: cotImage,
      programs: [
        "Bachelor of Industrial Technology (BIndTech) major in Automotive Technology",
        "Bachelor of Industrial Technology (BIndTech) major in Construction Technology",
        "Bachelor of Industrial Technology (BIndTech) major in Electronics Technology",
        "Bachelor of Industrial Technology (BIndTech) major in Electrical Technology",
        "Bachelor of Industrial Technology (BIndTech) major in Heating, Ventilating, and Air-Conditioning",
        "Bachelor of Industrial Technology (BIndTech) major in Mechanical Technology",
        "Bachelor of Industrial Technology (BIndTech) major in Welding and Fabrication Technology",
        "Bachelor of Industrial Technology (BIndTech) Major in Food and Beverage Preparation and Service Technology",
        "Bachelor of Industrial Technology (BInTech) Major in Culinary Technology",
        "Bachelor of Industrial Technology (BIT) Major in Food and Beverage Preparation and Service Technology",
        "Bachelor of Technology (BT) major in Automotive Technology",
        "Bachelor of Technology (BT) major in Civil Technology",
        "Bachelor of Technology (BT) major in Electrical Technology",
        "Bachelor of Technology (BT) major in Electronics Technology",
        "Bachelor of Technology (BT) major in Heating, Ventilating, Air Conditioning Technology",
        "Bachelor of Technology (BT) major in Mechanical Technology",
        "Bachelor of Technology (BT) major in Welding and Fabrication Technology",
        "Diploma of Technology (DT) major in Automotive Technology",
        "Diploma of Technology (DT) major in Civil Technology",
        "Diploma of Technology (DT) major in Electrical Technology",
        "Diploma of Technology (DT) major in Electronics Technology",
        "Diploma of Technology (DT) major in Heating, Ventilating, Air Conditioning Technology",
        "Diploma of Technology (DT) major in Mechanical Technology",
        "Diploma of Technology (DT) major in Welding and Fabrication Technology",
        "Food Preparation and Services Technology"
      ],
      description: "The College of Technology offers technical-vocational programs that combine theoretical knowledge with practical skills training. Our state-of-the-art facilities and industry-experienced faculty prepare students for immediate employment in various technical fields.",
      mission: "To produce highly skilled technologists and entrepreneurs who are responsive to industry demands.",
      vision: "A leading college in technology education, innovation, and sustainable development.",
      colors: "#28a745",
      icon: "fa-cogs"
    }
  ];

  // Graduate Programs
  const graduatePrograms = [
    {
      id: 'mte',
      name: "Master of Technology Education",
      type: "Master's Degree",
      description: "The Master of Technology Education (MTE) program is designed to prepare technology educators, trainers, and professionals who can effectively integrate technology into teaching and learning.",
      objectives: [
        "Develop advanced knowledge and skills in technology education pedagogy",
        "Integrate emerging technologies into teaching and learning environments",
        "Conduct research in technology education and instructional design",
        "Design and develop technology-enhanced curricula and instructional materials",
        "Lead technology education initiatives in academic and industrial settings",
        "Promote innovation and excellence in technology education"
      ],
      image: graduateImage
    },
    {
      id: 'maed',
      name: "Master of Arts in Education Major in Educational Management",
      type: "Master's Degree",
      description: "The Master of Arts in Education program is designed to develop educational leaders, researchers, and practitioners who can address the challenges and opportunities in various educational contexts.",
      objectives: [
        "Develop advanced knowledge in educational theory and practice",
        "Conduct research in education to improve teaching and learning",
        "Lead educational initiatives in various educational settings",
        "Promote equity and excellence in education"
      ],
      image: graduateImage
    },
    {
      id: 'malle',
      name: "Master of Language and Literacy Education",
      type: "Master's Degree",
      description: "The Master of Arts in Language and Literacy Education program focuses on developing expertise in language teaching, literacy development, and curriculum design for diverse learners.",
      objectives: [
        "Develop advanced expertise in language and literacy education",
        "Design and implement effective literacy programs",
        "Conduct research in language teaching and literacy development",
        "Address literacy challenges in diverse educational contexts"
      ],
      image: graduateImage
    },
    {
      id: 'phd',
      name: "Doctor of Philosophy in Technology Education and Management",
      type: "Doctoral Degree",
      description: "The Doctor of Philosophy in Technology Education and Management program develops advanced researchers, educators, and leaders who can contribute to the advancement of technology education and management practices.",
      objectives: [
        "Conduct pioneering research in technology education and management",
        "Develop advanced theoretical and practical knowledge in the field",
        "Lead innovation and change in technology education and management",
        "Contribute to the body of knowledge in technology education"
      ],
      image: graduateImage
    }
  ];

  // Filter function to exclude GEP from program listings
  const getDisplayPrograms = (programs) => {
    return programs.filter(p => p !== "General and Professional Education Program");
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const collegeNames = ['College of Engineering', 'College of Education, Arts and Sciences', 'College of Technology'];
      
      const facultyPromises = collegeNames.map(college => getFacultyByCollege(college));
      const facultyResults = await Promise.all(facultyPromises);
      
      const facultyMap = {};
      collegeNames.forEach((college, index) => {
        facultyMap[college] = facultyResults[index].success ? facultyResults[index].data : [];
      });
      setFacultyData(facultyMap);
      
      const deanPromises = collegeNames.map(college => getDeansByCollege(college));
      const deanResults = await Promise.all(deanPromises);
      
      const deansMap = {};
      collegeNames.forEach((college, index) => {
        deansMap[college] = deanResults[index].success ? deanResults[index].data : null;
      });
      setDeansData(deansMap);
      
      const headPromises = collegeNames.map(college => getProgramHeads(college));
      const headResults = await Promise.all(headPromises);
      
      const headsMap = {};
      collegeNames.forEach((college, index) => {
        headsMap[college] = headResults[index].success ? headResults[index].data : [];
      });
      setProgramHeadsData(headsMap);
      
      const deptHeadPromises = collegeNames.map(college => getDepartmentHeads(college));
      const deptHeadResults = await Promise.all(deptHeadPromises);
      
      const deptHeadsMap = {};
      collegeNames.forEach((college, index) => {
        deptHeadsMap[college] = deptHeadResults[index].success ? deptHeadResults[index].data : [];
      });
      setDepartmentHeadsData(deptHeadsMap);
      
      const allFacultyResult = await getFaculty();
      if (allFacultyResult.success) {
        setAllFaculty(allFacultyResult.data);
      }
      
    } catch (error) {
      console.error('Error loading academic data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFacultyForProgram = (program, collegeName) => {
    if (!collegeName || !facultyData[collegeName]) return [];
    return facultyData[collegeName].filter(f => f.program === program && f.is_active);
  };

  const getAlliedFaculty = (collegeName) => {
    if (!collegeName || !facultyData[collegeName]) return [];
    return facultyData[collegeName].filter(f => f.is_allied && f.is_active);
  };

  const getCollegeFaculty = (collegeName) => {
    if (!collegeName || !facultyData[collegeName]) return [];
    return facultyData[collegeName].filter(f => f.is_active && !f.is_allied && !f.is_dean && !f.is_program_head && !f.is_department_head);
  };

  if (loading) {
    return (
      <div className="academics-page">
        <div className="academics-hero bg-gradient-usmkc text-white py-5">
          <Container>
            <Row className="justify-content-center">
              <Col lg={8} className="text-center">
                <h1 className="display-4 fw-bold mb-3">Academic Programs</h1>
                <p className="lead text-white mb-4">Excellence in Education, Innovation, and Community Service</p>
              </Col>
            </Row>
          </Container>
        </div>
        <Container className="py-5 text-center">
          <Spinner animation="border" variant="success" />
          <p className="mt-3">Loading academic programs and faculty...</p>
        </Container>
      </div>
    );
  }

  return (
    <div className="academics-page">
      {/* Hero Section */}
      <div className="academics-hero bg-gradient-usmkc text-white py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h1 className="display-4 fw-bold mb-3">Academic Programs</h1>
              <p className="lead text-white mb-4">Excellence in Education, Innovation, and Community Service</p>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        {/* Tab Navigation */}
        <Row className="mb-4">
          <Col>
            <div className="academics-tabs d-flex justify-content-center mb-4">
              <Button 
                variant={selectedTab === 'programs' ? 'usmkc-yellow' : 'outline-usmkc-green'}
                className="rounded-pill px-4 me-2"
                onClick={() => setSelectedTab('programs')}
              >
                <i className="fas fa-list-ul me-2"></i> Programs Offered
              </Button>
              <Button 
                variant={selectedTab === 'colleges' ? 'usmkc-yellow' : 'outline-usmkc-green'}
                className="rounded-pill px-4"
                onClick={() => {
                  setSelectedTab('colleges');
                  setActiveCollege(null);
                }}
              >
                <i className="fas fa-university me-2"></i> Campus Colleges
              </Button>
            </div>
          </Col>
        </Row>

        {/* Programs Offered Tab - Shows all programs first */}
        {selectedTab === 'programs' && !activeCollege && (
          <div>
            <h2 className="text-center text-usmkc-green mb-4 fw-bold">All Programs Offered</h2>
            <p className="text-center text-muted mb-5">
              Browse all academic programs offered across our campus colleges
            </p>
            
            {colleges.map(college => {
              const displayPrograms = getDisplayPrograms(college.programs);
              return (
                <div key={college.id} className="mb-5">
                  <h3 className="text-usmkc-green mb-3 fw-bold" style={{ borderBottom: '2px solid var(--usmkc-yellow)', paddingBottom: '0.5rem' }}>
                    {college.name}
                  </h3>
                  <Row className="g-3">
                    {displayPrograms.map((program, index) => {
                      const facultyCount = getFacultyForProgram(program, college.name).length;
                      return (
                        <Col md={6} lg={4} key={index}>
                          <Card 
                            className="program-card-mini h-100 shadow-sm border-0"
                            onClick={() => {
                              setActiveCollege(college);
                              setSelectedTab('colleges');
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            <Card.Body className="p-3">
                              <div className="d-flex justify-content-between align-items-start">
                                <div>
                                  <h6 className="text-usmkc-green fw-semibold mb-1">{program}</h6>
                                  <small className="text-muted">
                                    <i className="fas fa-users me-1"></i> {facultyCount} faculty
                                  </small>
                                </div>
                                <Badge bg="usmkc-light" text="usmkc-green" className="rounded-pill">
                                  {college.name}
                                </Badge>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              );
            })}

            {/* Graduate Programs Section in Programs Tab */}
            <div className="mt-5">
              <h3 className="text-usmkc-green mb-3 fw-bold" style={{ borderBottom: '2px solid var(--usmkc-yellow)', paddingBottom: '0.5rem' }}>
                Graduate Programs
              </h3>
              <Row className="g-3 justify-content-center">
                {graduatePrograms.map((program) => {
                  const facultyCount = allFaculty.filter(f => 
                    f.college === 'Graduate Programs' && 
                    f.program === program.name && 
                    f.is_active
                  ).length;
                  
                  return (
                    <Col md={6} lg={4} key={program.id}>
                      <Card 
                        className="program-card-mini h-100 shadow-sm border-0"
                        onClick={() => {
                          setActiveCollege({
                            id: 'graduate',
                            name: 'Graduate Programs',
                            description: 'Advanced degree programs designed to enhance professional skills and academic knowledge.',
                            programs: graduatePrograms.map(p => p.name)
                          });
                          setSelectedTab('colleges');
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <Card.Body className="p-3">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <h6 className="text-usmkc-green fw-semibold mb-1">{program.name}</h6>
                              <small className="text-muted">
                                <i className="fas fa-users me-1"></i> {facultyCount} faculty
                              </small>
                              <div className="mt-1">
                                <Badge bg="usmkc-yellow" className="rounded-pill me-1">
                                  {program.type}
                                </Badge>
                              </div>
                            </div>
                            <Badge bg="usmkc-light" text="usmkc-green" className="rounded-pill">
                              Graduate
                            </Badge>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </div>
        )}

        {/* Campus Colleges Tab */}
        {selectedTab === 'colleges' && (
          <div>
            {/* College Selection Cards */}
            {!activeCollege && (
              <div>
                <h2 className="text-center text-usmkc-green mb-4 fw-bold">Campus Colleges</h2>
                <Row className="g-4">
                  {colleges.map(college => (
                    <Col md={6} lg={4} key={college.id}>
                      <Card 
                        className="h-100 shadow college-card text-center border-0" 
                        style={{ cursor: 'pointer' }}
                        onClick={() => setActiveCollege(college)}
                      >
                        <div className="college-image-container">
                          <Card.Img 
                            variant="top" 
                            src={college.image}
                            alt={college.name}
                            className="college-image"
                            style={{ height: '200px', objectFit: 'cover' }}
                            onError={(e) => {
                              e.target.src = defaultCollegeImage;
                            }}
                          />
                          <div className="college-overlay d-flex align-items-center justify-content-center">
                            <div>
                              <Button variant="outline-light" className="rounded-pill px-4">View College</Button>
                              <p className="mt-2 mb-0 text-white small">{getDisplayPrograms(college.programs).length} Programs</p>
                            </div>
                          </div>
                        </div>
                        <Card.Body className="p-4">
                          <Card.Title className="text-usmkc-green fw-bold">{college.name}</Card.Title>
                          <Card.Text className="text-muted small">{college.description}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              
                {/* Graduate Programs - Centered */}
                <h2 className="text-center text-usmkc-green mb-4 fw-bold mt-5">Graduate School</h2>
                <Row className="g-4 justify-content-center">
                  <Col md={6} lg={4}>
                    <Card 
                      className="h-100 shadow college-card text-center border-0" 
                      style={{ cursor: 'pointer' }}
                      onClick={() => setActiveCollege({
                        id: 'graduate',
                        name: 'Graduate Programs',
                        description: 'Advanced degree programs designed to enhance professional skills and academic knowledge.',
                        programs: graduatePrograms.map(p => p.name)
                      })}
                    >
                      <div className="college-image-container">
                        <Card.Img 
                          variant="top" 
                          src={graduateImage} 
                          alt="Graduate Programs"
                          className="college-image"
                          style={{ height: '200px', objectFit: 'cover' }}
                          onError={(e) => {
                            e.target.src = defaultCollegeImage;
                          }}
                        />
                        <div className="college-overlay d-flex align-items-center justify-content-center">
                          <div>
                            <Button variant="outline-light" className="rounded-pill px-4">View Programs</Button>
                            <p className="mt-2 mb-0 text-white small">{graduatePrograms.length} Programs</p>
                          </div>
                        </div>
                      </div>
                      <Card.Body className="p-4">
                        <Card.Title className="text-usmkc-green fw-bold">Graduate Programs</Card.Title>
                        <Card.Text className="text-muted small">Advanced degree programs designed to enhance professional skills and academic knowledge.</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>
            )}

            {/* College Content when selected */}
            {activeCollege && (
              <div>
                <Row className="mb-4">
                  <Col>
                    <Button 
                      variant="outline-usmkc-green" 
                      onClick={() => {
                        setActiveCollege(null);
                      }} 
                      className="mb-3 rounded-pill px-4"
                    >
                      ← Back to Colleges
                    </Button>
                  </Col>
                </Row>
                
                {activeCollege.id === 'graduate' ? renderGraduateContent() : renderCollegeContent()}
              </div>
            )}
          </div>
        )}
      </Container>

      <style>{`
        :root {
          --usmkc-green: #00482D;
          --usmkc-yellow: #FFD326;
          --usmkc-light-green: #e6f2ed;
          --usmkc-light: #f8f9fa;
        }
        
        .academics-hero {
          background: linear-gradient(135deg, rgba(0, 72, 45, 0.9) 0%, rgba(0, 72, 45, 0.85) 100%), url('/images/academics-hero-bg.jpg');
          background-size: cover;
          background-position: center;
          position: relative;
        }
        
        .bg-gradient-usmkc {
          background: linear-gradient(135deg, var(--usmkc-green) 0%, #006641 100%) !important;
        }
        
        .bg-usmkc-green {
          background-color: var(--usmkc-green) !important;
        }
        
        .bg-usmkc-yellow {
          background-color: var(--usmkc-yellow) !important;
        }
        
        .bg-usmkc-light {
          background-color: var(--usmkc-light-green) !important;
        }
        
        .text-usmkc-green {
          color: var(--usmkc-green) !important;
        }
        
        .text-usmkc-yellow {
          color: var(--usmkc-yellow) !important;
        }
        
        .btn-usmkc-yellow {
          background-color: var(--usmkc-yellow);
          color: #000;
          border: none;
          font-weight: 500;
        }
        
        .btn-usmkc-yellow:hover {
          background-color: #e6ba1f;
          color: #000;
        }
        
        .btn-outline-usmkc-green {
          color: var(--usmkc-green);
          border-color: var(--usmkc-green);
          font-weight: 500;
        }
        
        .btn-outline-usmkc-green:hover {
          background-color: var(--usmkc-green);
          color: white;
        }
        
        .btn-outline-usmkc-green.active {
          background-color: var(--usmkc-green);
          color: white;
        }
        
        /* Tab Buttons */
        .academics-tabs .btn {
          transition: all 0.3s ease;
          font-weight: 500;
        }
        
        .academics-tabs .btn-usmkc-yellow {
          background-color: var(--usmkc-yellow);
          color: #000;
          border: none;
        }
        
        .academics-tabs .btn-usmkc-yellow:hover {
          background-color: #e6ba1f;
          color: #000;
        }
        
        /* Program Mini Cards */
        .program-card-mini {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-radius: 10px;
          cursor: pointer;
        }
        
        .program-card-mini:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12) !important;
          border-color: var(--usmkc-yellow);
        }
        
        .college-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-radius: 12px;
          overflow: hidden;
        }
        
        .college-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15) !important;
        }
        
        .college-image-container {
          position: relative;
          overflow: hidden;
          height: 200px;
        }
        
        .college-image {
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .college-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 72, 45, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .college-card:hover .college-overlay {
          opacity: 1;
        }
        
        .college-card:hover .college-image {
          transform: scale(1.1);
        }
        
        .college-icon-container {
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* College Detail Page */
        .college-detail-header {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 2rem;
        }

        .college-detail-banner {
          width: 100%;
          height: 300px;
          object-fit: cover;
        }

        /* No overlay - just the image */

        /* Faculty Hierarchy Tree */
        .faculty-hierarchy {
          padding: 1rem 0;
        }

        .hierarchy-level {
          margin-bottom: 2.5rem;
          position: relative;
        }

        .hierarchy-level:not(:last-child)::after {
          content: '';
          position: absolute;
          bottom: -1.25rem;
          left: 50%;
          width: 2px;
          height: 2rem;
          background: #00482D;
          transform: translateX(-50%);
        }

        .hierarchy-level-title {
          text-align: center;
          font-size: 1.1rem;
          font-weight: 600;
          color: #00482D;
          margin-bottom: 1.5rem;
          position: relative;
        }

        .hierarchy-level-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 3px;
          background: #FFD326;
          border-radius: 2px;
        }

        .hierarchy-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1.5rem;
          justify-items: center;
        }

        .hierarchy-grid.centered {
          justify-items: center;
        }

        .hierarchy-grid.single {
          grid-template-columns: 1fr;
          max-width: 300px;
          margin: 0 auto;
        }

        .hierarchy-grid.deans-grid {
          grid-template-columns: 1fr;
          max-width: 320px;
          margin: 0 auto;
        }

        .hierarchy-grid.program-heads-grid {
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        }

        .hierarchy-grid.department-heads-grid {
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          max-width: 800px;
          margin: 0 auto;
        }

        .hierarchy-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem 1rem;
          text-align: center;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
          width: 100%;
          max-width: 220px;
          border: 1px solid #eaeaea;
        }

        .hierarchy-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.12);
          border-color: #FFD326;
        }

        .hierarchy-card .faculty-image-wrapper {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto 1rem;
          border: 3px solid #00482D;
          position: relative;
        }

        .hierarchy-card .faculty-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hierarchy-card .faculty-name {
          font-weight: 700;
          font-size: 1rem;
          color: #00482D;
          margin-bottom: 0.25rem;
        }

        .hierarchy-card .faculty-position {
          font-size: 0.85rem;
          color: #6c757d;
          margin-bottom: 0.25rem;
        }

        .hierarchy-card .faculty-program {
          font-size: 0.75rem;
          color: #6c757d;
          background: #f8f9fa;
          padding: 2px 10px;
          border-radius: 20px;
          display: inline-block;
        }

        .hierarchy-card .role-badge {
          display: inline-block;
          padding: 2px 12px;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 600;
          margin-top: 0.5rem;
        }

        .role-badge.dean {
          background: #00482D;
          color: #FFD326;
        }

        .role-badge.program-head {
          background: #1a3d7c;
          color: white;
        }

        .role-badge.department-head {
          background: #28a745;
          color: white;
        }

        .role-badge.faculty {
          background: #e6f2ed;
          color: #00482D;
        }

        .role-badge.allied {
          background: #6f42c1;
          color: white;
        }

        /* Faculty Tree Lines */
        .tree-connector {
          display: flex;
          justify-content: center;
          padding: 0.5rem 0;
        }

        .tree-connector-line {
          width: 2px;
          height: 30px;
          background: #00482D;
          position: relative;
        }

        .tree-connector-line::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 8px;
          height: 8px;
          background: #00482D;
          border-radius: 50%;
        }

        .tree-connector-line::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 8px;
          height: 8px;
          background: #00482D;
          border-radius: 50%;
        }

        .connector-horizontal {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          padding: 0.5rem 0;
        }

        .connector-horizontal .line {
          flex: 1;
          height: 2px;
          background: #00482D;
          max-width: 100px;
        }

        .connector-horizontal .dot {
          width: 8px;
          height: 8px;
          background: #00482D;
          border-radius: 50%;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .academics-tabs {
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .academics-tabs .btn {
            width: 100%;
            margin: 0 !important;
          }

          .college-detail-banner {
            height: 200px;
          }

          .hierarchy-grid {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          }

          .hierarchy-grid.department-heads-grid {
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            max-width: 100%;
          }

          .hierarchy-card {
            max-width: 180px;
            padding: 1rem 0.75rem;
          }

          .hierarchy-card .faculty-image-wrapper {
            width: 80px;
            height: 80px;
          }
        }

        @media (max-width: 480px) {
          .hierarchy-grid {
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            gap: 1rem;
          }

          .hierarchy-grid.department-heads-grid {
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          }

          .hierarchy-card {
            max-width: 160px;
            padding: 0.75rem 0.5rem;
          }

          .hierarchy-card .faculty-image-wrapper {
            width: 70px;
            height: 70px;
          }

          .hierarchy-card .faculty-name {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );

  // Render Graduate Content
  function renderGraduateContent() {
    return (
      <div>
        <div className="college-detail-header">
          <img src={graduateImage} alt="Graduate Programs" className="college-detail-banner" />
        </div>

        <div className="college-description mb-4">
          <h2 className="text-usmkc-green fw-bold">Graduate Programs</h2>
          <p className="lead">{activeCollege.description}</p>
        </div>

        <Row className="mb-4">
          <Col>
            <h4 className="text-usmkc-green fw-bold mb-3">Programs Offered</h4>
            <Row className="g-2">
              {graduatePrograms.map((program, idx) => (
                <Col md={6} lg={4} key={idx}>
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body>
                      <h6 className="text-usmkc-green fw-semibold">{program.name}</h6>
                      <Badge bg="usmkc-yellow" className="mb-2">{program.type}</Badge>
                      <p className="small text-muted">{program.description.substring(0, 100)}...</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    );
  }

  // Render College Content
  function renderCollegeContent() {
    const college = activeCollege;
    const dean = deansData[college.name];
    const programHeads = programHeadsData[college.name] || [];
    const departmentHeads = departmentHeadsData[college.name] || [];
    const regularFaculty = getCollegeFaculty(college.name);
    const alliedFaculty = getAlliedFaculty(college.name);

    return (
      <div>
        {/* College Header - No Overlay */}
        <div className="college-detail-header">
          <img src={college.image} alt={college.name} className="college-detail-banner" />
        </div>

        {/* College Description */}
        <div className="college-description mb-4">
          <h2 className="text-usmkc-green fw-bold">{college.name}</h2>
          <p>{college.description}</p>
          <Row className="mt-3">
            <Col md={6}>
              {college.mission && (
                <>
                  <h6 className="text-usmkc-green fw-semibold">Mission</h6>
                  <p className="text-muted">{college.mission}</p>
                </>
              )}
            </Col>
            <Col md={6}>
              {college.vision && (
                <>
                  <h6 className="text-usmkc-green fw-semibold">Vision</h6>
                  <p className="text-muted">{college.vision}</p>
                </>
              )}
            </Col>
          </Row>
          <div className="mt-3 p-3 bg-light rounded">
            <h6 className="text-usmkc-green fw-bold mb-2">Quick Info</h6>
            <div className="d-flex flex-wrap gap-4">
              <p className="mb-0"><strong>Programs:</strong> {getDisplayPrograms(college.programs).length}</p>
              <p className="mb-0"><strong>Faculty:</strong> {regularFaculty.length + alliedFaculty.length}</p>
              {dean && <p className="mb-0"><strong>Dean:</strong> {dean.name}</p>}
            </div>
          </div>
        </div>

        {/* Faculty Hierarchy Tree */}
        <div className="faculty-hierarchy">
          <h4 className="text-usmkc-green fw-bold mb-4 text-center">Faculty Organization</h4>

          {/* Level 1: Dean */}
          {dean && (
            <div className="hierarchy-level">
              <div className="hierarchy-level-title">Dean</div>
              <div className="hierarchy-grid deans-grid">
                <div className="hierarchy-card">
                  <div className="faculty-image-wrapper">
                    <img src={dean.image_url || '/images/staff/placeholder.png'} alt={dean.name} />
                  </div>
                  <div className="faculty-name">{dean.name}</div>
                  <div className="faculty-position">{dean.designation || 'College Dean'}</div>
                  <span className="role-badge dean">Dean</span>
                </div>
              </div>
              <div className="tree-connector">
                <div className="tree-connector-line"></div>
              </div>
            </div>
          )}

          {/* Level 2: Department Heads (if any) - CENTERED */}
          {departmentHeads.length > 0 && (
            <div className="hierarchy-level">
              <div className="hierarchy-level-title">Department Heads</div>
              <div className="hierarchy-grid department-heads-grid">
                {departmentHeads.map((head, idx) => (
                  <div key={idx} className="hierarchy-card">
                    <div className="faculty-image-wrapper">
                      <img src={head.image_url || '/images/staff/placeholder.png'} alt={head.name} />
                    </div>
                    <div className="faculty-name">{head.name}</div>
                    <div className="faculty-position">{head.designation || 'Department Head'}</div>
                    {head.program && <div className="faculty-program">{head.program}</div>}
                    <span className="role-badge department-head">Department Head</span>
                  </div>
                ))}
              </div>
              <div className="tree-connector">
                <div className="tree-connector-line"></div>
              </div>
            </div>
          )}

          {/* Level 3: Program/Unit Heads */}
          {programHeads.length > 0 && (
            <div className="hierarchy-level">
              <div className="hierarchy-level-title">
                {college.name === "College of Technology" ? "Unit Heads" : "Program Heads"}
              </div>
              <div className="hierarchy-grid program-heads-grid">
                {programHeads.map((head, idx) => (
                  <div key={idx} className="hierarchy-card">
                    <div className="faculty-image-wrapper">
                      <img src={head.image_url || '/images/staff/placeholder.png'} alt={head.name} />
                    </div>
                    <div className="faculty-name">{head.name}</div>
                    <div className="faculty-position">{head.designation || 'Program Head'}</div>
                    {head.program && <div className="faculty-program">{head.program}</div>}
                    <span className="role-badge program-head">Program Head</span>
                  </div>
                ))}
              </div>
              <div className="tree-connector">
                <div className="tree-connector-line"></div>
              </div>
            </div>
          )}

          {/* Level 4: Faculty Members */}
          {regularFaculty.length > 0 && (
            <div className="hierarchy-level">
              <div className="hierarchy-level-title">Faculty Members</div>
              <div className="hierarchy-grid">
                {regularFaculty.map((member, idx) => (
                  <div key={idx} className="hierarchy-card">
                    <div className="faculty-image-wrapper">
                      <img src={member.image_url || '/images/staff/placeholder.png'} alt={member.name} />
                    </div>
                    <div className="faculty-name">{member.name}</div>
                    <div className="faculty-position">{member.designation || 'Faculty'}</div>
                    {member.program && <div className="faculty-program">{member.program}</div>}
                    <span className="role-badge faculty">Faculty</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Level 5: Allied Faculty */}
          {alliedFaculty.length > 0 && (
            <div className="hierarchy-level mt-4">
              <div className="hierarchy-level-title">Allied Faculty</div>
              <div className="hierarchy-grid">
                {alliedFaculty.map((member, idx) => (
                  <div key={idx} className="hierarchy-card">
                    <div className="faculty-image-wrapper">
                      <img src={member.image_url || '/images/staff/placeholder.png'} alt={member.name} />
                    </div>
                    <div className="faculty-name">{member.name}</div>
                    <div className="faculty-position">{member.designation || 'Allied Faculty'}</div>
                    {member.program && <div className="faculty-program">{member.program}</div>}
                    <span className="role-badge allied">Allied</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!dean && !programHeads.length && !departmentHeads.length && !regularFaculty.length && !alliedFaculty.length && (
            <p className="text-center text-muted">Faculty information will be available soon.</p>
          )}
        </div>
      </div>
    );
  }
};

export default Academics;