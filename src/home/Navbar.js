import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login')
  };

  const goToReservas = () => {
    navigate('/mis-reservas');
  };

  const goToPerfil = () => {
    navigate('/perfil');
  };

  return (
    <nav
      className="navbar navbar-light"
      style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
    >
      <div className="container d-flex align-items-center">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img src="/media/logo.avif" alt="" width="150" height="auto" />
          <span className="my-1 display-6 fw-bold ls-tight text-primary">Arriendo mi estacionamiento</span>
        </a>
        <button
          className="btn btn-link "
          onClick={goToPerfil}
          title="Perfil"
        >
          <img src='/media/profile.svg' alt="perfil" width="25" height="25" />
        </button>
        <button
          className="btn btn-link"
          onClick={goToReservas}
          title="Reservas"
        >
          <img src='/media/calendar.svg' alt="reservas" width="25" height="25" />
        </button>
        <button
          className="btn btn-link"
          onClick={handleLogout}
          title="Salir"
          
        >
          <img src='/media/icon-salir.svg' alt="Salir" width="25" height="25" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
