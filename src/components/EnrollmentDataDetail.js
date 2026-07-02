import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Card, ButtonGroup, Button, Tab, Tabs, Form } from 'react-bootstrap';
import { Bar, Doughnut } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const EnrollmentDataDetail = () => {
  // College of Technology programs data
  const cotPrograms = [
    {
      program: 'Bachelor of Industrial Technology',
      major: 'Food and Beverage Preparation and Services Management',
      sem1_2024_2025: 355,
      sem2_2024_2025: 333,
      sem1_2025_2026: 285
    },
    {
      program: 'Bachelor of Technology',
      major: 'Automotive Technology',
      sem1_2024_2025: 189,
      sem2_2024_2025: 183,
      sem1_2025_2026: 56
    },
    {
      program: 'Bachelor of Technology',
      major: 'Construction Technology A',
      sem1_2024_2025: 0,
      sem2_2024_2025: 0,
      sem1_2025_2026: 43
    },
    {
      program: 'Bachelor of Technology',
      major: 'Culinary Technology',
      sem1_2024_2025: 0,
      sem2_2024_2025: 0,
      sem1_2025_2026: 87
    },
    {
      program: 'Bachelor of Technology',
      major: 'Civil Technology',
      sem1_2024_2025: 153,
      sem2_2024_2025: 143,
      sem1_2025_2026: 43
    },
    {
      program: 'Bachelor of Technology',
      major: 'Electrical Technology 2',
      sem1_2024_2025: 191,
      sem2_2024_2025: 176,
      sem1_2025_2026: 87
    },
    {
      program: 'Bachelor of Technology',
      major: 'Electronics Technology',
      sem1_2024_2025: 51,
      sem2_2024_2025: 51,
      sem1_2025_2026: 55
    },
    {
      program: 'Bachelor of Technology',
      major: 'HVAC Technology',
      sem1_2024_2025: 51,
      sem2_2024_2025: 49,
      sem1_2025_2026: 55
    },
    {
      program: 'Bachelor of Technology',
      major: 'Mechanical Technology',
      sem1_2024_2025: 128,
      sem2_2024_2025: 118,
      sem1_2025_2026: 72
    },
    {
      program: 'Bachelor of Technology',
      major: 'Welding and Fabrication Technology',
      sem1_2024_2025: 53,
      sem2_2024_2025: 52,
      sem1_2025_2026: 65
    },
    {
      program: 'Diploma of Technology',
      major: 'Automotive Technology',
      sem1_2024_2025: 118,
      sem2_2024_2025: 106,
      sem1_2025_2026: 50
    },
    {
      program: 'Diploma of Technology',
      major: 'Civil Technology',
      sem1_2024_2025: 90,
      sem2_2024_2025: 82,
      sem1_2025_2026: 67
    },
    {
      program: 'Diploma of Technology',
      major: 'Electrical Technology',
      sem1_2024_2025: 38,
      sem2_2024_2025: 38,
      sem1_2025_2026: 73
    },
    {
      program: 'Diploma of Technology',
      major: 'Electronics Technology',
      sem1_2024_2025: 102,
      sem2_2024_2025: 95,
      sem1_2025_2026: 80
    },
    {
      program: 'Diploma of Technology',
      major: 'HVAC Technology',
      sem1_2024_2025: 79,
      sem2_2024_2025: 67,
      sem1_2025_2026: 45
    },
    {
      program: 'Diploma of Technology',
      major: 'Mechanical Technology',
      sem1_2024_2025: 34,
      sem2_2024_2025: 30,
      sem1_2025_2026: 58
    },
    {
      program: 'Diploma of Technology',
      major: 'Welding and Fabrication Technology',
      sem1_2024_2025: 101,
      sem2_2024_2025: 94,
      sem1_2025_2026: 52
    },
    {
      program: 'Diploma of Technology',
      major: 'Food Service and Management',
      sem1_2024_2025: 234,
      sem2_2024_2025: 223,
      sem1_2025_2026: 78
    }
  ];

  // College of Education, Art and Science programs data
  const ceasPrograms = [
    {
      program: 'Bachelor of Secondary Education',
      major: 'English',
      sem1_2024_2025: 278,
      sem2_2024_2025: 278,
      sem1_2025_2026: 90
    },
    {
      program: 'Bachelor of Secondary Education',
      major: 'Filipino',
      sem1_2024_2025: 181,
      sem2_2024_2025: 175,
      sem1_2025_2026: 80
    },
    {
      program: 'Bachelor of Secondary Education',
      major: 'Mathematics',
      sem1_2024_2025: 174,
      sem2_2024_2025: 172,
      sem1_2025_2026: 105
    },
    {
      program: 'Bachelor of Secondary Education',
      major: 'Social Studies',
      sem1_2024_2025: 224,
      sem2_2024_2025: 221,
      sem1_2025_2026: 88
    },
    {
      program: 'Bachelor of Technology Vocational Teacher Education',
      major: 'Automotive Technology',
      sem1_2024_2025: 89,
      sem2_2024_2025: 86,
      sem1_2025_2026: 52
    },
    {
      program: 'Bachelor of Technology Vocational Teacher Education',
      major: 'Electronics Technology',
      sem1_2024_2025: 111,
      sem2_2024_2025: 103,
      sem1_2025_2026: 60
    },
    {
      program: 'Bachelor of Technology Vocational Teacher Education',
      major: 'Food Service and Management',
      sem1_2024_2025: 149,
      sem2_2024_2025: 145,
      sem1_2025_2026: 72
    },
    {
      program: 'Bachelor of Technology Vocational Teacher Education',
      major: 'Garments, Fashion and Design',
      sem1_2024_2025: 111,
      sem2_2024_2025: 111,
      sem1_2025_2026: 67
    }
  ];

  const coePrograms = [
    {
      program: 'Bachelor of Science in Electrical Engineering',
      major: 'Electrical Engineering',
      sem1_2024_2025: 130,
      sem2_2024_2025: 122,
      sem1_2025_2026: 135
    },
    {
      program: 'Bachelor of Science in Industrial Engineering',
      major: 'Industrial Engineering',
      sem1_2024_2025: 158,
      sem2_2024_2025: 155,
      sem1_2025_2026: 105
    },
    {
      program: 'Bachelor of Science in Mechanical Engineering',
      major: 'Mechanical Engineering',
      sem1_2024_2025: 110,
      sem2_2024_2025: 132,
      sem1_2025_2026: 125
    }
  ];

  const gradPrograms = [
    {
      program: 'Doctor of Philosophy',
      major: 'Technology Education Management',
      sem1_2024_2025: 66,
      sem2_2024_2025: 61,
      sem1_2025_2026: 32
    },
    {
      program: 'Master of Arts',
      major: 'Education',
      sem1_2024_2025: 3,
      sem2_2024_2025: 27,
      sem1_2025_2026: 52
    },
    {
      program: 'Master of Arts',
      major: 'Language and Literacy Education',
      sem1_2024_2025: 38,
      sem2_2024_2025: 38,
      sem1_2025_2026: 42
    },
    {
      program: 'Master of Technology Education',
      major: 'Technology Education',
      sem1_2024_2025: 91,
      sem2_2024_2025: 98,
      sem1_2025_2026: 36
    }
  ];

  // State for semester selection
   const [currentSemester, setCurrentSemester] = useState('sem1_2024_2025');
  const [activeCollege, setActiveCollege] = useState('cot');
  const [viewMode, setViewMode] = useState('chart'); // 'chart' or 'table'
  const [sortConfig, setSortConfig] = useState({ key: 'major', direction: 'ascending' });

  // Combine all programs for summary view
  const allPrograms = [...cotPrograms, ...ceasPrograms, ...coePrograms, ...gradPrograms];

  // Get semester label for display
  const getSemesterLabel = (semesterKey) => {
    const labels = {
      sem1_2024_2025: '1st Semester 2024-2025',
      sem2_2024_2025: '2nd Semester 2024-2025',
      sem1_2025_2026: '1st Semester 2025-2026'
    };
    return labels[semesterKey] || '';
  };

  // Get current programs based on active college
  const getCurrentPrograms = () => {
    switch(activeCollege) {
      case 'cot': return cotPrograms;
      case 'ceas': return ceasPrograms;
      case 'coe': return coePrograms;
      case 'grad': return gradPrograms;
      default: return cotPrograms;
    }
  };

  const getCollegeName = () => {
    switch(activeCollege) {
      case 'cot': return 'College of Technology';
      case 'ceas': return 'College of Education, Art and Science';
      case 'coe': return 'College of Engineering';
      case 'grad': return 'Graduate School';
      default: return '';
    }
  };

  // Calculate total enrollment for current college and semester
  const totalEnrollment = useMemo(() => {
    return getCurrentPrograms().reduce((sum, program) => sum + program[currentSemester], 0);
  }, [activeCollege, currentSemester]);

  // Calculate program type distribution for current college
  const programTypeData = useMemo(() => {
    const programs = getCurrentPrograms();
    const types = {};
    
    programs.forEach(program => {
      const type = program.program.split(' ')[0]; // "Bachelor", "Master", etc.
      if (!types[type]) types[type] = 0;
      types[type] += program[currentSemester];
    });
    
    return {
      labels: Object.keys(types),
      datasets: [
        {
          data: Object.values(types),
          backgroundColor: [
            'rgba(54, 162, 235, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)',
            'rgba(255, 99, 132, 0.7)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [activeCollege, currentSemester]);

  // Prepare chart data
  const prepareChartData = (programs) => {
    const majors = programs.map(item => item.major);
    const enrollments = programs.map(item => item[currentSemester]);
    const programTypes = programs.map(item => item.program);

    // Different color scheme for graduate programs
    const backgroundColors = programs.map(item => 
      item.program.includes('Doctor') ? 'rgba(153, 102, 255, 0.7)' : 
      item.program.includes('Master') ? 'rgba(75, 192, 192, 0.7)' :
      item.program.includes('Bachelor') ? 'rgba(54, 162, 235, 0.7)' : 
      'rgba(255, 159, 64, 0.7)'
    );

    return {
      labels: majors,
      datasets: [
        {
          label: 'Enrollment Count',
          data: enrollments,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors.map(color => color.replace('0.7', '1')),
          borderWidth: 1,
        },
      ],
    };
  };

  // Sort programs for table view
  const sortedPrograms = useMemo(() => {
    let sortableItems = [...getCurrentPrograms()];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [getCurrentPrograms(), sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `${getCollegeName()} - ${getSemesterLabel(currentSemester)}`,
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          afterLabel: function(context) {
            const index = context.dataIndex;
            const programs = getCurrentPrograms();
            return `Program: ${programs[index].program}`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Students'
        }
      }
    },
    maintainAspectRatio: false
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Program Type Distribution',
        font: {
          size: 14
        }
      }
    },
    maintainAspectRatio: false
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="text-center">
            <h1 className="text-primary">University Enrollment Dashboard</h1>
            <p className="lead text-muted">Detailed enrollment statistics by college and semester</p>
          </div>
        </Col>
      </Row>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="shadow-sm border-0 bg-primary text-white">
            <Card.Body className="text-center">
              <h5>Total Enrollment</h5>
              <h3>{allPrograms.reduce((sum, program) => sum + program[currentSemester], 0)}</h3>
              <small>{getSemesterLabel(currentSemester)}</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="shadow-sm border-0">
            <Card.Body className="text-center">
              <h5>College of Technology</h5>
              <h3>{cotPrograms.reduce((sum, program) => sum + program[currentSemester], 0)}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="shadow-sm border-0">
            <Card.Body className="text-center">
              <h5>College of Education</h5>
              <h3>{ceasPrograms.reduce((sum, program) => sum + program[currentSemester], 0)}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="shadow-sm border-0">
            <Card.Body className="text-center">
              <h5>College of Engineering</h5>
              <h3>{coePrograms.reduce((sum, program) => sum + program[currentSemester], 0)}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Tabs
            activeKey={activeCollege}
            onSelect={(k) => setActiveCollege(k)}
            className="mb-3 justify-content-center"
            fill
          >
            <Tab eventKey="cot" title="College of Technology" />
            <Tab eventKey="ceas" title="College of Education" />
            <Tab eventKey="coe" title="College of Engineering" />
            <Tab eventKey="grad" title="Graduate School" />
          </Tabs>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={8}>
          <Card className="shadow-sm mb-3">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">{getCollegeName()} Enrollment</h5>
                <ButtonGroup size="sm">
                  <Button 
                    variant={viewMode === 'chart' ? 'primary' : 'outline-primary'}
                    onClick={() => setViewMode('chart')}
                  >
                    Chart View
                  </Button>
                  <Button 
                    variant={viewMode === 'table' ? 'primary' : 'outline-primary'}
                    onClick={() => setViewMode('table')}
                  >
                    Table View
                  </Button>
                </ButtonGroup>
              </div>
              
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <span className="fw-bold">Total: {totalEnrollment} students</span>
                </div>
                <ButtonGroup>
                  <Button 
                    variant={currentSemester === 'sem1_2024_2025' ? 'primary' : 'outline-primary'}
                    onClick={() => setCurrentSemester('sem1_2024_2025')}
                    size="sm"
                  >
                    Sem 1 2024-2025
                  </Button>
                  <Button 
                    variant={currentSemester === 'sem2_2024_2025' ? 'primary' : 'outline-primary'}
                    onClick={() => setCurrentSemester('sem2_2024_2025')}
                    size="sm"
                  >
                    Sem 2 2024-2025
                  </Button>
                  <Button 
                    variant={currentSemester === 'sem1_2025_2026' ? 'primary' : 'outline-primary'}
                    onClick={() => setCurrentSemester('sem1_2025_2026')}
                    size="sm"
                  >
                    Sem 1 2025-2026
                  </Button>
                </ButtonGroup>
              </div>

              {viewMode === 'chart' ? (
                <div style={{ height: '400px' }}>
                  <Bar 
                    data={prepareChartData(getCurrentPrograms())} 
                    options={chartOptions} 
                  />
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th onClick={() => requestSort('major')} style={{cursor: 'pointer'}}>
                          Major {sortConfig.key === 'major' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                        </th>
                        <th onClick={() => requestSort('program')} style={{cursor: 'pointer'}}>
                          Program {sortConfig.key === 'program' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                        </th>
                        <th onClick={() => requestSort('sem1_2024_2025')} style={{cursor: 'pointer'}}>
                          Sem 1 2024-2025 {sortConfig.key === 'sem1_2024_2025' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                        </th>
                        <th onClick={() => requestSort('sem2_2024_2025')} style={{cursor: 'pointer'}}>
                          Sem 2 2024-2025 {sortConfig.key === 'sem2_2024_2025' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                        </th>
                        <th onClick={() => requestSort('sem1_2025_2026')} style={{cursor: 'pointer'}}>
                          Sem 1 2025-2026 {sortConfig.key === 'sem1_2025_2026' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedPrograms.map((program, index) => (
                        <tr key={index}>
                          <td>{program.major}</td>
                          <td>{program.program}</td>
                          <td>{program.sem1_2024_2025}</td>
                          <td>{program.sem2_2024_2025}</td>
                          <td>{program.sem1_2025_2026}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="shadow-sm mb-3">
            <Card.Body>
              <h6 className="text-center mb-3">Enrollment Summary</h6>
              <div style={{ height: '250px' }}>
                <Doughnut data={programTypeData} options={doughnutOptions} />
              </div>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm">
            <Card.Body>
              <h6 className="text-center mb-3">Legend</h6>
              <div>
                {activeCollege === 'grad' ? (
                  <>
                    <div className="d-flex align-items-center mb-2">
                      <div style={{
                        width: '15px',
                        height: '15px',
                        backgroundColor: 'rgba(153, 102, 255, 0.7)',
                        marginRight: '10px'
                      }}></div>
                      <span>Doctoral Programs</span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <div style={{
                        width: '15px',
                        height: '15px',
                        backgroundColor: 'rgba(75, 192, 192, 0.7)',
                        marginRight: '10px'
                      }}></div>
                      <span>Master's Programs</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="d-flex align-items-center mb-2">
                      <div style={{
                        width: '15px',
                        height: '15px',
                        backgroundColor: 'rgba(54, 162, 235, 0.7)',
                        marginRight: '10px'
                      }}></div>
                      <span>Bachelor Programs</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <div style={{
                        width: '15px',
                        height: '15px',
                        backgroundColor: 'rgba(255, 159, 64, 0.7)',
                        marginRight: '10px'
                      }}></div>
                      <span>Other Programs</span>
                    </div>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EnrollmentDataDetail;