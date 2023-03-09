import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyContext from './my_context';
import Login from "./components/Login";
import NavbarPropio from "./components/NavbarPropio";
import Registrarse from "./components/Registrarse";
import Home from "./views/Home";
import EntrenadorDetalle from "./views/EntrenadorDetalle";
import PersonalTrainers from "./views/PersonalTrainers";
import Perfil from "./views/Perfil";
import MiSolicitud from "./views/MiSolicitud";


function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [idSolicitud, setIdSolicitud] = useState(0);
  const [entrenadores, setEntrenadores] = useState([]);
  const [registroUsuario, setRegistroUsuario] = useState({});

  const host = window.location.protocol + '//' + window.location.host;
  const url = `${host}/entrenadores.json`;
  const traerEntrenadores = async () => {
    const res = await fetch(url);
    const resultadoEntrenadores = await res.json();
    setEntrenadores(resultadoEntrenadores);
  }

  useEffect(() => {
    traerEntrenadores();
  }, []);

  const sharedEntrenadores = {
    isLogged, setIsLogged,
    entrenadores, setEntrenadores,
    registroUsuario, setRegistroUsuario,
    idSolicitud, setIdSolicitud
  };

  return (
    <>
      <MyContext.Provider value={sharedEntrenadores}>
        <BrowserRouter>
          <NavbarPropio />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/registrarse" element={<Registrarse />} />
            <Route path="/mi-solicitud" element={<MiSolicitud />} />
            <Route path="/entrenador-detalle/:id" element={<EntrenadorDetalle />} />
            <Route path="/personal-trainers" element={<PersonalTrainers />} />

          </Routes>

        </BrowserRouter>
      </MyContext.Provider>

    </>
  );
}

export default App;
