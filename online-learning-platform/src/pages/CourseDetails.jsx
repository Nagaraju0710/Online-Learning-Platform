import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import ReactStars from "react-rating-stars-component";


const Container = styled.div`
  padding: 40px 20px;
  max-width: 1100px;
  margin: auto;
  background: linear-gradient(to right, #fefefe, #f2f9ff);
  border-radius: 20px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.07);
  font-family: 'Poppins', sans-serif;
  color: #222;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
  color: #34495e;
`;

const VideoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const Video = styled.iframe`
  width: 90%;
  max-width: 900px;
  height: 420px;
  border-radius: 14px;
  border: none;

  @media (max-width: 768px) {
    height: 220px;
  }
`;

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px 0;
`;

const Tag = styled.span`
  background-color: #dfefff;
  color: #2e86de;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
`;

const InfoSection = styled.div`
  background: #ffffffdd;
  border-radius: 16px;
  padding: 20px 30px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Description = styled.p`
  font-size: 17px;
  line-height: 1.6;
  margin-bottom: 16px;
`;

const Price = styled.p`
  font-size: 22px;
  font-weight: bold;
  color: #27ae60;
`;

const Rating = styled.div`
  font-size: 18px;
  margin: 10px 0;
  color: #f1c40f;
`;

const ReviewSection = styled.div`
  margin-top: 30px;
  background: #f8f8f8;
  padding: 20px 30px;
  border-radius: 16px;
`;

const Review = styled.p`
  font-style: italic;
  color: #555;
`;

const Reviewer = styled.p`
  font-size: 14px;
  color: #888;
  margin-top: 5px;
`;

const Button = styled.button`
  margin-top: 25px;
  display: block;
  width: 100%;
  background: linear-gradient(135deg, #00c9ff 0%, #92fe9d 100%);
  color: #fff;
  padding: 14px;
  font-size: 18px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(null);

  const navigate = useNavigate();

  const fetchCourse = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/courses/${id}`);
      setCourse(res.data);
    } catch {
      console.error("Failed to fetch course details");
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const handleAddToCart = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return alert("Please login first");

    try {
      const userId = user.id;
      const userRes = await axios.get(`http://localhost:8080/users/${userId}`);
      const existingCart = Array.isArray(userRes.data.cart) ? userRes.data.cart : [];

      const isAlreadyInCart = existingCart.some(item => item.id === course.id);
      if (isAlreadyInCart) return alert("Course already in cart");

      const updatedCart = [...existingCart, course];
      await axios.patch(`http://localhost:8080/users/${userId}`, { cart: updatedCart });

      alert("Course added to cart");
      navigate('/cart');
    } catch (error) {
      console.error("Error adding to cart");
    }
  };

  const handleSubmitReview = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return alert("Please login to submit a review");

    const newReview = {
      userId: user.id,
      username: user.username,
      rating,
      comment: reviewText,
      date: new Date().toISOString().split('T')[0],
    };

    const hasReviewed = course.reviews?.some(r => r.userId === user.id);
    if (hasReviewed) return alert("You have already reviewed this course.");

    try {
      const updatedReviews = [...(course.reviews || []), newReview];
      await axios.patch(`http://localhost:8080/courses/${id}`, { reviews: updatedReviews });
      setCourse(prev => ({ ...prev, reviews: updatedReviews }));
      setReviewText('');
      setRating(0);
      alert("Review submitted!");
    } catch (err) {
      console.error("Error submitting review", err);
    }
  };

  if (!course) return <Container>Loading...</Container>;

  const avgRating = course.reviews?.length
    ? (course.reviews.reduce((acc, r) => acc + r.rating, 0) / course.reviews.length).toFixed(1)
    : "No ratings yet";
    const handleRatingChange = async (newRating) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return alert("Please login to rate the course.");
    
      try {
        setUserRating(newRating); // Show rating instantly
    
        await axios.post(`http://localhost:8080/courses/${id}/rate`, {
          userId: user.id,
          rating: newRating,
        });
    
        alert(`Thanks! You rated this course ${newRating} ⭐`);
      } catch (err) {
        console.error("Failed to submit rating", err);
        alert("Failed to submit rating. Try again later.");
      }
    };
    
  return (
    <Container>
      <Title>{course.title}</Title>
      <VideoWrapper>
        <Video
          src={course.videoUrl}
          title={course.title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </VideoWrapper>

      <TagsWrapper>
        <Tag>🔰 Beginner Friendly</Tag>
        <Tag>🔥 Trending</Tag>
        <Tag>🎓 Certificate Included</Tag>
      </TagsWrapper>

      <InfoSection>
        <Description>{course.description}</Description>
        <Price>Price ₹{course.amount}</Price>
        <Rating>⭐ {avgRating} / 5</Rating>
        <Button onClick={handleAddToCart}>Enroll Now</Button>
      </InfoSection>

      <ReviewSection>
        <h3 style={{ marginBottom: "10px", color: "#333" }}>⭐ Student Reviews</h3>

        {(course.reviews || []).map((rev, idx) => (
          <div key={idx} style={{ marginBottom: "20px" }}>
            <Rating>{"⭐".repeat(rev.rating)}</Rating>
            <Review>{rev.comment}</Review>
            <Reviewer>— {rev.username} | {rev.date}</Reviewer>
          </div>
        ))}

        <hr style={{ margin: "20px 0" }} />

        <h4 style={{ marginBottom: "10px" }}>Leave a Review</h4>
        <ReactStars
          count={5}
          value={rating}
          onChange={setRating}
          size={30}
          activeColor="#ffd700"
        />
        <Rating>
  <ReactStars
    count={5}
    value={userRating || course.rating || 0}
    onChange={handleRatingChange}
    size={28}
    activeColor="#ffd700"
    isHalf={true}
  />
  {userRating && <p style={{ color: "#2ecc71", marginTop: "5px" }}>You rated: {userRating} ⭐</p>}
</Rating>

        <textarea
          placeholder="Share your experience..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          style={{ width: "100%", padding: "12px", borderRadius: "8px", marginTop: "10px" }}
        />
        <Button onClick={handleSubmitReview}>Submit Review</Button>
      </ReviewSection>
    </Container>
  );
};

export default CourseDetails;
