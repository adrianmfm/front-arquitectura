import React from 'react';
import { useLocation } from 'react-router-dom';

const ErrorPago = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const motivo = searchParams.get('motivo');
  const ordenCompra = searchParams.get('ordenCompra');

  return (
    <div style={styles.contenedor}>
      <div style={styles.error}>
        <h1 style={styles.titulo}>¡Pago Fallido!</h1>
        <hr style={styles.linea} />
        <p><strong>Motivo:</strong> {motivo}</p>
        <p><strong>Orden de Compra:</strong> {ordenCompra}</p>
        {/* Otros elementos o información relacionada con el error */}
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
  error: {
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
};

export default ErrorPago;
