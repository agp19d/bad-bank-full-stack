/**
 * @author Alejandro Garcia de Paredes
 * @created July 27, 2023
 * @modified October 25, 2023
 **/

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button, Form, Container, Alert, Card } from 'react-bootstrap';
import axios from 'axios'

function Account() {

  // State variables
  const [amount, setAmount] = useState(0);
  const [transactionType, setTransactionType] = useState('deposit');
  const [error, setError] = useState(null);

  // Context variables
  const { balance, setBalance, username } = useAuth();
  const name = username;

  // Transaction handler
  const handleTransaction = async (e) => {
    e.preventDefault();

    // Validate amount is geater than zero
    if (amount <= 0) {
      setError('Amount must be greater than zero.');
      return;
    }

    let newBalance = balance;

    // Validate withdrawal amount
    if (transactionType === 'withdraw' && amount > balance) {
      setError('Insufficient funds for withdrawal.');
      return;
    }

    // Update balance based on transaction type
    if (transactionType === 'deposit') {
      newBalance += parseFloat(amount);
    } else if (transactionType === 'withdraw') {
      newBalance -= parseFloat(amount);
    }

    try {

      // Sending a POST request to update the user's balance on the backend
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/updateBalance`, {
          name,
          newBalance
      });
      
      // If the balance is returned in the response, update the local state
      if (response.data.balance !== undefined) {

          // Update balance state, clear any previous errors, and reset the amount state to zero
          setBalance(response.data.balance); 
          setError(null);
          setAmount(0);
      }
    } catch (err) {
      // Handle any errors that occur during the API call
        console.error("Failed to update balance:", err);
        setError('Failed to update balance. Please try again.');
    };

    // // Retrieve and update user's information in local storage
    // const userData = JSON.parse(localStorage.getItem(username));
    // userData.balance = newBalance;
    // localStorage.setItem(username, JSON.stringify(userData));

    // // Update state variables
    // setBalance(newBalance);
    // setError(null);
    // setAmount(0);
  };

  return (
    <Container>
      <h1>Account</h1>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Your Balance</Card.Title>
          <Card.Text className="display-4">${balance.toFixed(2)}</Card.Text>
        </Card.Body>
      </Card>
      <Form onSubmit={handleTransaction}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group>
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Transaction Type</Form.Label>
          <Form.Control as="select" onChange={(e) => setTransactionType(e.target.value)}>
            <option value="deposit">Deposit</option>
            <option value="withdraw">Withdraw</option>
          </Form.Control>
        </Form.Group>
        <Button type="submit">{transactionType.charAt(0).toUpperCase() + transactionType.slice(1)}</Button>
      </Form>
    </Container>
  );
}

export default Account;
