import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import MyContext from '../my_context';

export default function EntrenadorDetalle() {
    const navigate = useNavigate();
    const { userId, idSolicitud, setIdSolicitud, token } = useContext(MyContext);

    const [entrenadorDetalles, setEntrenadorDetalles] = useState([{ img: '' }]);
    const { id } = useParams();

    
    const cargarDetalleEntrenador = async () => {
        const url = `https://back-jg-fitness.up.railway.app/servicios/?entrenador_id=${id}`;
        // const url = `http://localhost:3000/servicios/?entrenador_id=${id}`;
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
        const res = await fetch(url, options);
        const resultadoDetalleEntrenadores = await res.json();
        setEntrenadorDetalles(resultadoDetalleEntrenadores);
    };
    const validaSolicitudPrevia = () => {
        if (idSolicitud > 0) {
            return true;
        } else {
            return false;
        }
    }
    const solicitarPlan = async (idServicio, idEntrenadorServicio) => {
        if (validaSolicitudPrevia()) {
            alert('ya cuentas con una solicitud');
        } else {
            try {
                await guardarNuevaSolicitud(idServicio, idEntrenadorServicio);                
            } catch (error) {
                console.log(error);
            }
        }
    };
    const guardarNuevaSolicitud = async (idServicio, idEntrenadorServicio) => {
        const url = `https://back-jg-fitness.up.railway.app/usuarios/?usuario_id=${userId}&entrenadorservicio_id=${idEntrenadorServicio}`;
        // const url = `http://localhost:3000/usuarios/?usuario_id=${userId}&entrenadorservicio_id=${idEntrenadorServicio}`;
        const options = {
            method: "PUT",
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
        await fetch(url, options);
        setIdSolicitud(idServicio);
        alert('tu solicitud fue enviada correctamente');
        navigate('/mi-solicitud');
    };
    useEffect(() => {
        cargarDetalleEntrenador();
    }, [id]);

    return (
        <div className='vista-detalle'>
            <div><span className='detalle-titulo-entrenador'>{entrenadorDetalles[0].nombreentrenador}</span></div>
            <Card className='card-detalle-img'>
                <div className='detalle-entrenador-div-img'>
                    <Card.Img variant="top" src={entrenadorDetalles[0].img} style={{ width: '50%', height: '27rem' }} />
                </div>
                <div className='card-detalle'>
                    {
                        entrenadorDetalles.map((detalle, i) => (
                            <div key={i}>
                                <span className='span-card-detalle'>{detalle.nombre}</span><br />
                                <span className='span-card-detalle-descripcion'>{detalle.descripcion}</span><br />
                                <span className='span-card-detalle'>{detalle.precio}</span> / <span className='span-card-detalle'>{detalle.duracion}</span><br /><br />
                                <Button className='detalle-entrenador-btn' variant="info" onClick={() => solicitarPlan(detalle.idservicio, detalle.id)}>Solicitar</Button>{' '}
                            </div>
                        ))
                    }
                </div>
            </Card>
        </div>
    )
}
