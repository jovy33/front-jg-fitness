import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import MyContext from '../my_context';

export default function Login() {

    const { setIsLogged, registroUsuario } = useContext(MyContext);
    const [user, setUser] = useState({});

    const navigate = useNavigate();
    const irListadoPersonalTrainers = async () => {
        navigate('/personal-trainers');
    };
    const esValidoCampos = () => {
        if (
            user.email && user.email.length > 0 &&
            user.clave && user.clave.length > 0
        ) {
            return true;
        } else {
            return false;
        }
    }
    const esValidoUsuario = () => {
        if (
            registroUsuario.email === user.email &&
            registroUsuario.clave === user.clave
        ) {
            return true;
        } else {
            return false;
        }
    };
    const validarLogin = (e) => {
        if (!esValidoCampos()) {
            alert('debe ingresar todos los campos');
        } else if (!esValidoUsuario()) {
            alert('usuario no registrado');
        } else {
            console.log(user);
            console.log(registroUsuario);
            setIsLogged(true);
            irListadoPersonalTrainers();
        }
        e.preventDefault();
    };

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
                            setUser({ ...user, ["clave"]: target.value })
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
