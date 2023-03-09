import React from 'react'
import { useNavigate } from 'react-router-dom';
import MyContext from '../my_context';
import { useContext } from "react";

export default function Perfil() {

  const { registroUsuario } = useContext(MyContext);

  const navigate = useNavigate();
  const irAMiSolicitud = async () => {
    navigate('/mi-solicitud/');
  };

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
