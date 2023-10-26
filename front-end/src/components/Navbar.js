/**
 * @author Alejandro Garcia de Paredes
 * @created July 27, 2023
 * @modified July 31, 2023
 **/

import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navigation() {

  // Extract relevant authentication properties and navigation function
  const { isLoggedIn, userIcon, username, logout } = useAuth();
  const navigate = useNavigate();

  // Handle logout by invoking the logout method and redirecting to the home page
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="light" expand="lg">
      {!isLoggedIn && <Navbar.Brand as={Link} to="/">Bad Bank</Navbar.Brand>}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">

          {/* Display links based on the login status */}
          {!isLoggedIn && (
            <>
              <Nav.Link as={Link} to="/create-account">Create Account</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/all-data">All Data</Nav.Link>
            </>
          )}
          {isLoggedIn && (
            <>
              <Nav.Link as={Link} to="/account">Account</Nav.Link>
            </>
          )}
        </Nav>

        {/* Display user information and logout button if logged in */}
        {isLoggedIn && 
          <div className="user-info">
            <div className="user-icon">{userIcon}</div>
            <div className="username">{username}</div>
            <Button variant="light" onClick={handleLogout}>Logout</Button>
          </div>
        }
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
