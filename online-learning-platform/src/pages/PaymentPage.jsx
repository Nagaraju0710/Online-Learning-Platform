import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import phonepe from "../Images/phonepe-1.svg"
import googlepay from "../Images/google-pay-2.svg"
import Paytm from "../Images/paytm-1.svg"
import Razorpay from "../Images/razorpay.svg"
import cred from "../Images/cred.png"
import card from "../Images/card.png"

// Styled Components
const fadeInUp = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const Container = styled.div`
  max-width: 550px;
  margin: 50px auto;
  background: #f4f7fa;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  animation: ${fadeInUp} 0.5s ease-in-out;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 28px;
  color: #2c3e50;
`;

const TotalAmount = styled.p`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 25px;
  text-align: center;
  color: #16a085;
`;

const PaymentOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
`;

const LogoButton = styled.button`
  border: ${(props) => (props.active ? '3px solid #16a085' : '2px solid transparent')};
  border-radius: 16px;
  padding: 14px;
  background-color: #ffffff;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: ${(props) => (props.active ? '0 4px 12px rgba(22, 160, 133, 0.4)' : '0 2px 6px rgba(0, 0, 0, 0.1)')};
  outline: none;

  &:hover {
    transform: scale(1.08);
  }

  img {
    width: 90px;
    height: 45px;
    object-fit: contain;
  }
`;

const Form = styled.div`
  margin-top: 40px;
  animation: ${fadeInUp} 0.4s ease-in-out;
`;

const Input = styled.input`
  width: 50%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
  margin-bottom: 18px;
  margin-left: 170px;
  font-size: 16px;
  transition: 0.3s;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);

  &:focus {
    border-color: #16a085;
    box-shadow: 0 0 5px rgba(22, 160, 133, 0.5);
    outline: none;
  }
`;

const Button = styled.button`
  margin-top: 16px;
  width: 100%;
  padding: 16px;
  background: linear-gradient(to right, #16a085, #1abc9c);
  border: none;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.4s;

  &:hover {
    background: linear-gradient(to right, #1abc9c, #16a085);
    box-shadow: 0 0 12px rgba(26, 188, 156, 0.4);
    transform: scale(1.02);
  }
`;

// Logos Data
const paymentMethods = [
  { id: 'upi-phonepe', label: 'PhonePe', img: phonepe },
  { id: 'upi-gpay', label: 'Google Pay', img: googlepay },
  { id: 'upi-paytm', label: 'Paytm', img: Paytm },
  { id: 'razorpay', label: 'Razorpay', img: Razorpay },
  { id: 'cred', label: 'CRED', img: cred },
  { id: 'card', label: 'Credit/Debit Card', img: card},
];

const PaymentPage = () => {
  const [cart, setCart] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });

  const navigate = useNavigate();

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('checkoutCart'));
    if (!cartData) return toast.error("Cart is empty");
    setCart(cartData);
  }, []);

  const total = cart.reduce((acc, item) => acc + parseInt(item.amount), 0);

  const handlePayment = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return toast.error("Please login");

    try {
      const res = await axios.get(`http://localhost:8080/users/${user.id}`);
      const currentPurchased = res.data.purchased || [];

      await axios.patch(`http://localhost:8080/users/${user.id}`, {
        cart: [],
        purchased: [...currentPurchased, ...cart],
      });

      toast.success("Payment Successful!");
      localStorage.removeItem('checkoutCart');
      navigate('/success');
    } catch (err) {
      toast.error("Payment Failed");
    }
  };

  return (
    <Container>
      <Title>Choose Your Payment Method</Title>
      <TotalAmount>Total Payable: ₹{total}</TotalAmount>

      <PaymentOptions>
        {paymentMethods.map((method) => (
          <LogoButton
            key={method.id}
            active={selectedMethod === method.id}
            onClick={() => setSelectedMethod(method.id)}
          >
            <img src={method.img} alt={method.label} />
          </LogoButton>
        ))}
      </PaymentOptions>

      {selectedMethod && (
        <Form>
          {selectedMethod === 'card'? (
            <>
              <Input
                placeholder="Card Number"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
              />
              <Input
                placeholder="Name on Card"
                value={cardDetails.name}
                onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
              />
              <Input
                placeholder="Expiry (MM/YY)"
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
              />
              <Input
                placeholder="CVV"
                maxLength="3"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
              />
            </>
          ) : (
            <p style={{ fontSize: '16px', marginTop: '20px' }}>
              Proceeding to payment via <strong>{paymentMethods.find(m => m.id === selectedMethod)?.label}</strong>.
            </p>
          )}

          <Button onClick={handlePayment}>Pay Now</Button>
        </Form>
      )}
    </Container>
  );
};

export default PaymentPage;
