import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const PageWrapper = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: auto;
  font-family: 'Poppins', sans-serif;
`;

const Title = styled.h2`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
  color: rgb(200, 212, 223);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 25px;
`;

const CourseCard = styled.div`
  background: #fff;
  padding: 24px;
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 14px 36px rgba(0, 0, 0, 0.12);
  }
`;

const CourseTitle = styled.h3`
  font-size: 22px;
  color: #2c3e50;
  margin-bottom: 10px;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 200px;
  border-radius: 14px;
  border: none;
  margin-top: 10px;
`;

const NoteLink = styled.a`
  display: inline-block;
  margin-top: 15px;
  color: #3498db;
  text-decoration: underline;
  font-weight: 500;

  &:hover {
    color: #2c80b4;
  }
`;

const TestButton = styled(Link)`
  display: inline-block;
  margin-top: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: white;
`;

const MyCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    axios.get(`http://localhost:8080/users/${user.id}`)
      .then(res => setCourses(res.data.purchased || []));
  }, []);

  return (
    <div style={{ backgroundColor: 'rgb(29, 42, 70)', minHeight: '100vh' }}>
      <PageWrapper>
        <Title>📚 My Enrolled Courses</Title>
        {courses.length === 0 ? (
          <EmptyMessage>No courses enrolled yet.</EmptyMessage>
        ) : (
          <Grid>
            {courses.map((course, index) => (
              <CourseCard key={index}>
                <CourseTitle>{course.title}</CourseTitle>
                <StyledIframe
                  src={course.videoUrl}
                  title={course.title}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <NoteLink href={course.notes} download>
                  📥 Download Notes
                </NoteLink>
                <br />
                <TestButton to={`/test/${course.id}`}>📝 Take Test</TestButton>
              </CourseCard>
            ))}
          </Grid>
        )}
      </PageWrapper>
    </div>
  );
};

export default MyCourses;
