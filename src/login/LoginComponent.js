import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import Swal from 'sweetalert2'

const initialLoginFormData = {
  email: "",
  password: "",
}

function LoginComponent({handleLogin}) {
  const [loginFormData, setLoginForm] = useState(initialLoginFormData);
  const {email, password} = loginFormData;
  const onInputChange = ({target}) => {
    const {name, value} = target;
    setLoginForm({...loginFormData, [name]: value,});

  }

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if  (!email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Faltan campos por llenar',
      });
    }
    handleLogin({email, password});
    setLoginForm(initialLoginFormData);
  };

  return (
    <MDBContainer fluid className="p-4">
      <MDBRow>
        <MDBCol
          md="6"
          className="text-center text-md-start d-flex flex-column justify-content-center"
        >
          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            Arriendo <br />
            <span className="text-primary">mi estacionamiento</span>
          </h1>

          <p className="px-3">
            Encuentra tu espacio de estacionamiento ideal en Santiago con
            nuestro conveniente servicio de arriendo.
          </p>
          <div className="text-center mb-4">
            <img src="/media/logo.avif" alt="LOGO" style={{ width: "300px" }} />
          </div>
        </MDBCol>
          <MDBCol md="6">
          <form onSubmit={onSubmit}>
            <MDBCard className="my-5">
              <h1 className="my-5 display-6 fw-bold ls-tight">
                Bienvenido <br />
              </h1>
              <MDBCardBody className="p-5">
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email"
                  id="formEmail"
                  type="email"
                  name="email"
                  value={email}
                  onChange={onInputChange}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Contraseña"
                  id="formPassword"
                  type="password"
                  name="password"
                  value={password}
                  onChange={onInputChange}
                />
                <button
                  className="w-100 mb-4 btn btn-primary"
                  size="md"
                  type="submit"
                >
                  Iniciar sesión
                </button>
                
              </MDBCardBody>
            </MDBCard>
            </form>
          </MDBCol>
      
      </MDBRow>
    </MDBContainer>
  );
}

export default LoginComponent;
