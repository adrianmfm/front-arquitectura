import React, { useState, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import {
  obtenerLatitudLongitudDesdeAPI,
  arrendarPlaza,
  obtenerTotalPlazasDisponibles,
} from "../services/api";
import { Icon } from "leaflet";
import { Link } from "react-router-dom";
import { RentForm } from "./RentForm";
const Markers = () => {
  const [estacionamientos, setEstacionamientos] = useState([]);
  const [totalPlazasDisponibles, setTotalPlazasDisponibles] = useState(null);
  const [showModal, setShowModal] = useState(true);

  const handleArrendarClick = (idPlaza) => {
    arrendarPlaza(idPlaza, 1);
    //cambiar 1 por variable idpersona cuando este logueado
    //window.location.reload();

  };

  useEffect(() => {
    const obtenerTotalPlazas = async () => {
      try {
        const data = await obtenerTotalPlazasDisponibles();
        setTotalPlazasDisponibles(data);
      } catch (error) {
        console.error(
          "Error al obtener el total de plazas disponibles:",
          error
        );
      }
    };

    obtenerTotalPlazas();
  }, []);

  useEffect(() => {
    const obtenerEstacionamientos = async () => {
      try {
        const datos = await obtenerLatitudLongitudDesdeAPI();
        setEstacionamientos(datos.estacionamientos);
      } catch (error) {
        console.error("Error al obtener estacionamientos:", error);
        
      }
      
    };
    

    obtenerEstacionamientos();
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };
  console.log(totalPlazasDisponibles);
  return (
    <>
      {showModal && (
        <div 
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "20px",
            borderRadius: "8px",
            zIndex: "1000",
            fontSize: "1.2em",
            textAlign: "center",
          }}
        >
          {totalPlazasDisponibles !== null ? (
            totalPlazasDisponibles > 0 ? (
              `Total de estacionamientos disponibles: ${totalPlazasDisponibles}`
            ) : (
              <>
                No hay estacionamientos disponibles.
                <Link to="/home">Volver a Home</Link>
              </>
            )
          ) : (
            "Cargando..."
          )}
          <button className="btn btn-link" onClick={closeModal}>
            <img
              src="/media/icon-x.svg"
              alt="salir"
              width="10"
              height="10"
            ></img>
          </button>
        </div>
      )}

      {estacionamientos.map(
        (estacionamiento) =>
          estacionamiento.habilitado && (
            <Marker
              key={estacionamiento.idEstacionamiento}
              position={{
                lat: estacionamiento.latitud,
                lng: estacionamiento.longitud,
              }}
              icon={
                new Icon({
                  iconUrl: require("../icon/icon.svg").default,
                  iconSize: [60, 60],
                })
              }
            >
              <Popup>
                <div className="text-center">
                  <h6>{estacionamiento.direccion}</h6>
                  <p>Tarifa: {estacionamiento.tarifa}</p>
                  <p>{estacionamiento.descripcion}</p>
                  <p>
                    {estacionamiento.habilitado ? "Disponible" : "Arrendado"}
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleArrendarClick(estacionamiento.idPlaza)}
                  >
                    Arrendar
                  </button>
                </div>
              </Popup>
            </Marker>
          )
      )}
    </>
  );
};

export default Markers;
