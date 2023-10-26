/**
 * @author Alejandro Garcia de Paredes
 * @created July 27, 2023
 * @modified October 25, 2023
 **/

import React, { useState } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';  // Ensure axios is imported

function Login() {

  // State for managing form input and errors 
  const [usernameInput, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  // Navigation and Auth context  
  const navigate = useNavigate();
  const { setIsLoggedIn, setUserIcon, setUsername, setBalance } = useAuth();

  // Handle login form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const userCredentials = {
      name: usernameInput,
      password: password,
    };

    // Check credentials against database and perform login logic
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, userCredentials)
      .then((response) => {
        setIsLoggedIn(true);
        setUserIcon(<FontAwesomeIcon icon={faUser} />);
        setUsername(response.data.username); // Assumes the backend sends the username
        setBalance(response.data.balance);   // Assumes the backend sends the balance
        navigate('/account'); // Redirect to account page on successful login
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setError(err.response.data.message || 'Invalid username or password.');
        } else {
          setError('An error occurred during login.');
        }
      });
  };

  return (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
}

export default Login;