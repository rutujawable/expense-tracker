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
    <div className="auth-container">
      <div className="auth-card shadow">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Start tracking your expenses</p>

        <form>
          <input 
            type="text" 
            placeholder="Full Name" 
            className="form-control auth-input mb-3" 
            value={user.fullname} 
            onChange={(e) => setUser({ ...user, fullname: e.target.value })} 
          />

          <input 
            type="email" 
            placeholder="Email" 
            className="form-control auth-input mb-3" 
            value={user.email} 
            onChange={(e) => setUser({ ...user, email: e.target.value })} 
          />

          <input 
            type="password" 
            placeholder="Password" 
            className="form-control auth-input mb-3" 
            value={user.password} 
            onChange={(e) => setUser({ ...user, password: e.target.value })} 
          />

          {/* Shift Date of Birth to the left using Bootstrap row/col */}
          <div className="mb-3 text-start">
  <label className="form-label">Enter date of birth:</label>
  <input
    type="date"
    className="form-control auth-input"
    value={user.dob}
    onChange={(e) => setUser({ ...user, dob: e.target.value })}
  />
</div>


          <button 
            type="button" 
            onClick={signup} 
            className="btn btn-success auth-btn w-100"
          >
            Sign Up
          </button>
        </form>

        <p className="auth-link-text mt-3">
          Already have an account? <Link to="/login" className="auth-link">Login</Link>
        </p>
      </div>
      <Toaster />
    </div>
  );
}

export default Signup;
