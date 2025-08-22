import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Academics from './components/Academics';
import Admission from './components/Admission';
import Contact from './components/Contact';
import OfficeDetails from './components/OfficeDetails';
import OfficesMain from './components/OfficesMain';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/styles/custom.scss';
import InfographicsPage from './components/InfographicsPage';
import BoardPassersDetail from './components/BoardPassersDetail';
import EnrollmentDataDetail from './components/EnrollmentDataDetail';
import GraduationDataDetail from './components/GraduationDataDetail';
import SDGHub from './components/SDGHub';
import Administration from './components/Administration';
import Scholarship from './components/scholarship';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/admission" element={<Admission />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/offices/*" element={<OfficesMain />} />
            <Route path="/infographics" element={<InfographicsPage />} />
            <Route path="/infographics/board-passers" element={<BoardPassersDetail />} />
            <Route path="/infographics/enrollment" element={<EnrollmentDataDetail />} />
            <Route path="/infographics/graduation" element={<GraduationDataDetail />} />
            <Route path="/sdg-hub" element={<SDGHub />} />
            <Route path="/administration" element={<Administration />} />
            <Route path="/scholarship" element={<Scholarship />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;