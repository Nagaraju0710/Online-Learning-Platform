// HomePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaLaptopCode, FaPaintBrush, FaChartLine, FaGraduationCap } from 'react-icons/fa';
import img1 from "../Images/E-lear.jpg"

const HeroSection = styled.section`
  background: #0f172a;
  color: white;
  padding: 4rem 2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  text-align: left;
`;

const HeroContent = styled.div`
  max-width: 500px;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #fff;

  span {
    color: #8b5cf6;
  }
`;

const SubText = styled.p`
  color: #94a3b8;
  margin: 1rem 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const CTAButton = styled(Link)`
  padding: 0.8rem 1.8rem;
  background-color: #f59e0b;
  border-radius: 8px;
  color: white;
  font-weight: bold;

  text-decoration: none;

  &:hover {
    background-color: #d97706;
  }
`;

const HeroImage = styled.img`
  max-width: 400px;
  border-radius: 20px;
  margin-top: 2rem;

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const Stats = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;
  font-size: 1.1rem;
  color: #e2e8f0;
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

const Footer = styled.footer`
  background-color: #0f172a;
  color: #f1f5f9;
  padding: 2rem;
  text-align: center;
`;

const SocialLinks = styled.div`
  margin-top: 1rem;

  a {
    color: #f1f5f9;
    margin: 0 0.5rem;
    font-size: 1.5rem;
    transition: color 0.3s ease;

    &:hover {
      color: #3b82f6;
    }
  }
`;

function HomePage() {
  return (
    <div>
      <HeroSection >
        <HeroContent>
          <Heading>Investing in Knowledge and <span>Your Future</span></Heading>
          <SubText>
            Our e-learning programs are designed to deliver high-quality, interactive learning experiences tailored to your career growth.
          </SubText>
          <ButtonGroup>
            <CTAButton to="/adminlogin">Admin Login</CTAButton>
            <CTAButton to="/login">Student Login</CTAButton>
          </ButtonGroup>
          <Stats>
            <div><strong>50+</strong> Courses</div>
            <div><strong>1M+</strong> Students</div>
          </Stats>
        </HeroContent>

        <HeroImage
          src={img1}
          alt="Student learning"
        />
      </HeroSection>

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

export default HomePage;
