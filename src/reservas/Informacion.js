import React, { useState, useEffect } from "react";
import { obtenerInfoEstacionamiento, liberarPlaza } from "../services/api";

const Informacion = () => {
  const [infoEstacionamiento, setInfoEstacionamiento] = useState(null);

  const handleLiberarPlaza = (idPlaza) => {
    liberarPlaza(idPlaza);
    window.location.reload();
  };

  useEffect(() => {
    const obtenerInfo = async () => {
      try {
        const data = await obtenerInfoEstacionamiento(1);
        setInfoEstacionamiento(data.infoEstacionamiento);
      } catch (error) {
        console.error(
          "Error al obtener la información del estacionamiento:",
          error
        );
      }
    };

    obtenerInfo();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Mis reservas</h2>
      <div className="row">
        {infoEstacionamiento &&
          infoEstacionamiento.length > 0 &&
          infoEstacionamiento.map((estacionamiento, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{estacionamiento.direccion}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {estacionamiento.descripcion}
                  </h6>
                  <p className="card-text">Precio: {estacionamiento.tarifa}</p>
                  {/* <button
                    className="btn btn-danger"
                    onClick={() => handleLiberarPlaza(estacionamiento.idPlaza)}
                  >
                    Cancelar arriendo
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        {(!infoEstacionamiento || infoEstacionamiento.length === 0) && (
          <div className="col">
            <p>No tienes reservas activas</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Informacion;
