// App.js (updated with Hiring, Admin, and Organizations routes)
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
import ApplicationForm from './components/ApplicationForm';
import Hiring from './components/Hiring';
import Background from './components/Background';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/styles/custom.scss';
import InfographicsPage from './components/InfographicsPage';
import BoardPassersDetail from './components/BoardPassersDetail';
import EnrollmentDataDetail from './components/EnrollmentDataDetail';
import GraduationDataDetail from './components/GraduationDataDetail';
import SDGHub from './components/SDGHub';
import SDGDetail from './components/SDGDetail';
import Administration from './components/Administration';
import Scholarship from './components/scholarship';
import Alumni from './components/Alumni';
import KeyOfficials from './components/KeyOfficials';
import EventDetail from './components/EventDetail';
import CampusUpdates from './components/CampusUpdates';
import UpcomingEvents from './components/UpcomingEvents';
import NewsDetail from './components/NewsDetail';
import Admin from './pages/Admin';
import ResearchExtensionPage from './components/ResearchExtensionPage';
import RdesPage from './components/RdesPage';
import Organizations from './components/Organizations'; // <-- NEW import

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Background />
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
            <Route path="/sdg/:id" element={<SDGDetail />} />
            <Route path="/sdg/:sdgId/event/:eventId" element={<EventDetail />} />
            <Route path="/administration" element={<Administration />} />
            <Route path="/scholarship" element={<Scholarship />} />
            <Route path="/alumni" element={<Alumni />} />
            <Route path="/keyofficials" element={<KeyOfficials />} />
            <Route path="/campus-updates" element={<CampusUpdates />} />
            <Route path="/upcoming-events" element={<UpcomingEvents />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/announcement/:id" element={<NewsDetail />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/apply" element={<ApplicationForm />} />
            <Route path="/hiring" element={<Hiring />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/research-extension" element={<ResearchExtensionPage />} />
            <Route path="/rdes" element={<RdesPage />} />
            {/* NEW Organizations route */}
            <Route path="/organizations" element={<Organizations />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;