import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import successSound from '../sound/success.mp3';

// ✅ Confetti
const launchConfetti = () => {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
  });
};

// ✅ Gradient animation
const bgGradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// ✅ Styled Components
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(-45deg, #ff9a9e, #fad0c4, #fbc2eb, #a1c4fd);
  background-size: 400% 400%;
  animation: ${bgGradient} 15s ease infinite;
`;

const Card = styled(motion.div)`
  background: white;
  padding: 50px 40px;
  border-radius: 20px;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 500px;
  width: 100%;
`;

const Title = styled(motion.h1)`
  font-size: 2.8rem;
  color: #27ae60;
  margin-bottom: 20px;
  font-weight: 700;
`;

const Message = styled(motion.p)`
  font-size: 18px;
  color: #333;
  margin-bottom: 30px;
`;

const Button = styled(motion.button)`
  background: linear-gradient(to right, #007bff, #00c6ff);
  color: white;
  padding: 14px 28px;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 123, 255, 0.3);

  &:hover {
    transform: scale(1.05);
  }
`;

const Emoji = styled(motion.div)`
  font-size: 60px;
  margin-bottom: 20px;
`;

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: 'easeOut' },
  }),
};

const Confirmation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    launchConfetti();

    // 🔊 Play Success Sound
    const audio = new Audio(successSound); // If file is in /public/sounds/
    audio.play().catch((err) => {
      console.log('Sound playback failed:', err);
    });

    // const audio = new Audio(successSound);
  }, []);

  const goToMyCourses = () => {
    navigate('/my-course');
  };

  return (
    <Wrapper>
      <Card initial="hidden" animate="visible">
        <Emoji
          variants={fadeInUp}
          custom={0}
          initial={{ scale: 0 }}
          animate={{ scale: 1.2 }}
          transition={{ type: 'spring', stiffness: 140, damping: 12 }}
        >
          🎉
        </Emoji>

        <Title variants={fadeInUp} custom={0.2}>Payment Successful!</Title>
        <Message variants={fadeInUp} custom={0.4}>
          Thank you for your purchase! Your courses will be available shortly.
        </Message>

        <Button
          onClick={goToMyCourses}
          variants={fadeInUp}
          custom={0.6}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Go to My Courses
        </Button>
      </Card>
    </Wrapper>
  );
};

export default Confirmation;
