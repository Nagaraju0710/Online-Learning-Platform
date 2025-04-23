// AdminLogin.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #e0f2fe, #f8fafc);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  position:fixed;
  margin-bottom:90px;
  text-align: center;
`;

const Heading = styled.h1`
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: #1e3a8a;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-size: 1rem;
  transition: 0.3s;

  &:focus {
    border-color: #2563eb;
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #2563eb;
  color: #ffffff;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1.2rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1e40af;
  }
`;

const AdminLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `http://localhost:8080/users?email=${form.email}&password=${form.password}`
      );
      if (res.data.length > 0) {
        localStorage.setItem('user', JSON.stringify(res.data[0]));
        navigate('/admin');
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      alert('Login failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Heading>Hey Admin.. Login Here..</Heading>
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <Button type="submit">Login</Button>
        <p>Not a Member? <Link to="/adminregister">Register..</Link></p>
      </Form>
    </Container>
  );
};

export default AdminLogin;
