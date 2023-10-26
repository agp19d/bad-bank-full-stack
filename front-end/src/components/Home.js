/**
 * @author Alejandro Garcia de Paredes
 * @created July 27, 2023
 * @modified July 31, 2023
 **/

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import depositPng from './deposit.png';
import withdrawPng from './withdraw.png';
import balancePng from './balance.png';

const styles = {
  cardImage: {
    width: '150px',
    height: '150px',
    margin: 'auto'
    }
}

function Home() {
  return (
    <Container>
      <Card className="text-center mt-4">
        <Card.Body>
          <Card.Title><h1>Welcome to Bad Bank</h1></Card.Title>
          <Card.Text>
            Your trusted partner in personal finance. Join us today and take control of your financial future.
          </Card.Text>
        </Card.Body>
      </Card>

      <Row className="my-4">
        <Col>
          <h2>Our Services</h2>
          <p>
            We offer a wide range of banking services including deposits, withdrawals, and more. We're committed
            to providing you with the tools you need to manage your money.
          </p>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Card className="h-100">
            <Card.Img variant="top" style={styles.cardImage} src={depositPng} title="deposit"/>
            <Card.Body>
              <Card.Title><h3>Deposits</h3></Card.Title>
              <Card.Text>Conveniently deposit funds anytime, anywhere.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
          <Card.Img variant="top" style={styles.cardImage} src={withdrawPng} title="withdraw"/>
            <Card.Body>
              <Card.Title><h3>Withdrawals</h3></Card.Title>
              <Card.Text>Access your money when you need it, with multiple withdrawal options.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
          <Card.Img variant="top" style={styles.cardImage} src={balancePng} title="balance"/>
            <Card.Body>
              <Card.Title><h3>Balance Tracking</h3></Card.Title>
              <Card.Text>Keep track of your financial progress with easy balance monitoring.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <footer className="text-center mt-4">
        <p>&copy; {new Date().getFullYear()} Bad Bank. All rights reserved.</p>
      </footer>
    </Container>
  );
}

export default Home;
