import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ExitoPago = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const monto = searchParams.get('monto');
  const fechaTransaccion = searchParams.get('fechaTransaccion');
  const codigoAutorizacion = searchParams.get('codigoAutorizacion');

  const formatearFecha = (fecha) => {
    const fechaObjeto = new Date(fecha);
    return fechaObjeto.toLocaleString(); // Puedes ajustar el formato según tu preferencia
  };

  return (
    <div style={styles.contenedor}>
      <div style={styles.boleta}>
        <h1 style={styles.titulo}>¡Pago Exitoso!</h1>
        <hr style={styles.linea} />
        <p><strong>Monto:</strong> ${monto}</p>
        <p><strong>Fecha de Transacción:</strong> {fechaTransaccion ? formatearFecha(fechaTransaccion) : ''}</p>
        <p><strong>Código de Autorización:</strong> {codigoAutorizacion}</p>
        <Link to="/" style={styles.boton}>Volver a Home</Link>
      </div>
    </div>
  );
};

const styles = {
  contenedor: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  boleta: {
    backgroundColor: '#fff',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
    margin: '20px auto', // Ajusta el margen para centrar verticalmente
  },
  titulo: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '10px',
  },
  linea: {
    border: 'none',
    borderTop: '1px dashed #999',
    marginBottom: '15px',
  },
  boton: {
    display: 'block',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 16px',
    cursor: 'pointer',
    textAlign: 'center',
    textDecoration: 'none',
    marginTop: '15px',
  },
};

export default ExitoPago;
