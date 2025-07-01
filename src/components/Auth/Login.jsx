import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import './Auth.css';

const Login = ({ show, handleClose, switchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    // Handle login authentication
    console.log('Login attempt:', { email, password });
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="auth-modal">
      <Modal.Header closeButton>
        <Modal.Title>Welcome Back</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mb-3">
            Login
          </Button>
        </Form>

        <div className="text-center">
          <p className="mb-3">
            <a href="#" className="text-decoration-none">Forgot Password?</a>
          </p>
          <p className="mb-0">
            Don't have an account?{' '}
            <a href="#" onClick={switchToSignup} className="text-decoration-none">
              Sign Up
            </a>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Login;