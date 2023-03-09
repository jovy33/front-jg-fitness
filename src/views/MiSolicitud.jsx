import React, { useState, useEffect, useContext } from 'react';
import MyContext from '../my_context';

export default function MiSolicitud() {
  const { idSolicitud } = useContext(MyContext);
  const [servicio, setServicio] = useState({});

  const host = window.location.protocol + '//' + window.location.host;
  const url = `${host}/detalle-entrenadores.json`;
  const cargarDetalleServicio = async () => {
    const res = await fetch(url);
    const resultadoDetalleServicio = await res.json();
    const detalleEncontrado = filtrarServicioSegunId(resultadoDetalleServicio);
    setServicio(detalleEncontrado);
    console.log(servicio);
  };
  const filtrarServicioSegunId = (resultadoDetalleEntrenadores) => resultadoDetalleEntrenadores.filter(entrenador => entrenador.idServicio === idSolicitud)[0];

  useEffect(() => {
    cargarDetalleServicio();
  }, [idSolicitud]);

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
