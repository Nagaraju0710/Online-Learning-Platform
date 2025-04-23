import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes, FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
import { FaRegSmile } from 'react-icons/fa';

const Nav = styled.nav`
  background-color: ${({ theme }) => (theme === 'dark' ? '#0f172a' : '#fff')};
  color: ${({ theme }) => (theme === 'dark' ? '#f1f5f9' : '#1e293b')};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: bold;
  color: #facc15;
  text-decoration: none;

  &:hover {
    color: #fde047;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: ${({ open }) => (open ? 'flex' : 'none')};
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: #0f172a;
    flex-direction: column;
    padding: 1rem 0;
  }
`;

const StyledLink = styled(Link)`
  color: #f1f5f9;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: 0.3s;

  &:hover {
    background-color: #1e293b;
    color: #38bdf8;
  }
`;

const LogoutButton = styled.button`
  background-color: #ef4444;
  color: white;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;

  &:hover {
    background-color: #dc2626;
  }
`;

const Hamburger = styled.div`
  display: none;
  font-size: 1.5rem;
  color: #f1f5f9;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const SearchContainer = styled.div`
  position: relative;
`;

const SearchBar = styled.input`
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const Suggestions = styled.div`
  position: absolute;
  top: 110%;
  left: 0;
  background: white;
  color: black;
  z-index: 10;
  width: 250px;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0px 2px 10px rgba(0,0,0,0.1);
`;

const SuggestionItem = styled(Link)`
  display: block;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #eee;
  text-decoration: none;
  color: #1e293b;

  &:hover {
    background: #f1f5f9;
  }
`;

const ThemeToggle = styled.button`
  background: none;
  color: inherit;
  border: none;
  cursor: pointer;
  margin-left: 1rem;
`;

const CartIconWrapper = styled(Link)`
  position: relative;
  color: #f1f5f9;
  font-size: 1.5rem;
  text-decoration: none;

  &:hover {
    color: #38bdf8;
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -12px;
  background-color: #ef4444;
  color: white;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 999px;
`;

const UserName = styled.span`
  color: #facc15;
  font-weight: bold;
  margin-left: 0.5rem;
`;

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.setItem('logout', Date.now()); // Trigger storage event
    window.location.href = '/';
  };
  
  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === 'logout') {
        // Perform logout in this tab as well
        localStorage.removeItem('user');
        window.location.href = '/';
      }
    };
  
    window.addEventListener('storage', onStorage);
  
    return () => {
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:8080/courses');
        setCourses(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchCartCount = async () => {
      if (user) {
        try {
          const res = await axios.get(`http://localhost:8080/users/${user.id}`);
          setCartCount(res.data.cart?.length || 0);
        } catch (err) {
          setCartCount(0);
        }
      }
    };

    fetchCartCount();
  }, [user]);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Nav theme={theme}>
      <Logo to="/">E-Learn</Logo>

      <Hamburger onClick={() => setOpen(!open)}>
        {open ? <FaTimes /> : <FaBars />}
      </Hamburger>

      <NavLinks open={open}>
        <SearchContainer>
          <SearchBar
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && filteredCourses.length > 0 && (
            <Suggestions>
              {filteredCourses.map(course => (
                <SuggestionItem
                  key={course.id || course._id}
                  to={`/courses/${course.id || course._id}`}
                  onClick={() => setSearchTerm('')}
                >
                  {course.title}
                </SuggestionItem>
              ))}
            </Suggestions>
          )}
        </SearchContainer>

        {user ? (
          <>
            {user.role === 'admin' ? (
              <>
                <StyledLink to="/profile">
                  <FaUserCircle />
                  <UserName>{user.name}</UserName>
                </StyledLink>
                <StyledLink to="/admin">Dashboard</StyledLink>
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
              </>
            ) : (
              <>
                <StyledLink to="/courses">Courses</StyledLink>
                <StyledLink to="/profile">
                  {/* <FaUserCircle /> */}
                  <UserName>Hello! {user.name}</UserName>
                  😊
                </StyledLink>
                <StyledLink to="/my-course">My-Courses</StyledLink>
                <CartIconWrapper to="/cart">
                  <FaShoppingCart />
                  {cartCount > 0 && <CartCount>{cartCount}</CartCount>}
                </CartIconWrapper>
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
              </>
            )}
          </>
        ) : (
          <StyledLink to="/login">Login</StyledLink>
        )}

        <ThemeToggle onClick={toggleTheme}>
          {theme === 'dark' ? '🌞' : '🌙'}
        </ThemeToggle>
      </NavLinks>
    </Nav>
  );
};

export default Navbar;
