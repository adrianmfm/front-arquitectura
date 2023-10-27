import React from 'react';
import { useNavigate } from 'react-router-dom';
function Card({title, urlToGo, urlImage}) {
  const handleMouseEnter = (e) => {
    e.currentTarget.style.filter = 'brightness(80%)'; // Aplica un filtro de brillo al 80%
  }

  const handleMouseLeave = (e) => {
    e.currentTarget.style.filter = 'brightness(100%)'; // Restaura el brillo al 100% al salir del hover
  }

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(urlToGo);
  };

  return (
    <div
      className="container card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ width: '25rem' }}
    >
      <img src={urlImage} alt="Amazing Mountain"  style={{ height: '300px' }} />
      <button type="button" class="btn btn-primary" onClick={handleClick}>{title}</button>
    </div>
    
  );
}

export default Card;
