import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const UserWrapper = styled.div`
  padding: 3rem 2rem;
  font-family: 'Segoe UI', sans-serif;
  background-color: #f8fafc;
  min-height: 100vh;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #1e3a8a;
`;

const UserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const UserCard = styled.div`
  background: #e0f2fe;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.05);
  transition: 0.3s ease;

  &:hover {
    background: #bae6fd;
  }

  h3 {
    margin-bottom: 0.5rem;
    color: #0c4a6e;
  }

  p {
    color: #334155;
  }
`;

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <UserWrapper>
      <Title>All Registered Users</Title>
      <UserGrid>
        {users.map((user) => (
          <UserCard key={user.id}>
            <p><strong>Student Name:</strong>{user.name || user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
          </UserCard>
        ))}
      </UserGrid>
    </UserWrapper>
  );
};

export default AllUsers;
