import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Themes
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

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
 

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const Form = styled.form`
  background-color: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.text};
  padding: 2.5rem 2rem;
  border-radius: 24px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
   position: fixed;
  max-width: 400px;
  margin-bottom:120px;
  animation: ${fadeIn} 0.6s ease-in-out;

  @media (max-width: 480px) {
    padding: 2rem 1.2rem;
    border-radius: 18px;
  }
`;

const Heading = styled.h1`
  margin-bottom: 1.8rem;
  font-size: 1.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.accent};
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  margin: 12px 0;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  transition: border 0.3s, box-shadow 0.3s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.accentSoft};
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 1.2rem;
  background-color: ${({ theme }) => theme.accent};
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.accentHover};
  }
`;

const BottomText = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};

  a {
    color: ${({ theme }) => theme.accent};
    font-weight: 500;
    margin-left: 4px;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Login = () => {
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
        navigate('/studenthome');
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      alert('Login failed. Try again.');
    }
  };

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = prefersDark ? darkTheme : lightTheme;

  return (
    <Container  theme={theme}>
      <Form onSubmit={handleSubmit} theme={theme}>
        <Heading theme={theme}>Hey Student.. Login Here..</Heading>
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          theme={theme}
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          theme={theme}
          required
        />
        <Button type="submit" theme={theme}>
          Login
        </Button>
        <BottomText theme={theme}>
          Not a Member? <Link to="/register">Register..</Link>
        </BottomText>
      </Form>
    </Container>
  );
};

export default Login;
