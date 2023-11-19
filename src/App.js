import React, {useReducer} from 'react';
import loginReducer from './login/reducers/loginReducer'
import './App.css';
import { BrowserRouter, Routes, Route , Navigate } from "react-router-dom";
import LoginComponent from './login/LoginComponent';
import HomePage from './home/HomePage';
import Footer from './footer/Footer';
import Profile from './profile/Profile';
import Arriendo from './map';
import Navbar from './home/Navbar';
import Informacion from './booking/Info'
import { loginUser } from './login/services/authServices';
import { Parking } from './parking/Parking';
import Swal from 'sweetalert2';

const initialLogin = JSON.parse(sessionStorage.getItem('login'))  || {
  isAuth: false,
  isDyeno: false,
  email: undefined,
}

function App() {
  

  const [login, dispatch] = useReducer(loginReducer, initialLogin);
  const handleLogin = async ({email,password}) =>{
    
    try {
      const response = await loginUser({email,password});
      const token = response.data.token;
      const claims = JSON.parse(window.atob(token.split('.')[1]));
      const user = {email: response.data.email}
      dispatch({
        type: 'login',
        payload: {user,
          isDueno: JSON.parse(claims.authorities).some(auth => auth.authority === 'ROLE_DUENO')
        }
      });
      sessionStorage.setItem('login',JSON.stringify(
        {isAuth: true,
        isDueno: JSON.parse(claims.authorities).some(auth => auth.authority === 'ROLE_DUENO'),
        user,}
      ));
      sessionStorage.setItem('token',`Bearer ${token}`);
      
    }catch (error) {
        if (error.response?.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email o contraseña incorrecta',
          })
        }
        else if (error.response?.status === 403) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '',
          })
        }
        else {
          throw error;
        }
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Faltan campos por llenar',
      });
      
    }
    
    
  };
  const handleLogout = () =>{
    dispatch({
      type: 'logout',
    });
    sessionStorage.removeItem('login');
    sessionStorage.clear();
  };
  

  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginComponent handleLogin={handleLogin} />} />
          
          <Route
            path='/*'
            element={login.isAuth ? (
              <>
                <HomePage handleLogout={handleLogout}/>
                <Footer />
              </>) : <LoginComponent handleLogin={handleLogin}/>
            }
          />
          <Route
            path='/perfil'
            element={login.isAuth ?(
              <>
                <Navbar handleLogout={handleLogout}/>
                <Profile/>
                <Footer />
              </>) : <LoginComponent handleLogin={handleLogin} />}
            
          />
          <Route path='/ver-estacionamientos' element={login.isAuth ?(
          <>
            <Navbar handleLogout={handleLogout}/>
            <Arriendo/>
            <Footer/>
          </>): <LoginComponent handleLogin={handleLogin} />}/>
          <Route path='/parking' element={login.isAuth ?(
          <>
            <Navbar handleLogout={handleLogout}/>
            <Parking/>
            <Footer/>
          </>): <LoginComponent handleLogin={handleLogin} />}/>
          
          <Route path='/mis-reservas' element={
          <>
            <Navbar handleLogout={handleLogout}/>
            <Informacion/>
            <Footer/>
          </>}/>
          

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
