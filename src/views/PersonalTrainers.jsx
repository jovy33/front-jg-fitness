import { useEffect, useState, useContext } from "react";
import CardEntrenador from '../components/CardEntrenador'
import MyContext from '../my_context';

export default function Home() {
  const { token } = useContext(MyContext);
  const [entrenadores, setEntrenadores] = useState([]);

  const url = `https://back-jg-fitness.up.railway.app/entrenadores`;
  // const url = `http://localhost:3000/entrenadores`;
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
  const traerEntrenadores = async () => {
    if (typeof token === 'string') {
      alert(token);
      const res = await fetch(url, options);
      const resultadoEntrenadores = await res.json();
      setEntrenadores(resultadoEntrenadores);
    }
  }

  useEffect(() => {
    traerEntrenadores();
  }, [token]);

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
