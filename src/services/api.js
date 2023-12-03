const apiUrl = 'http://localhost:8080'; 

const config = () => ({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('token'),
  }
})

export const obtenerDatosPersonales = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/persona/info`);
    const datos = await response.json();
    return datos.datosPersonales;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    throw error;
  }
};

export const obtenerLatitudLongitudDesdeAPI = async (idPersona) => {
  try {
    const response = await fetch(`${apiUrl}/estacionamientos`, {...config(), method: 'POST', body: JSON.stringify({  idPersona }),});
    const datos = await response.json();
    return datos;
  } catch (error) {
    console.error('Error al obtener estacionamientos:', error);
    throw error;
  }
};
export const obtenerDisponibilidadPlaza = async (idPlaza) => {
  try {
    const response = await fetch(`${apiUrl}/plaza/${idPlaza}/disponible`, config());
    const data = await response.json();
    return data.disponible;
  } catch (error) {
    console.error('Error al obtener disponibilidad de la plaza:', error);
    throw error;
  }
};

export const arrendarPlaza = async (idPlaza, idPersona, fechaHoraLlegada) => {
  try {
    const response = await fetch(`${apiUrl}/arrendar`, {
      ...config(),
      method: 'POST',
      body: JSON.stringify({ idPlaza, idPersona, fechaHoraLlegada}),
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

export const obtenerTotalPlazasDisponibles = async (idPersona) => {
  try {
    const response = await fetch(`${apiUrl}/contar-plazas`,{
    ...config(),
    method: 'POST',
    body: JSON.stringify({  idPersona }),
  })
    const data = await response.json();
    return data.cantidadPlazas;
  } catch (error) {
    console.error('Error al obtener el total de plazas disponibles:', error);
    throw error;
  }
};


export const obtenerInfoEstacionamiento = async (idPersona) => {
  try {
    const response = await fetch(`${apiUrl}/info/estacionamientos`, {
      ...config(),
      method: 'POST',
      body: JSON.stringify({ idPersona }),
    });
    
    if (!response.ok) {
      throw new Error('Error al obtener la información del estacionamiento');
    }

    const datos = await response.json();
    console.log('datos', datos)
    return datos.infoEstacionamiento;
  } catch (error) {
    console.error('Error al obtener la información del estacionamiento:', error);
    throw error;
  }
};


export const setFinalTime = async (idArriendo, horaSalida) => {
  try {
    const response = await fetch(`${apiUrl}/finalizar/arriendo`, {
      ...config(),
      method: 'POST',
      body: JSON.stringify({ idArriendo, horaSalida}),
    });
    console.log('aqui', response)
    if (!response.ok) {
      return false
    }

    else return true 
  } catch (error) {
    console.error('Error al obtener la información del estacionamiento:', error);
    throw error;
  }
};


export const liberarPlaza = async (idPlaza, monto) => {
  try {
    const response = await fetch(`${apiUrl}/liberar/plaza`, {
      ...config(),
      method: 'POST',
      body: JSON.stringify({ idPlaza, monto }),
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


export const pagarArriendo = async (idPlaza, monto, idArriendo, horaSalida) => {
  try {
    const response = await fetch(`${apiUrl}/arriendo/pagar`, {
      ...config(),
      method: 'POST',
      body: JSON.stringify({ idPlaza, monto, idArriendo, horaSalida }),
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

export const login = async (email, password) => {
  try {
    const response = await fetch("http://localhost:8080/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Error al iniciar sesión');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

export const getPersonaByEmail = async (email) => {
  try {
    const response = await fetch(`${apiUrl}/persona/info`, {
      ...config(),
      method: 'POST',
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.datosPersonales;
    } else {
      console.error('Error al obtener el id de usuario por email');
    }
  } catch (error) {
    console.error('Error al obtener el id de usuario por email:', error);
  }
};