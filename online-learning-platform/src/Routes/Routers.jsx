import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login'
import Courses from '../pages/Courses';
import CourseDetails from '../pages/CourseDetails'
import PrivateRoute from '../Components/PrivateRoute'
// import Payment from '../pages/Payment'
import LearnCourse from '../pages/LearnCourse'
import Assignment from '../pages/TestPage'
import Certificate from '../pages/Certificate'
import AdminDashboard from '../pages/AdminDashboard'
import HomePage from '../pages/HomePage'
import AdminRegister from '../pages/AdminRegister';
import AdminLogin from '../pages/AdminLogin';
import AddCourse from '../pages/AddCourse';
import ManageCourses from '../pages/ManageCourses';
import Cart from '../pages/Cart';
import MyCourses from '../pages/MyCourses';
import PaymentPage from '../pages/PaymentPage';
import Confirmation from '../pages/Confirmation';
import ProfilePage from '../pages/ProfilePage';
import StudentHome from '../pages/StudentHome';
import AllUsers from '../pages/AllUsers';


function Routers() {
  
  return (

      <Routes>
      <Route path='/' element={<HomePage/>}/>
       <Route path='/register' element={<Register/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/adminregister' element={<AdminRegister/>}/>
       <Route path='/adminlogin' element={<AdminLogin/>}/>
      <Route path='/courses' element={<Courses/>}/>
      <Route path='/courses/:id' element={<CourseDetails/>}/>
      {/* <Route path='/payment/:id' element={<PrivateRoute><Payment/></PrivateRoute>} /> */}
      <Route path='/learn/:id' element={<PrivateRoute><LearnCourse/></PrivateRoute>} />
      <Route path='/test/:courseId' element={<PrivateRoute><Assignment/></PrivateRoute>} />
      <Route path='/certificate/:id' element={<PrivateRoute><Certificate/></PrivateRoute>} />
      <Route path='/admin' element={<PrivateRoute><AdminDashboard/></PrivateRoute>} />
      <Route path='/addcourse' element={<PrivateRoute><AddCourse/></PrivateRoute>}/>
      <Route path='/allcourses' element={<PrivateRoute><ManageCourses/></PrivateRoute>}/>
      <Route path='/cart' element={<PrivateRoute><Cart/></PrivateRoute>}/>
      <Route path='/my-course' element={<PrivateRoute><MyCourses/></PrivateRoute>}/>
      <Route path='/payment' element={<PrivateRoute><PaymentPage/></PrivateRoute>}/>
      <Route path='/success' element={<PrivateRoute><Confirmation/></PrivateRoute>}/>
      <Route path='/profile' element={<PrivateRoute><ProfilePage/></PrivateRoute>}/>
      <Route path='/studenthome' element={<PrivateRoute><StudentHome/></PrivateRoute>}/>
      <Route path='/allusers' element={<PrivateRoute><AllUsers/></PrivateRoute>}/>
      </Routes>
   
  );
}

export default Routers;