import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaLinkedin, FaFacebook, FaYoutube, FaInstagram } from 'react-icons/fa';
import { authAPI } from '../utils/api';
import './Login.css';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    firstName: '',
    lastName: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Basic client-side validation
    if (!formData.username.trim()) {
      setError('Please enter your username');
      return;
    }
    
    if (!formData.email.trim()) {
      setError('Please enter your email');
      return;
    }
    
    if (!formData.password.trim()) {
      setError('Please enter your password');
      return;
    }

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    setLoading(true);

    try {
      const response = await authAPI.register(
        formData.username,
        formData.password,
        formData.email,
        formData.firstName,
        formData.lastName
      );
      
      if (response.success) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Background with university image and overlay */}
      <div className="background-wrapper">
        <img src="/university-bg.jpg" alt="Maltepe University" className="university-background" />
        <div className="background-overlay"></div>
        <div className="circuit-pattern"></div>
      </div>

      {/* Header */}
      <header className="login-header">
        <div className="logo-section">
          <img src="/universitelogo_mor%202.png" alt="Maltepe University Logo" className="university-logo" />
          <span className="university-name">MALTEPE UNIVERSITY</span>
        </div>
        <div className="social-icons">
          <a href="#" aria-label="LinkedIn" className="social-icon linkedin"><FaLinkedin /></a>
          <a href="#" aria-label="Facebook" className="social-icon facebook"><FaFacebook /></a>
          <a href="#" aria-label="YouTube" className="social-icon youtube"><FaYoutube /></a>
          <a href="#" aria-label="Instagram" className="social-icon instagram"><FaInstagram /></a>
        </div>
      </header>

      {/* Main Content */}
      <div className="login-content">
        {/* Left Section - Title */}
        <div className="title-section">
          <h1 className="main-title">
            <span className="title-line">AI - Powered</span>
            <span className="title-line">Automatic</span>
            <span className="title-line">Attendance System</span>
          </h1>
          <p className="slogan">Efficient - Accurate - Reliable</p>
        </div>

        {/* Right Section - Register Form */}
        <div className="form-section">
          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <h2 style={{ color: 'white', marginBottom: '20px', textAlign: 'center' }}>Create Account</h2>
            
            <div className="form-group">
              <label htmlFor="username">User Name:</label>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  onInvalid={(e) => {
                    e.preventDefault();
                    setError('Please enter a valid username');
                  }}
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onInvalid={(e) => {
                    e.preventDefault();
                    setError('Please enter a valid email address');
                  }}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onInvalid={(e) => {
                    e.preventDefault();
                    setError('Password must be at least 6 characters long');
                  }}
                  placeholder="Enter your password (min 6 characters)"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onInvalid={(e) => {
                    e.preventDefault();
                    setError('Please confirm your password');
                  }}
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>{error}</div>}
            {success && <div className="success-message" style={{ color: 'green', marginBottom: '10px', fontSize: '14px' }}>{success}</div>}
            
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
              <span className="cursor-icon">🖱️</span>
            </button>

            <div style={{ textAlign: 'center', marginTop: '15px' }}>
              <Link to="/login" style={{ color: '#FFD700', textDecoration: 'none', fontSize: '14px' }}>
                Already have an account? Login here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;

