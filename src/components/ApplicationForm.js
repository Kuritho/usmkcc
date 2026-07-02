// components/ApplicationForm.js (updated with hiring button)
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    program: '',
    resume: null,
    pds: null,
    transcripts: null,
    coverLetter: null,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume' || name === 'pds' || name === 'transcripts' || name === 'coverLetter') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would typically handle the form submission
    // This could involve sending the data to your backend server
    // which would then email it to HR
    
    alert('Application submitted! In a real application, this would be sent to HR.');
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      program: '',
      resume: null,
      pds: null,
      transcripts: null,
      coverLetter: null,
      message: ''
    });
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Application Form</li>
            </ol>
          </nav>
          
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>Admission Application</h1>
            <Link to="/hiring" className="btn btn-outline-success">
              View Job Openings
            </Link>
          </div>
          
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="h4 mb-0">Apply for Admission</h2>
            </div>
            <div className="card-body p-4">
              <p className="lead">Please fill out the form below to apply for admission. All fields are required unless indicated otherwise.</p>
              
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="program" className="form-label">Program of Interest</label>
                  <select
                    className="form-select"
                    id="program"
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a program</option>
                    <option value="computer-science">Computer Science</option>
                    <option value="business">Business Administration</option>
                    <option value="engineering">Engineering</option>
                    <option value="nursing">Nursing</option>
                    <option value="education">Education</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="resume" className="form-label">Resume/CV (PDF only)</label>
                  <input
                    type="file"
                    className="form-control"
                    id="resume"
                    name="resume"
                    onChange={handleChange}
                    accept=".pdf"
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="pds" className="form-label">Personal Data Sheet (PDS)</label>
                  <input
                    type="file"
                    className="form-control"
                    id="pds"
                    name="pds"
                    onChange={handleChange}
                    accept=".pdf"
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="transcripts" className="form-label">Academic Transcripts</label>
                  <input
                    type="file"
                    className="form-control"
                    id="transcripts"
                    name="transcripts"
                    onChange={handleChange}
                    accept=".pdf"
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="coverLetter" className="form-label">Cover Letter (Optional)</label>
                  <input
                    type="file"
                    className="form-control"
                    id="coverLetter"
                    name="coverLetter"
                    onChange={handleChange}
                    accept=".pdf"
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Additional Information</label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="consent"
                    required
                  />
                  <label className="form-check-label" htmlFor="consent">
                    I consent to the processing of my personal data for admission purposes.
                  </label>
                </div>
                
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">Submit Application</button>
                </div>
              </form>
              
              <div className="mt-4 p-3 bg-light rounded">
                <h3 className="h5">Application Process</h3>
                <p>After submitting your application:</p>
                <ol>
                  <li>You will receive a confirmation email within 24 hours</li>
                  <li>Our admissions team will review your application</li>
                  <li>If qualified, you'll be invited for an interview</li>
                  <li>Final decision will be communicated within 2-3 weeks</li>
                </ol>
                <p className="mb-0">For questions, contact our admissions office at <a href="mailto:admissions@university.edu">admissions@university.edu</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;