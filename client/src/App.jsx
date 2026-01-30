import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Landing from "./pages/Landing"
import Signup from './pages/Signup';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import Universities from './pages/Universities';


const App = () => {
  return (
    <>
      <Toaster />

      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/onboarding' element={<Onboarding />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/applications' element={<Applications />} />
        <Route path='/universities' element={<Universities />} />
        <Route path='*' element={<Landing />} />
      </Routes>

    </>
  )
}
export default App;



