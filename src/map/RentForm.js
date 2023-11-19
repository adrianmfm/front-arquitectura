import React from "react";

const RentForm = ({ show, onHide, handleArrendarClick }) => {
  return (
    <div style={{ display: show ? "block" : "none" }}>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          zIndex: "1000",
          fontSize: "1.2em",
          textAlign: "center",
        }}
      >
        <h2>Detalles del Estacionamiento</h2>
        <p>¿Deseas arrendar este estacionamiento?</p>
        <button onClick={onHide}>Cerrar</button>
        <button onClick={handleArrendarClick}>Arrendar</button>
      </div>
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: "999",
          display: show ? "block" : "none",
        }}
        onClick={onHide}
      ></div>
    </div>
  );
};

export default RentForm;
