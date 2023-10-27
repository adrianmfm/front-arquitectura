import React from "react";
import { MDBFooter, MDBContainer } from "mdb-react-ui-kit";

export default function Footer() {
  return (
    <MDBFooter
      className="text-center text-white"
      style={{ backgroundColor: "#0054AB" }}
    >
      <MDBContainer className="p-4"></MDBContainer>

      <div className="text-center p-3">© 2023 Arrienda tu estacionamiento</div>
    </MDBFooter>
  );
}
