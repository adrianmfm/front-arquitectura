import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from './login/LoginComponent';
import HomePage from './home/HomePage';
import Footer from './footer/Footer';
import Profile from './profile/Profile';
import Arriendo from './map';
import Navbar from './home/Navbar';
import Informacion from './reservas/Informacion';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route
            path='/*'
            element={
              <>
                <HomePage/>
                <Footer />
              </>
            }
          />
          <Route
            path='/perfil'
            element={
              <>
                <Navbar/>
                <Profile/>
                <Footer />
              </>
            }
          />
          <Route path='/ver-estacionamientos' element={
          <>
            <Navbar/>
            <Arriendo/>
            <Footer/>
          </>}/>
          <Route path='/mis-reservas' element={
          <>
            <Navbar/>
            <Informacion/>
            <Footer/>
          </>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
