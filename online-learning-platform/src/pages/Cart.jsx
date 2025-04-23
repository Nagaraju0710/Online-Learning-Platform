import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import styled from 'styled-components';

// Styled components
const CartContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f4f4f4;
  border-radius: 10px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  color: #111;
`;

const CartItem = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  align-items: center;
`;

const ItemInfo = styled.div`
  flex: 1;
  margin-left: 20px;
`;

const ItemTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
`;

const ItemPrice = styled.p`
  font-size: 18px;
  color: #e63946;
  font-weight: bold;
  margin-top: 10px;
`;

const VideoWrapper = styled.div`
  width: 180px;
  height: 100px;
  margin-right: 20px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #eaeaea;
`;

const Video = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const RemoveButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 15px;

  &:hover {
    background-color: #e53935;
  }
`;

const CheckoutContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  padding-top: 10px;
  border-top: 1px solid #ddd;
`;

const TotalPrice = styled.p`
  font-size: 22px;
  font-weight: bold;
  color: #333;
`;

const PaymentButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  // Fetch the cart data for the logged-in user
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      axios.get(`http://localhost:8080/users/${user.id}`)
        .then(res => setCart(res.data.cart || []))
        .catch(err => toast.error("Failed to fetch cart"));
    }
  }, []);

  // Calculate the total price of all courses in the cart
  const total = cart.reduce((acc, course) => acc + parseInt(course.amount), 0);

  // Function to handle course removal
  const handleRemoveFromCart = async (courseId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return alert("Please login first");

    try {
      const userId = user.id;
      const userRes = await axios.get(`http://localhost:8080/users/${userId}`);
      const updatedCart = userRes.data.cart.filter(item => item.id !== courseId);

      await axios.patch(`http://localhost:8080/users/${userId}`, { cart: updatedCart });

      setCart(updatedCart);
      alert("Course removed from cart");
    } catch (error) {
      console.error("Error removing course from cart");
    }
  };

  // Function to handle checkout/payment
  const handlePayment = async () => {
    if (cart.length === 0) return toast.error("Cart is empty");

    localStorage.setItem('checkoutCart', JSON.stringify(cart));
    navigate('/payment');
  };

  return (
    <CartContainer>
      <Title>Your Cart</Title>
      {cart.length === 0 ? (
        <p>Your cart is empty. Add courses to your cart.</p>
      ) : (
        cart.map((course, i) => (
          <CartItem key={i}>
            <VideoWrapper>
              <Video
                src={course.videoUrl}
                title={course.title}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </VideoWrapper>
            <ItemInfo>
              <ItemTitle>{course.title}</ItemTitle>
              <p>{course.description}</p>
              <ItemPrice>Price ₹{course.amount}</ItemPrice>
              <RemoveButton onClick={() => handleRemoveFromCart(course.id)}>
                Remove from Cart
              </RemoveButton>
            </ItemInfo>
          </CartItem>
        ))
      )}
      {cart.length > 0 && (
        <CheckoutContainer>
          <TotalPrice>Total: ₹{total}</TotalPrice>
          <PaymentButton onClick={handlePayment}>
            Proceed to Payment
          </PaymentButton>
        </CheckoutContainer>
      )}
    </CartContainer>
  );
};

export default Cart;
