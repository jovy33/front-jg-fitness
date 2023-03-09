import React, { useContext, useEffect } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import MyContext from '../my_context';

export default function NavbarPropio() {

	const { setIsLogged, isLogged, setIdSolicitud } = useContext(MyContext);

	const navigate = useNavigate();
	const salir = async () => {
		setIdSolicitud(0);
		setIsLogged(false);
		navigate('/');
	};
	const validarIraHome = () => {
		if (!isLogged) {
			navigate('/');
		}
	};

	useEffect(() => {
		validarIraHome();
	}, []);

	return (
		<Navbar bg="info" variant="dark" className='navBarPropio'>
			<Container>
				<Navbar.Brand>
					<NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} end to="/">
						<img width="50" src="/logo2.png" alt="" />
					</NavLink>
				</Navbar.Brand>

				{!isLogged &&
					<Navbar.Collapse className="justify-content-end navbar-propio-menu">
						<NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} end to="/registrarse">
							<span className='navbar-titulo'> Registrarse </span>
						</NavLink>
						<NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} end to="/login">
							<span className='navbar-titulo'> Iniciar Sesión </span>
						</NavLink>
					</Navbar.Collapse>
				}

				{isLogged &&
					<Navbar.Collapse className="justify-content-end navbar-propio-menu">
						<NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} end to="/personal-trainers">
							<span className='navbar-titulo'> Entrenadores </span>
						</NavLink>
						<NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} end to="/perfil">
							<span className='navbar-titulo'> Mi Perfil </span>
						</NavLink>
						<NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} end to="/" onClick={() => salir()}>
							<span className='navbar-titulo'> Salir </span>
						</NavLink>
					</Navbar.Collapse>
				}

			</Container>
		</Navbar>
	)
}
