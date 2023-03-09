import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import MyContext from '../my_context';

export default function Registrarse() {
    const { setRegistroUsuario } = useContext(MyContext);

    const [user, setUser] = useState({});

    const navigate = useNavigate();
    const irALogin = async () => {
        navigate('/login');
    };

    const esValido = () => {
        if (
            user.nombre && user.nombre.length > 0 &&
            user.apellido && user.apellido.length > 0 &&
            user.sexo && user.sexo.length > 0 &&
            user.email && user.email.length > 0 &&
            user.clave && user.clave.length > 0
        ) {
            return true;
        } else {
            return false;
        }
    }

    const registrarUsuario = (e) => {
        if (!esValido()) {
            alert('debe ingresar todos los campos');
        } else {
            setRegistroUsuario(user);
            console.log(user);
            alert('usuario registrado con éxito');
            irALogin();
        }
        e.preventDefault();
    }

    return (
        <div className='div-container-login'>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        onChange={({ target }) =>
                            setUser({ ...user, ["nombre"]: target.value })
                        }
                        type="text" placeholder="ingresar nombre" />
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicApellido">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                        onChange={({ target }) =>
                            setUser({ ...user, ["apellido"]: target.value })
                        }
                        type="text" placeholder="ingresar apellido" />
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicSexo">
                    <span>Sexo</span><br />
                    <Form.Check
                        className='label-checkbox-sexo'
                        inline
                        label="Femenino"
                        name="group1"
                        type="radio"
                        value="Femenino"
                        onChange={({ target }) =>
                            setUser({ ...user, ["sexo"]: target.value })
                        }
                        id={"radio-1"}
                    />
                    <Form.Check
                        inline
                        label="Masculino"
                        name="group1"
                        type="radio"
                        value="Masculino"
                        onChange={({ target }) =>
                            setUser({ ...user, ["sexo"]: target.value })
                        }
                        id={"radio-2"}
                    />
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group className="mb-3 label-clave" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        onChange={({ target }) =>
                            setUser({ ...user, ["email"]: target.value })
                        }
                        type="mail" placeholder="ingresar email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Clave</Form.Label>
                    <Form.Control
                        onChange={({ target }) =>
                            setUser({ ...user, ["clave"]: target.value })
                        }
                        type="password" placeholder="ingresar clave" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={(e) => registrarUsuario(e)}>
                    Registrar
                </Button>
            </Form>
        </div>
    )
}
