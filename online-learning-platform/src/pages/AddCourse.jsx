import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Motion animations
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 }
  })
};

// Styled components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #1c273b, #838486);
`;

const Card = styled(motion.div)`
  background: #ffffff;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }

  @media (max-width: 480px) {
    padding: 25px 15px;
  }
`;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 25px;
  color: #1e3a8a;
  font-weight: 800;
  font-size: 28px;

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

const Form = styled.form`
  display: grid;
  gap: 20px;
`;

const sharedStyles = `
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid #cbd5e1;
  font-size: 15px;
  transition: 0.3s ease-in-out;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    outline: none;
  }
`;

const Input = styled(motion.input)`
  ${sharedStyles}
`;

const TextArea = styled(motion.textarea)`
  ${sharedStyles}
  resize: vertical;
`;

const Button = styled(motion.button)`
  background-color: #2563eb;
  color: white;
  padding: 14px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background-color: #1d4ed8;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

function AddCourse() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    videoUrl: '',
    amount: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.videoUrl || !form.amount) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await axios.post('http://localhost:8080/courses', form);
      alert("Course added successfully");
      setForm({ title: '', description: '', videoUrl: '', amount: '' });
    } catch (error) {
      console.error("Error adding course:", error);
      alert("Something went wrong");
    }
  };

  return (
    <Container>
      <Card variants={cardVariants} initial="hidden" animate="visible">
        <Heading>Add New Course</Heading>
        <Form onSubmit={handleSubmit}>
          <Input
            custom={0}
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            name="title"
            placeholder="Course Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <TextArea
            custom={1}
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            name="description"
            placeholder="Course Description"
            rows="4"
            value={form.description}
            onChange={handleChange}
            required
          />
          <Input
            custom={2}
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            name="videoUrl"
            placeholder="Video URL"
            value={form.videoUrl}
            onChange={handleChange}
            required
          />
          <Input
            custom={3}
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            name="amount"
            placeholder="Course Price (in ₹)"
            type="number"
            value={form.amount}
            onChange={handleChange}
            required
          />
          <Button
            custom={4}
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            type="submit"
          >
            Add Course
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default AddCourse;
