import React from 'react'
import MyContext from '../my_context';
import { useContext } from "react";
import CardEntrenador from '../components/CardEntrenador'

export default function Home() {
  const { entrenadores } = useContext(MyContext);

  return (
    <div>
      <div className='div-card-entrenador'>
        <div className='div-card-entrenador-interno'>
          {
            entrenadores.map((entrenador, i) => (
              <CardEntrenador key={i} entrenador={entrenador} index={i} />
            ))
          }
        </div>
      </div>
    </div>
  )
}
