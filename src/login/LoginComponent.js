import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

function LoginComponent() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/home");
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
          <MDBCard className="my-5">
            <h1 className="my-5 display-6 fw-bold ls-tight">
              Bienvenido <br />
            </h1>
            <MDBCardBody className="p-5">
              <MDBInput
                wrapperClass="mb-4"
                label="Email"
                id="form1"
                type="email"
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Contraseña"
                id="form1"
                type="password"
              />

              <button
                onClick={handleClick}
                className="w-100 mb-4 btn btn-primary"
                size="md"
              >
                Iniciar sesión
              </button>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default LoginComponent;
