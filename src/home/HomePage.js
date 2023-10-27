import React from "react";
import Navbar from "./Navbar"; // Asegúrate de ajustar la ruta según la ubicación real del componente
import Card from "./Card";
import Map from "../map/Map";
function HomePage() {
  return (
    <div>
      <Navbar/>
      <Map></Map>
    </div>
  );
}

export default HomePage;
