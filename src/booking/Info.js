import React, { useState, useEffect } from "react";
import { obtenerInfoEstacionamiento, pagarArriendo } from "../services/api";
import Swal from "sweetalert2";

const Informacion = () => {
  const [infoEstacionamiento, setInfoEstacionamiento] = useState(null);

  useEffect(() => {
    const obtenerInfo = async () => {
      try {
        const login = JSON.parse(sessionStorage.getItem('login'));
        const data = await obtenerInfoEstacionamiento(login.user.id);
        setInfoEstacionamiento(data);
      } catch (error) {
        console.error(
          "Error al obtener la información del estacionamiento:",
          error
        );
      }
    };

    obtenerInfo();
  }, []);

  const finalizarArriendo = (idPlaza, horaLlegada, tarifa, idArriendo) => {
    const ahora = new Date();
    const horaActual = ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
    const fechaHoraLlegada = new Date(`01/01/2023 ${horaLlegada}`);
    const fechaHoraActual = new Date(`01/01/2023 ${horaActual}`);
  
    let diffMilisegundos = fechaHoraActual - fechaHoraLlegada;
  
    if (diffMilisegundos < 0) {
      diffMilisegundos += 24 * 60 * 60 * 1000;
      console.log(diffMilisegundos)
    }
  
    const diffHoras = diffMilisegundos / (1000 * 60 );
    const tarifaTotal = diffHoras * tarifa;
    
  
    Swal.fire({
      title: 'Confirmar pago y finalización',
      html: `Hora de llegada: ${horaLlegada}<br>Hora de finalización: ${horaActual}<br>Precio: ${tarifaTotal.toFixed(0)}`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar pago y finalización'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // const result = await setFinalTime(idArriendo, horaActual);
          // console.log(idPlaza)
          // const libera = await liberarPlaza(idPlaza, tarifaTotal)
          const respuestaPagarArriendo = await pagarArriendo(idPlaza, tarifaTotal, idArriendo, horaActual)

          const form = document.getElementById("frmWebpay");
          form.action = respuestaPagarArriendo.urlWebpay
          document.getElementById("tokenwebpay").value = respuestaPagarArriendo.tokenWebpay
          form.submit();
          // if (result){
          //   console.log('si')
          // }

          // Swal.fire(
          //   'Pago realizado',
          //   'El pago ha sido confirmado con éxito.',
          //   'success'
          // ).then(() => {
          //   window.location.reload();
          // });
        } catch (error) {
          console.error('Error al realizar el pago:', error);
          Swal.fire(
            'Error',
            'Hubo un problema al realizar el pago. Por favor, inténtalo de nuevo.',
            'error'
          );
        }
      }
    });
  };
  
  return (
    <div className="container mt-4">
      <h2>Mis reservas</h2>
      <div className="row">
        {infoEstacionamiento &&
          infoEstacionamiento.length > 0 &&
          infoEstacionamiento.map((estacionamiento, index) => {
            const { idPlaza, horaLLegada, tarifa, idArriendo } = estacionamiento
            return (
              <div key={index} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{estacionamiento.direccion}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {estacionamiento.descripcion}
                    </h6>
                    <p className="card-text">Precio: {estacionamiento.tarifa}</p>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => finalizarArriendo(idPlaza, horaLLegada, tarifa, idArriendo)}
                    >
                      Finalizar arriendo
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        {(!infoEstacionamiento || infoEstacionamiento.length === 0) && (
          <div className="col">
            <p>No tienes reservas activas</p>
          </div>
        )}
      </div>

      <form method="POST" id="frmWebpay">
        <input type="hidden" name="token_ws" id="tokenwebpay" />
      </form>
    </div>
  );
};

export default Informacion;
