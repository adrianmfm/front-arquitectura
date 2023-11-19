import React from "react";
import Map from "./Map";
import RentForm from "./RentForm";
const Arriendo = () => {
  return (
    <div>
      <h1 className="my-3 display-3 fw-bold ls-tight px-3">
        <span className="text-primary">Estacionamientos disponibles</span>
      </h1>
      <Map />
      <RentForm/>
    </div>
  );
};

export default Arriendo;
