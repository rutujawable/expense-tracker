import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-left">
        <h2>💸 Expense Tracker</h2>
      </div>
      <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link
          to="/"
          className={location.pathname === '/' ? 'active' : ''}
          onClick={closeMenu}
        >
          Home
        </Link>
        <Link
          to="/add-transaction"
          className={location.pathname === '/add-transaction' ? 'active' : ''}
          onClick={closeMenu}
        >
          Add Transaction
        </Link>
      </nav>
      <div className="header-right">
        {/* <span className="greeting">Hello, {user?.fullname} 👋</span> */}
        <span className="logout" onClick={onLogout}>
          Logout
        </span>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </div>
    </header>
  );
}

export default Header;
