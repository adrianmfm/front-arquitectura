const apiUrl = 'http://localhost:3000'; 

export const obtenerDatosPersonales = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/datos-personales/${id}`);
    const datos = await response.json();
    return datos.datosPersonales;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    throw error;
  }
};

export const obtenerLatitudLongitudDesdeAPI = async () => {
  try {
    const response = await fetch(`${apiUrl}/estacionamientos`);
    const datos = await response.json();
    return datos;
  } catch (error) {
    console.error('Error al obtener estacionamientos:', error);
    throw error;
  }
};
export const obtenerDisponibilidadPlaza = async (idPlaza) => {
  try {
    const response = await fetch(`${apiUrl}/plaza/${idPlaza}/disponible`);
    const data = await response.json();
    return data.disponible;
  } catch (error) {
    console.error('Error al obtener disponibilidad de la plaza:', error);
    throw error;
  }
};

export const arrendarPlaza = async (idPlaza, idPersona) => {
  try {
    const response = await fetch(`${apiUrl}/plaza/${idPlaza}/arrendar/${idPersona}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ disponible: 0 }),
    });

    if (response.ok) {
      console.log('Plaza arrendada con éxito');
    } else {
      console.error('Error al arrendar la plaza');
    }
  } catch (error) {
    console.error('Error al arrendar la plaza:', error);
  }
};

export const obtenerTotalPlazasDisponibles = async () => {
  try {
    const response = await fetch(`${apiUrl}/contar-plazas`);
    const data = await response.json();
    console.log('Valor de total:', data.arriendos); // Agregado este console.log
    return data.arriendos;
  } catch (error) {
    console.error('Error al obtener el total de plazas disponibles:', error);
    throw error;
  }
};


export const obtenerInfoEstacionamiento = async (idPersona) => {
  try {
    const response = await fetch(`${apiUrl}/info-estacionamientos/${idPersona}`);
    const datos = await response.json();
    return datos;
  } catch (error) {
    console.error('Error al obtener la información del estacionamiento:', error);
    throw error;
  }
};

export const liberarPlaza = async (idPlaza) => {
  try {
    const response = await fetch(`${apiUrl}/liberar-plaza/${idPlaza}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Error al liberar la plaza');
    }
  } catch (error) {
    console.error('Error al liberar la plaza:', error);
    throw error;
  }
};