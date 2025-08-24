import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginNow = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        email,
        password
      });

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem('currentUser', JSON.stringify(response.data.data));
        toast.loading('Redirecting...');
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card shadow">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Login to manage your expenses</p>
        
        <form>
          <input 
            type="email" 
            placeholder="Email" 
            className="form-control auth-input" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          
          <input 
            type="password" 
            placeholder="Password" 
            className="form-control auth-input" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />

          <button 
            type="button" 
            onClick={loginNow} 
            className="btn btn-primary auth-btn"
          >
            Login
          </button>
        </form>
        
        <p className="auth-link-text">
          Don’t have an account? <Link to="/signup" className="auth-link">Sign up</Link>
        </p>
      </div>
      <Toaster />
    </div>
  );
}

export default Login;
