import React, { useState, useEffect, useContext } from 'react';
import MyContext from '../my_context';

export default function MiSolicitud() {
  const { idSolicitud, token } = useContext(MyContext);
  const [servicio, setServicio] = useState({});
  let cargando = false;

  const host = window.location.protocol + '//' + window.location.host;
  // const url = `${host}/detalle-entrenadores.json`;
  const url = `https://back-jg-fitness.up.railway.app/servicio-segun-id-servicio/?servicio_id=${idSolicitud}`;
  const options = {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    },
    redirect: "follow",
    referrerPolicy: "no-referrer"
  };
  const cargarDetalleServicio = async () => {
    if (Number.isInteger(idSolicitud)) {
      try {
        const res = await fetch(url, options);
        if (res.status == 500) {
          const resultadoError = await res.json();
          alert('ocurrio un error al intentar obtener la información: ' + resultadoError);
        } else {
          const resultadoDetalleServicio = await res.json();
          setServicio(resultadoDetalleServicio);
        }
      } catch (error) {
        alert('ocurrio un error: ' + error.message);
      }
    }
  };

  useEffect(() => {
    cargarDetalleServicio();
  }, []);

  return (
    idSolicitud ?
      <div className='div-perfil'>
        <div className='div-perfil-interno'>
          <div>
            <span>Mi Solicitud:</span><br /><br />
            <span>{servicio.nombre}</span><br />
            <span className='span-card-detalle-descripcion'>{servicio.descripcion}</span><br />
            <span>$ {servicio.precio} / {servicio.duracion}</span>
          </div>
        </div>
      </div> : <div className='div-sin-solicitud'><span>NO TIENE SOLICITUDES PENDIENTES</span></div>
  )
}
