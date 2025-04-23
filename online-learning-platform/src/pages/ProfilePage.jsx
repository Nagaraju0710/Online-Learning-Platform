// ProfilePage.jsx or .tsx

import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// Animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(to right, rgb(44, 68, 92), #d9e2ec);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ProfileCard = styled(motion.div)`
  background: #fff;
  position: fixed;
  border-radius: 40px;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.1);
  padding: 3rem 2.5rem;
  max-width: 480px;
  margin-bottom: 100px;
  width: 100%;
  text-align: center;
  animation: ${fadeIn} 0.6s ease-in-out;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-6px);
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    border-radius: 20px;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
    max-width: 90%;
  }
`;

const Avatar = styled(motion.div)`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  font-size: 2.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  box-shadow: 0 4px 15px rgba(118, 75, 162, 0.4);

  @media (max-width: 480px) {
    width: 70px;
    height: 70px;
    font-size: 2rem;
  }
`;

const UserName = styled(motion.h2)`
  font-size: 24px;
  color: #2c3e50;
  margin-bottom: 8px;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const InfoText = styled(motion.p)`
  font-size: 16px;
  color: #6b7280;
  margin: 4px 0;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const LogoutButton = styled(motion.button)`
  margin-top: 1.5rem;
  padding: 10px 20px;
  background: linear-gradient(to right, #ff416c, #ff4b2b);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(to right, #ff4b2b, #ff416c);
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 8px 16px;
  }
`;

// Utility function to get initials
const getInitials = (name = '') =>
  name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();

const ProfilePage = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <Wrapper>
      <ProfileCard
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Avatar
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          {getInitials(user.name)}
        </Avatar>
        <UserName>{user.name}</UserName>
        <InfoText>
          <strong>Email:</strong> {user.email}
        </InfoText>
        <InfoText>
          <strong>Role:</strong> {user.role}
        </InfoText>
        <LogoutButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
        >
          Logout
        </LogoutButton>
      </ProfileCard>
    </Wrapper>
  );
};

export default ProfilePage;
