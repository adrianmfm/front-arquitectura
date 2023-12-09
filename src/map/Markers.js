import React, { useState, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import { obtenerLatitudLongitudDesdeAPI, arrendarPlaza, obtenerTotalPlazasDisponibles } from "../services/api";
import { Icon } from "leaflet";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { zonedTimeToUtc } from 'date-fns-tz';

const Markers = () => {
  const [estacionamientos, setEstacionamientos] = useState([]);
  const [totalPlazasDisponibles, setTotalPlazasDisponibles] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [datePickerModal, setDatePickerModal] = useState(false);
  const [selectedEstacionamiento, setSelectedEstacionamiento] = useState(null);
  
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const minTime = zonedTimeToUtc(new Date(), 'America/Santiago');
  const maxTime = zonedTimeToUtc(new Date(), 'America/Santiago');
  maxTime.setHours(23);
  maxTime.setMinutes(59);

  const handleArrendarClick = (idPlaza) => {
    if (selectedDate) {
      // Restar 3 horas a la hora seleccionada
      const selectedDateCopy = new Date(selectedDate);
      selectedDateCopy.setHours(selectedDateCopy.getHours() - 3);
  
      const selectedDateUtc = zonedTimeToUtc(selectedDateCopy, 'America/Santiago');
      const login = JSON.parse(sessionStorage.getItem('login'));
      arrendarPlaza(idPlaza, login.user.id, selectedDateUtc);
      window.location.reload();
    } else {
      console.error('No se ha seleccionado ninguna fecha');
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openDatePickerModal = (estacionamiento) => {
    setSelectedEstacionamiento(estacionamiento);
    setDatePickerModal(true);
  };

  useEffect(() => {
    const obtenerTotalPlazas = async () => {
      const login = JSON.parse(sessionStorage.getItem('login'));
      try {
        const data = await obtenerTotalPlazasDisponibles(login.user.id);
        setTotalPlazasDisponibles(data);
      } catch (error) {
        console.error("Error al obtener el total de plazas disponibles:", error);
      }
    };

    obtenerTotalPlazas();
  }, []);
  const closeDatePickerModal = () => {
    setDatePickerModal(false);
  };

  useEffect(() => {
    const obtenerEstacionamientos = async () => {
      try {
        const login = JSON.parse(sessionStorage.getItem('login'));
        const datos = await obtenerLatitudLongitudDesdeAPI(login.user.id);
        setEstacionamientos(datos.estacionamientos);
      } catch (error) {
        console.error("Error al obtener estacionamientos:", error);
      }
    };

    obtenerEstacionamientos();
  }, []);

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

      {/* Markers y Popups */}
      {estacionamientos.map((estacionamiento) => {
        if (estacionamiento.habilitado) {
          return (
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
              <Popup >
                <div className="text-center">
                  <h6>{estacionamiento.direccion}</h6>
                  <p>Tarifa: {estacionamiento.tarifa}</p>
                  <p>{estacionamiento.descripcion}</p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => openDatePickerModal(estacionamiento)}
                  >
                    Arrendar
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        }
        return null;
      })}

      {/* Modal para la información del DatePicker */}
      {datePickerModal && selectedEstacionamiento && (
        <div className="date-picker-info">
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "400px", // Fixed width
              height: "190px", // Fixed height
              zIndex: "1000",
              fontSize: "1.2em",
              textAlign: "center",
            }}
          >
            <button className="btn btn-link" onClick={closeDatePickerModal} style={{
              position: "absolute",
              top: "0",
              right: "0",
            }}>
              <img
              src="/media/icon-x.svg"
              alt="salir"
              width="10"
              height="10"
            ></img>
            </button>

            <div className="modal-content">
              <h6>{selectedEstacionamiento.direccion}</h6>
              <p>Seleccione la fecha y hora de entrada</p>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                showTimeSelect
                showTimeSelectOnly={false}
                timeIntervals={1}
                dateFormat="MM/dd/yyyy h:mm aa" // Formato para fecha y hora
                placeholderText="Seleccione una fecha y hora" // Texto del placeholder para indicar que seleccione una fecha
                minTime={minTime} // Establece la hora mínima permitida
                maxTime={maxTime} // Establece la hora máxima permitida
                minDate={new Date()} // Establece la fecha mínima como hoy
            
                // Establece la hora mínima como la hora actual
              />
              <button className="btn btn-link" onClick={() => handleArrendarClick(selectedEstacionamiento.idPlaza)}>
                Aceptar
              </button>
              
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Markers;
