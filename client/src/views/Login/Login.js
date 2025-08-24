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
    <div className="auth-container d-flex align-items-center justify-content-center my-5">
      <div className="card shadow-lg p-4 animate-fade bg-white rounded-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-3 text-primary fw-bold">
          Welcome Back <span className="text-gradient">User</span>
        </h3>
        <p className="auth-subtitle text-center mb-4">Login to manage your expenses</p>

        <form className="d-flex flex-column gap-3">
          <input 
            type="email" 
            placeholder="Email" 
            className="form-control modern-input" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          
          <input 
            type="password" 
            placeholder="Password" 
            className="form-control modern-input" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />

          <button 
            type="button" 
            onClick={loginNow} 
            className="btn btn-primary modern-btn w-100"
          >
            Login
          </button>
        </form>
        
        <p className="auth-link-text text-center mt-3">
          Don’t have an account? <Link to="/signup" className="auth-link">Sign up</Link>
        </p>
      </div>
      <Toaster />
    </div>
  );
}

export default Login;
