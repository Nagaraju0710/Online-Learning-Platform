import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  padding: 40px;
  background:rgb(29, 42, 70);
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
   
  color: rgb(151, 236, 219);;
  margin-bottom: 40px;

`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CourseTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #222;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 10px;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 200px;
  border-radius: 10px;
  margin-bottom: 10px;
  border: none;
`;

const Price = styled.p`
  font-weight: bold;
  font-size: 1.2rem;
  color: #1a73e8;
  margin-bottom: 10px;
`;

const StyledLink = styled(Link)`
  color: #1a73e8;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/courses')
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Container>
      <Title >All Courses</Title>
      <Grid>
        {courses.map(course => (
          <Card key={course.id}>
            <CourseTitle>{course.title}</CourseTitle>
            <Iframe
              src={course.videoUrl}
              title={course.title}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></Iframe>
            <Description>{course.description}</Description>
            <Price>Price ₹{course.amount}</Price>
            <StyledLink to={`/courses/${course.id}`}>View Details</StyledLink>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default Courses;
