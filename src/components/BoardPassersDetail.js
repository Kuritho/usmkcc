import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BoardPassersDetail = () => {
  const navigate = useNavigate();

  const data = [
    { year: '2015', passers: 45 },
    { year: '2016', passers: 52 },
    // ... rest of the data
  ];

  return (
    <Container className="py-5">
      <Button variant="outline-secondary" onClick={() => navigate('/infographics')} className="mb-4">
        Back to Infographics
      </Button>
      
      <h1 className="text-center mb-5 text-usmkc-green">Board Passers Statistics</h1>
      
      <div style={{ height: '500px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="passers" fill="#FFD700" name="Number of Passers" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4">
        <h3>Analysis</h3>
        <p>
          The data shows a consistent increase in board passers from 2015 to 2024, 
          demonstrating the university's improving performance in preparing students 
          for professional licensure examinations.
        </p>
      </div>
    </Container>
  );
};

export default BoardPassersDetail;