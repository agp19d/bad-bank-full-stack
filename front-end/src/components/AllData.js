/**
 * @author Alejandro Garcia de Paredes
 * @created July 27, 2023
 * @modified October 25, 2023
 **/

import React, { useState, useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';
import axios from 'axios'

function AllData() {
  
  const [users, setUsers] = useState([]);

  // Fetch all the data into the table
  useEffect(() => {
    // Fetch data when component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getAllUsers`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);  // Empty dependency array ensures this effect runs once when component mounts

  return (
    <Container>
      <h1>All Data in Store</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.balance}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AllData;
