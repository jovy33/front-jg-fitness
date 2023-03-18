import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from "react";
import MyContext from '../my_context';

export default function Perfil() {

  const { registroUsuario, setRegistroUsuario, setIdSolicitud } = useContext(MyContext);
  const { token } = useContext(MyContext);

  const navigate = useNavigate();
  const irAMiSolicitud = async () => {
    navigate('/mi-solicitud/');
  };

  const url = `https://back-jg-fitness.up.railway.app/usuarios`;
  // const url = `http://localhost:3000/usuarios`;
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
  const cargarPerfil = async () => {
      const res = await fetch(url, options);
      const resultadoPerfil = await res.json();
      setRegistroUsuario(resultadoPerfil);
      // setIdSolicitud(resultadoPerfil.servicio_id);
  };

  useEffect(() => {
    cargarPerfil();
  }, []);

  return (
    <div className='div-perfil'>
      <div className='div-perfil-interno'>
        <div className='div-perfil-detalle'>
          <span className='span-perfil'>Nombre</span><span>: {registroUsuario.nombre}</span><br />
          <span className='span-perfil'>Apellido</span><span>: {registroUsuario.apellido}</span><br />
          <span className='span-perfil'>Sexo</span><span>: {registroUsuario.sexo}</span><br /><br />
          <a href="#" onClick={() => irAMiSolicitud()}>ir a mi solicitud</a>
        </div>
      </div>
    </div>
  )
}
