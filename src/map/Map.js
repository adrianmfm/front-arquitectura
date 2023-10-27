import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup  } from 'react-leaflet';
import Markers from './Markers';
import { Icon } from "leaflet";

const Map = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    // Obtener la ubicación actual del usuario
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPosition([latitude, longitude]);
      },
      (error) => {
        console.error('Error al obtener la ubicación:', error);
      }
    );
  }, []); // El segundo argumento [] asegura que este efecto se ejecute solo una vez al montar el componente

  if (!position) {
    return <div>Cargando...</div>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto" }}>
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        style={{
          height: "400px",
          width: "100%",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Markers />
        <Marker
              key={"ubicacionActual"}
              position={position}
              icon={
                new Icon({
                  iconUrl: require("../icon/icon-red.svg").default,
                  iconSize: [40, 40],
                })
              }
            > <Popup>
            <div className="text-center">
              <h6>Tu ubicación</h6>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
