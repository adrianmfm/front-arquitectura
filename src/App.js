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
import { getPersonaByEmail } from "./services/api";
import ExitoPago from './booking/ExitoPago';
import ErrorPago from './booking/ErrorPago';
const initialLogin = JSON.parse(sessionStorage.getItem('login'))  || {
  isAuth: false,
  isDueno: false,
  email: undefined,
}

function App() {
  

  const [login, dispatch] = useReducer(loginReducer, initialLogin);
  const handleLogin = async ({email,password}) =>{
  try {
      const response = await loginUser({email,password});
      const token = response.data.token;
      sessionStorage.setItem('token', `Bearer ${token}`);

      const claims = JSON.parse(window.atob(token.split('.')[1]));
      // Verificar el rol y establecer la redirección
      let redirectPath = '/';
      const authorities = JSON.parse(claims.authorities);
      
      // ir a buscar el id de la persona por email
      console.log(token, sessionStorage.getItem('token'));
      const { idPersona } = await getPersonaByEmail(email)
      const user = {email, id: idPersona}
       if (user.email === 'ad.flores@duocuc.cl') {
         // Si el usuario es dueño, redirigir a una ruta para dueños
         console.log('parking', user.email)
         redirectPath = '/parking';
       } else {
         // Si el usuario es un usuario normal, redirigir a una ruta para usuarios
         console.log('home')
         redirectPath = '/';
       }
   
       // Guardar en sessionStorage
       sessionStorage.setItem('login', JSON.stringify({
         isAuth: true,
         isDueno: authorities.some(auth => auth.authority === 'ROLE_DUENO'),
         user
       }));
      dispatch({
        type: 'login',
        payload: {user,
          isDueno: JSON.parse(claims.authorities).some(auth => auth.authority === 'ROLE_DUENO')
        }
      });
      return <Navigate to={redirectPath} />;
  
      
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
          <Route
            path='/pago/exito'
            element={login.isAuth ?(
              <>
                <Navbar handleLogout={handleLogout}/>
                <ExitoPago/>
                <Footer />
              </>) : <LoginComponent handleLogin={handleLogin} />}
            
          />
           <Route
            path='/pago/fallido'
            element={login.isAuth ?(
              <>
                <Navbar handleLogout={handleLogout}/>
                <ErrorPago/>
                <Footer />
              </>) : <LoginComponent handleLogin={handleLogin} />}
            
          />
          
          <Route path='/mis-reservas' element={login.isAuth ?(
          <>
            <Navbar handleLogout={handleLogout}/>
            <Informacion/>
            <Footer/>
          </>): <LoginComponent handleLogin={handleLogin} />} />
          

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
