import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaSmile, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaLaptopCode, FaPaintBrush, FaChartLine, FaGraduationCap, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import ReactPlayer from 'react-player';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Wrapper = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(to right, #e0f7fa, #f1f8e9);
`;

const Hero = styled.section`
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  color: white;
  padding: 6rem 2rem 4rem;
  text-align: center;
  animation: ${fadeIn} 1s ease-in-out;

  h1 {
    font-size: 3.5rem;
    margin-top: 0.5rem;
  }

  p {
    font-size: 1.3rem;
    margin-bottom: 2.5rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  button {
    padding: 1rem 2rem;
    font-size: 1.1rem;
    background: #ffd166;
    color: black;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
      background: #ffe066;
    }
  }
`;

const Section = styled.section`
  padding: 4rem 2rem;
  text-align: center;
`;

const About = styled(Section)`
  background-color: #ffffff;
  max-width: 1000px;
  margin: auto;
  border-radius: 20px;
  padding: 3rem 2rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  margin-top: 3rem;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #1e293b;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.8;
    color: #475569;
  }
`;

const BrowseCourses = styled(Section)`
  background: #1e3a8a;
  color: white;

  h2 {
    font-size: 2.2rem;
  }
`;

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const CourseCard = styled.div`
  background: #2563eb;
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
    background: #1e40af;
  }
`;

const Testimonials = styled(Section)`
  background-color: #f0f4f8;
`;

const TestimonialCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  margin-bottom: 1.5rem;
`;

const VideoSection = styled(Section)`
  background: #fef3c7;
`;

const MapSection = styled(Section)`
  background-color: #1e293b;
  color: white;

  h2 {
    font-size: 2.2rem;
    margin-bottom: 1rem;
  }

  .leaflet-container {
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    border: 3px solid #0ea5e9;
  }
`;

const Contact = styled(Section)`
  background: #e0f2fe;
`;

const ContactDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 1.1rem;
  margin: 0.5rem 0;
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
    color: #cbd5e1;
    margin: 0 0.5rem;
    font-size: 1.5rem;
    transition: color 0.3s ease;

    &:hover {
      color: #3b82f6;
    }
  }
`;

const StudentHome = () => {
  return (
    <Wrapper>
      <Hero>
        <h1>Welcome to E-Learn <FaSmile /></h1>
        <p>Your gateway to quality online education and career transformation.</p>
        <button>Get Started Now</button>
      </Hero>

      <About>
        <h2>About Us</h2>
        <p>
          E-Learn is a complete online learning hub offering a variety of high-quality courses crafted by top-tier professionals. We believe in making education accessible to everyone, helping students and professionals build future-ready skills and thrive in their careers.
        </p>
      </About>

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

      <Testimonials>
        <h2>What Our Learners Say</h2>
        <TestimonialCard>
          <p>"E-Learn has transformed my skills and helped me land my dream job. Excellent platform!"</p>
          <strong>- Jane Doe</strong>
        </TestimonialCard>
        <TestimonialCard>
          <p>"The courses are well structured and the mentors are very supportive. Highly recommended."</p>
          <strong>- Rajiv Mehta</strong>
        </TestimonialCard>
        <TestimonialCard>
          <p>"Affordable, accessible, and engaging. E-Learn helped me switch careers with confidence."</p>
          <strong>- Aisha Khan</strong>
        </TestimonialCard>
      </Testimonials>

      <VideoSection>
        <h2>Learn More About Us</h2>
        <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' controls width="80%" style={{ margin: 'auto' }} />
      </VideoSection>

      <MapSection>
        <h2>Our Global Reach</h2>
        <MapContainer center={[20.5937, 78.9629]} zoom={4} style={{ height: '300px', width: '80%', margin: 'auto' }}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <Marker position={[20.5937, 78.9629]}>
            <Popup>
              E-Learn Headquarters
            </Popup>
          </Marker>
        </MapContainer>
      </MapSection>

      <Contact>
        <h2>Contact Us</h2>
        <ContactDetail><FaMapMarkerAlt /> 123 Learning Lane, Hyderabad, India</ContactDetail>
        <ContactDetail><FaPhone /> +91 98765 43210</ContactDetail>
        <ContactDetail><FaEnvelope /> support@e-learn.com</ContactDetail>
      </Contact>

      <Footer>
        <p>&copy; {new Date().getFullYear()} E-Learn. All rights reserved.</p>
        <SocialLinks>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
        </SocialLinks>
      </Footer>
    </Wrapper>
  );
};

export default StudentHome;
