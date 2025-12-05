import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaLock, FaLinkedin, FaFacebook, FaYoutube, FaInstagram } from 'react-icons/fa';
import { authAPI } from '../utils/api';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await authAPI.login(username, password);
      if (response.success) {
        // Store user info in localStorage
        localStorage.setItem('user', JSON.stringify(response.user));
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Invalid username or password');
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

        {/* Right Section - Login Form */}
        <div className="form-section">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">User Name:</label>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
              <span className="cursor-icon">🖱️</span>
            </button>

            <div style={{ textAlign: 'center', marginTop: '15px' }}>
              <Link to="/register" style={{ color: '#FFD700', textDecoration: 'none', fontSize: '14px', display: 'block', marginBottom: '10px' }}>
                Don't have an account? Register here
              </Link>
              <a href="#" className="forgot-password">Forgot my password</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

