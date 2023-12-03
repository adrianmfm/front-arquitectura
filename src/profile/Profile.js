import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { getPersonaByEmail } from '../services/api';

export default function Profile() {
  const [datosPersonales, setDatosPersonales] = useState(null);


  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const login = JSON.parse(sessionStorage.getItem('login'));
        
        const datos = await getPersonaByEmail(login.user.email);
        setDatosPersonales(datos);
        console.log(login.user.id)
      } catch (error) {
        console.error('Error al cargar los datos personales:', error);
      }
    };
    cargarDatos();
  }, []);

  return (
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className="py-5 h-70">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="7" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src="https://cdn-icons-png.flaticon.com/512/1198/1198293.png"
                    alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Información Personal</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Nombre</MDBTypography>
                        <MDBCardText className="text-muted">{datosPersonales?.nombre}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Apellido</MDBTypography>
                        <MDBCardText className="text-muted">{datosPersonales?.paterno}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">{datosPersonales?.email}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Fecha de Nacimiento</MDBTypography>
                        <MDBCardText className="text-muted">{datosPersonales?.fechaNacimiento}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">RUT</MDBTypography>
                        <MDBCardText className="text-muted">{datosPersonales?.rut}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
