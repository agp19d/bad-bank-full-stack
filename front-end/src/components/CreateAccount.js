/**
 * @author Alejandro Garcia de Paredes
 * @created July 27, 2023
 * @modified October 25, 2023
 **/

import React, { useState } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const REACT_APP_BACKEND_URL="https://full-stack-banking-api-b10d38f030b4.herokuapp.com";

function CreateAccount() {

  // State variables for form fields and error handling
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // Navigation hook for redirecting
  const navigate = useNavigate();

  // Handle account creation submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Password matching validation
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Create user object
    const user = {
      name: username,
      email: email,
      password: password,
      balance: 0,
    };

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        'Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 number, and 1 special character.'
      );
      return;
    };

    // Store user in mongoDB
    axios
    .post(`${REACT_APP_BACKEND_URL}/api/register`, user)
    .then((response) => {
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    })
    .catch((error) => {
      setError(error.response ? error.response.data : "Error creating account");
    });


    // Set success message
    setSuccess('Account created successfully! Redirecting to login...');

    // Redirect to login page
    setTimeout(() => {
      navigate('/login');
    }, 2000);

  };

  return (
    <Container>
      <h1>Create Account</h1>
      <Form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit">Create Account</Button>
      </Form>
    </Container>
  );
}

export default CreateAccount;
