import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Nav, Tabs, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { ChevronLeft, Download, Filter, TrendingUp, Users, Award, BookOpen } from 'react-feather';

const InfographicsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data for charts
  const boardPassersData = [
    { year: '2015', passers: 45, target: 40 },
    { year: '2016', passers: 52, target: 48 },
    { year: '2017', passers: 60, target: 55 },
    { year: '2018', passers: 68, target: 65 },
    { year: '2019', passers: 75, target: 70 },
    { year: '2020', passers: 82, target: 75 },
    { year: '2021', passers: 90, target: 85 },
    { year: '2022', passers: 95, target: 90 },
    { year: '2023', passers: 102, target: 100 },
    { year: '2024', passers: 110, target: 105 },
  ];

  const enrollmentData = [
    { year: '2015', students: 1200, growth: 8 },
    { year: '2016', students: 1350, growth: 12 },
    { year: '2017', students: 1420, growth: 5 },
    { year: '2018', students: 1550, growth: 9 },
    { year: '2019', students: 1620, growth: 5 },
    { year: '2020', students: 1580, growth: -2 },
    { year: '2021', students: 1650, growth: 4 },
    { year: '2022', students: 1720, growth: 4 },
    { year: '2023', students: 1850, growth: 8 },
    { year: '2024', students: 1920, growth: 4 },
  ];

  const graduationData = [
    { year: '2015', graduates: 210, rate: 85 },
    { year: '2016', graduates: 225, rate: 86 },
    { year: '2017', graduates: 240, rate: 87 },
    { year: '2018', graduates: 255, rate: 88 },
    { year: '2019', graduates: 270, rate: 89 },
    { year: '2020', graduates: 285, rate: 90 },
    { year: '2021', graduates: 300, rate: 91 },
    { year: '2022', graduates: 315, rate: 92 },
    { year: '2023', graduates: 330, rate: 93 },
    { year: '2024', graduates: 350, rate: 94 },
  ];

  const programData = [
    { name: 'Engineering', value: 35, color: '#02570B' },
    { name: 'Business', value: 25, color: '#FFD700' },
    { name: 'Education', value: 20, color: '#6f42c1' },
    { name: 'Arts & Sciences', value: 15, color: '#17a2b8' },
    { name: 'Nursing', value: 5, color: '#dc3545' },
  ];

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip p-3" style={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '5px' }}>
          <p className="label mb-1">{`Year: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
              {entry.dataKey === 'growth' && '%'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Container fluid className="px-4 py-4 infographics-container">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button variant="outline-secondary" onClick={() => navigate(-1)} className="d-flex align-items-center">
          <ChevronLeft size={18} className="me-1" /> Back to Home
        </Button>
        <div className="d-flex">
          <Button variant="outline-primary" className="me-2 d-flex align-items-center">
            <Download size={16} className="me-1" /> Export Data
          </Button>
          <Button variant="outline-secondary" className="d-flex align-items-center">
            <Filter size={16} className="me-1" /> Filter
          </Button>
        </div>
      </div>

      <h1 className="text-center mb-4 text-primary">University Performance Metrics</h1>
      <p className="text-center text-muted mb-5">Comprehensive overview of academic achievements and institutional growth</p>
      
      {/* Tabs Navigation */}
      <Tabs
        id="infographics-tabs"
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4 justify-content-center"
        fill
      >
        <Tab eventKey="overview" title="Overview">
          {/* Key Metrics Summary */}
          <Row className="mb-5">
            <Col md={4} className="mb-4">
              <Card className="text-center border-0 shadow-sm metric-card">
                <Card.Body className="py-4">
                  <div className="metric-icon bg-primary">
                    <TrendingUp size={24} />
                  </div>
                  <h3 className="mt-3 mb-0">{boardPassersData[boardPassersData.length - 1].passers}</h3>
                  <p className="text-muted mb-1">Board Passers (2024)</p>
                  <p className="text-success mb-0">
                    <TrendingUp size={14} className="me-1" />
                    +12% from last year
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="text-center border-0 shadow-sm metric-card">
                <Card.Body className="py-4">
                  <div className="metric-icon bg-success">
                    <Users size={24} />
                  </div>
                  <h3 className="mt-3 mb-0">{enrollmentData[enrollmentData.length - 1].students.toLocaleString()}</h3>
                  <p className="text-muted mb-1">Total Enrollment (2024)</p>
                  <p className="text-success mb-0">
                    <TrendingUp size={14} className="me-1" />
                    +4% from last year
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="text-center border-0 shadow-sm metric-card">
                <Card.Body className="py-4">
                  <div className="metric-icon bg-info">
                    <BookOpen size={24} />
                  </div>
                  <h3 className="mt-3 mb-0">{graduationData[graduationData.length - 1].graduates}</h3>
                  <p className="text-muted mb-1">Graduates (2024)</p>
                  <p className="text-success mb-0">
                    <TrendingUp size={14} className="me-1" />
                    +6% from last year
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Charts Grid */}
          <Row className="g-4">
            {/* Board Passers Card */}
            <Col lg={6}>
              <Card className="h-100 shadow-sm chart-card">
                <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
                  <Card.Title className="mb-0">Board Passers Performance</Card.Title>
                  <Button variant="light" size="sm" onClick={() => navigate('/infographics/board-passers')}>
                    View Details
                  </Button>
                </Card.Header>
                <Card.Body>
                  <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={boardPassersData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="passers" fill="#02570B" fillOpacity={0.2} stroke="#02570B" strokeWidth={2} name="Actual Passers" />
                        <Area type="monotone" dataKey="target" fill="#FFD700" fillOpacity={0.2} stroke="#FFD700" strokeWidth={2} name="Target" strokeDasharray="4 4" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Enrollment Data Card */}
            <Col lg={6}>
              <Card className="h-100 shadow-sm chart-card">
                <Card.Header className="bg-success text-white d-flex justify-content-between align-items-center">
                  <Card.Title className="mb-0">Enrollment Trends</Card.Title>
                  <Button variant="light" size="sm" onClick={() => navigate('/infographics/enrollment')}>
                    View Details
                  </Button>
                </Card.Header>
                <Card.Body>
                  <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={enrollmentData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Line type="monotone" dataKey="students" stroke="#17a2b8" strokeWidth={2} name="Total Students" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Graduation Data Card */}
            <Col lg={6}>
              <Card className="h-100 shadow-sm chart-card">
                <Card.Header className="bg-info text-white d-flex justify-content-between align-items-center">
                  <Card.Title className="mb-0">Graduation Rates</Card.Title>
                  <Button variant="light" size="sm" onClick={() => navigate('/infographics/graduation')}>
                    View Details
                  </Button>
                </Card.Header>
                <Card.Body>
                  <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={graduationData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                        <XAxis dataKey="year" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" domain={[80, 100]} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar yAxisId="left" dataKey="graduates" fill="#6f42c1" name="Number of Graduates" />
                        <Line yAxisId="right" type="monotone" dataKey="rate" stroke="#ff7300" strokeWidth={2} name="Graduation Rate (%)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Program Distribution Card */}
            <Col lg={6}>
              <Card className="h-100 shadow-sm chart-card">
                <Card.Header className="bg-purple text-white">
                  <Card.Title className="mb-0">Program Distribution</Card.Title>
                </Card.Header>
                <Card.Body>
                  <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={programData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        >
                          {programData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>
        
        <Tab eventKey="detailed" title="Detailed Reports">
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 shadow-sm">
                <Card.Header className="bg-primary text-white">
                  <Card.Title className="text-center">Board Passers</Card.Title>
                </Card.Header>
                <Card.Body>
                  <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={boardPassersData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="passers" fill="#02570B" name="Number of Passers" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card.Body>
                <Card.Footer className="text-center">
                  <Button variant="primary" onClick={() => navigate('/infographics/board-passers')}>
                    View Details
                  </Button>
                </Card.Footer>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 shadow-sm">
                <Card.Header className="bg-success text-white">
                  <Card.Title className="text-center">Enrollment Data</Card.Title>
                </Card.Header>
                <Card.Body>
                  <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={enrollmentData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="students" fill="#17a2b8" name="Number of Students" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card.Body>
                <Card.Footer className="text-center">
                  <Button variant="success" onClick={() => navigate('/infographics/enrollment')}>
                    View Details
                  </Button>
                </Card.Footer>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 shadow-sm">
                <Card.Header className="bg-info text-white">
                  <Card.Title className="text-center">Graduation Data</Card.Title>
                </Card.Header>
                <Card.Body>
                  <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={graduationData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="graduates" fill="#6f42c1" name="Number of Graduates" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card.Body>
                <Card.Footer className="text-center">
                  <Button variant="info" onClick={() => navigate('/infographics/graduation')}>
                    View Details
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Tab>
      </Tabs>

      <style>{`
        .metric-card {
          transition: transform 0.2s;
        }
        .metric-card:hover {
          transform: translateY(-5px);
        }
        .metric-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          color: white;
        }
        .chart-card {
          border-radius: 10px;
          overflow: hidden;
        }
        .chart-card .card-header {
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }
        .bg-purple {
          background-color: #6f42c1 !important;
        }
        .infographics-container {
          background-color: #f8f9fa;
          min-height: 100vh;
        }
      `}</style>
    </Container>
  );
};

export default InfographicsPage;