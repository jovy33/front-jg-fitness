import React, { useContext, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import MyContext from '../my_context';

export default function Login() {

    const { setIsLogged, registroUsuario, token, setToken } = useContext(MyContext);
    const [user, setUser] = useState({});

    const navigate = useNavigate();
    const irListadoPersonalTrainers = async () => {
        navigate('/personal-trainers');
    };
    const esValidoCampos = () => {
        if (
            user.email && user.email.length > 0 &&
            user.password && user.password.length > 0
        ) {
            return true;
        } else {
            return false;
        }
    }
    const validarLogin = async (e) => {
        if (!esValidoCampos()) {
            alert('debe ingresar todos los campos');
        } else if (await !loginBackend()) {
            setIsLogged(false);
            alert('usuario no registrado');            
        } else {
            setIsLogged(true);
            alert('oka');
            irListadoPersonalTrainers();
        }
        e.preventDefault();
    };

    const url = `https://back-jg-fitness.up.railway.app/login`;
    // const url = `http://localhost:3000/login`;
    const options = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(user)
    };
    const loginBackend = async () => {
        try {
            const res = await fetch(url, options);
            const resultadoLoginBackendToken = await res.text();
            setToken(resultadoLoginBackendToken);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    return (
        <div className='div-container-login'>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control
                        onChange={({ target }) =>
                            setUser({ ...user, ["email"]: target.value })
                        }
                        type="email" placeholder="correo@gmail.com" />
                    <Form.Text className="text-muted">

                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Clave</Form.Label>
                    <Form.Control
                        onChange={({ target }) =>
                            setUser({ ...user, ["password"]: target.value })
                        }
                        type="password" placeholder="ingresar clave" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={(e) => validarLogin(e)}>
                    Ingresar
                </Button>
            </Form>
        </div>
    )
}
