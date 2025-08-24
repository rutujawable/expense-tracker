import React, { useState } from 'react';
import './../Login/Login.css';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

function Signup() {
  const [user, setUser] = useState({
    fullname: '',
    email: '',
    password: '',
    dob: ''
  });

  const signup = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, user);

      if (response.data.success) {
        toast.success('Signup successful');
        setUser({ fullname: '', email: '', password: '', dob: '' });
        setTimeout(() => {
          window.location.href = '/login';
        }, 3000);
      } else {
        toast.error('Signup failed');
      }
    } catch (error) {
      toast.error('Error during signup');
    }
  };

  return (
    <div className="auth-container d-flex align-items-center justify-content-center my-5">
      <div className="card shadow-lg p-4 animate-fade bg-white rounded-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-3 text-primary fw-bold">
          Create <span className="text-gradient">Account</span>
        </h3>
        <p className="auth-subtitle text-center mb-4">Start tracking your expenses</p>

        <form className="d-flex flex-column gap-3">
          <input 
            type="text" 
            placeholder="Full Name" 
            className="form-control modern-input" 
            value={user.fullname} 
            onChange={(e) => setUser({ ...user, fullname: e.target.value })} 
          />

          <input 
            type="email" 
            placeholder="Email" 
            className="form-control modern-input" 
            value={user.email} 
            onChange={(e) => setUser({ ...user, email: e.target.value })} 
          />

          <input 
            type="password" 
            placeholder="Password" 
            className="form-control modern-input" 
            value={user.password} 
            onChange={(e) => setUser({ ...user, password: e.target.value })} 
          />

          <label className='form-label text-secondary'>Enter date of birth:</label>
          <input 
            type="date" 
            className="form-control modern-input" 
            value={user.dob} 
            onChange={(e) => setUser({ ...user, dob: e.target.value })} 
          />

          <button 
            type="button" 
            onClick={signup} 
            className="btn btn-success modern-btn w-100"
          >
            Sign Up
          </button>
        </form>

        <p className="auth-link-text text-center mt-3">
          Already have an account? <Link to="/login" className="auth-link">Login</Link>
        </p>
      </div>
      <Toaster />
    </div>
  );
}

export default Signup;
