import React from 'react'
import Navbar from './component/Navbar'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Myprofile from './pages/Myprofile'
import Myappointment from './pages/Myappointment'
import Appointment from './pages/Appointment'
import Footer from './component/Footer'

import { Toaster } from "react-hot-toast";
import { useShareContext } from './context/AppContext'

function App() {

  const { token } = useShareContext();

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      
      <Navbar/>

      <div className='pt-14 md:pt-16'>
        <Routes>

          {/* Login Route */}
          <Route
            path="/login"
            element={!token ? <Login /> : <Navigate to="/" />}
          />

          {/* Public Routes */}
          <Route path='/' element={<Home/>} />
          <Route path='/doctors' element={<Doctors/>} />
          <Route path='/doctors/:speciality' element={<Doctors/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
   

          {/* Protected Routes */}
          <Route
            path='/my-profile'
            element={token ? <Myprofile/> : <Navigate to="/login" />}
          />
          <Route
            path='/my-appointment'
            element={token ? <Myappointment/> : <Navigate to="/login" />}
          />
          <Route
            path='/appointment'
            element={token ? <Appointment/> : <Navigate to="/login" />}
          />
          <Route
            path='/appointment/:docId'
            element={token ? <Appointment/> : <Navigate to="/login" />}
          />

        </Routes>
      </div>

      <Footer/>
    </div>
  )
}

export default App