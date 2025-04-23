import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background: ${({ theme }) => theme.bg};

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const Form = styled.form`
  background-color: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.text};
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
  position:fixed;
  margin-bottom:100px;
  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const Heading = styled.h1`
  margin-bottom: 1.5rem;
  font-size: 1.75rem;
  color: #1e3a8a;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.accentSoft};
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 1rem;
  background-color: ${({ theme }) => theme.accent};
  color: #fff;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.accentHover};
  }
`;

const lightTheme = {
  bg: '#f1f5f9',
  cardBg: '#ffffff',
  text: '#0f172a',
  border: '#cbd5e1',
  inputBg: '#ffffff',
  accent: '#3b82f6',
  accentHover: '#2563eb',
  accentSoft: 'rgba(59, 130, 246, 0.3)',
};

const darkTheme = {
  bg: '#0f172a',
  cardBg: '#1e293b',
  text: '#f1f5f9',
  border: '#475569',
  inputBg: '#334155',
  accent: '#3b82f6',
  accentHover: '#2563eb',
  accentSoft: 'rgba(59, 130, 246, 0.5)',
};

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/users', { ...form, role: 'student' });
      alert('Registration successful');
      navigate('/login');
    } catch (err) {
      alert('Registration failed. Try again.');
    }
  };

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = prefersDark ? darkTheme : lightTheme;

  return (
    <Container theme={theme}>
      <Form onSubmit={handleSubmit} theme={theme}>
        <Heading>Hey... Student Register Here....</Heading>
        <Input
          name="name"
          onChange={handleChange}
          placeholder="Name"
          value={form.name}
          theme={theme}
          required
        />
        <Input
          name="email"
          onChange={handleChange}
          placeholder="Email"
          value={form.email}
          type="email"
          theme={theme}
          required
        />
        <Input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
          value={form.password}
          theme={theme}
          required
        />
        <Button type="submit" theme={theme}>
          Register
        </Button>
        <p style={{ marginTop: '1rem' }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </Form>
    </Container>
  );
};

export default Register;
