import React from 'react';
import styled from 'styled-components';
import { FaUser, FaBook, FaCog, FaPlus } from 'react-icons/fa';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaLaptopCode, FaPaintBrush, FaChartLine, FaGraduationCap } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Container = styled.div`
  background: #f8fafc;
  min-height: 100vh;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
`;

const Header = styled.header`
  background-color: #0f172a;
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 1.8rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
`;

const Card = styled.div`
  background-color: #1e293b;
  color: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  text-align: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  svg {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #facc15;
  }

  h3 {
    margin: 0.5rem 0;
  }
    
`;
const Footer = styled.footer`
  background-color: #0f172a;
  color: #f1f5f9;
  padding: 2rem;
  text-align: center;
 
`;

const SocialLinks = styled.div`
  margin-top: 1rem;

  a {
    color:rgb(169, 174, 180);
    margin: 0 0.5rem;
    font-size: 1.5rem;
    transition: color 0.3s ease;

    &:hover {
      color: #3b82f6;
    }
  }
`;
const BrowseCourses = styled.section`
  background: #1e293b;
  color: white;
  padding: 3rem 2rem;
  text-align: center;
`;

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const CourseCard = styled.div`
  background: #334155;
  padding: 1.2rem;
  border-radius: 12px;
  font-weight: bold;
  color: white;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  &:hover {
    background: #475569;
  }
`;

function Admin() {
  return (
    <div>


      <Container style={{ backgroundColor: "#0f172a" }}>
        <Header>Welcome Admin! 🎓</Header>
        <Grid>
          <Link style={{ textDecoration: "none" }} to="/addcourse"> <Card>
            <FaPlus />
            <h3>Add New Course</h3>
          </Card>
          </Link>

          <Link style={{ textDecoration: "none" }} to="/allcourses"><Card>
            <FaBook />
            <h3>Manage Courses</h3>
          </Card>
          </Link>

          <Link style={{ textDecoration: "none" }} to={"/allusers"}>
            <Card>
              <FaUser />
              <h3 >Manage Students</h3>
            </Card>
          </Link>

          
          <Card>
            <FaCog />
            <h3>Settings</h3>
          </Card>
        </Grid>
      </Container>

      <BrowseCourses>
        <h2>Browse Top Essential Career Courses</h2>
        <CourseGrid>
          <CourseCard><FaPaintBrush /> UI/UX Design</CourseCard>
          <CourseCard><FaLaptopCode /> Web Development</CourseCard>
          <CourseCard><FaChartLine /> Digital Marketing</CourseCard>
          <CourseCard><FaGraduationCap /> Practical Learning</CourseCard>
          <CourseCard><FaLaptopCode /> Browse All</CourseCard>
        </CourseGrid>
      </BrowseCourses>

      <Footer>
        <p>&copy; {new Date().getFullYear()} E-Online. All rights reserved.</p>
        <SocialLinks>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
        </SocialLinks>
      </Footer>
    </div>
  );
}
export default Admin;