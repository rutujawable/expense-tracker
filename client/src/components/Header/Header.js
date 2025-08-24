import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Header.css";

function Header({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-primary px-3 shadow-sm">
      <Link to="/" className="navbar-brand d-flex align-items-center">
        <i className="bi bi-cash-stack me-2 fs-3"></i>
        <span className="fw-bold">Expense Tracker</span>
      </Link>

      {/* Hamburger button for small screens */}
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleMenu}
        aria-controls="navbarNav"
        aria-expanded={menuOpen}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`} id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/add-transaction"
              className={`nav-link ${location.pathname === "/add-transaction" ? "active" : ""}`}
              onClick={closeMenu}
            >
              Add Transaction
            </Link>
          </li>
          {user && (
            <li className="nav-item d-lg-none">
              <button
                className="btn btn-danger w-100 mt-2"
                onClick={() => {
                  onLogout();
                  closeMenu();
                }}
              >
                Logout
              </button>
            </li>
          )}
        </ul>

        {user && (
          <div className="d-none d-lg-flex align-items-center ms-3">
            <span className="me-3 text-light">
             
            </span>
            <button className="btn btn-danger" onClick={onLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
