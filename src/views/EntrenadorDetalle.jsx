import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import MyContext from '../my_context';

export default function EntrenadorDetalle() {
    const navigate = useNavigate();
    const { idSolicitud, setIdSolicitud } = useContext(MyContext);

    const [entrenadorDetalles, setEntrenadorDetalles] = useState([{ img: '' }]);
    const { id } = useParams();

    const host = window.location.protocol + '//' + window.location.host;
    const url = `${host}/detalle-entrenadores.json`;
    const cargarDetalleEntrenador = async () => {
        const res = await fetch(url);
        const resultadoDetalleEntrenadores = await res.json();
        const detalleEncontrado = filtrarEntrenadorSegunId(resultadoDetalleEntrenadores);
        setEntrenadorDetalles(detalleEncontrado);
    };
    const filtrarEntrenadorSegunId = (resultadoDetalleEntrenadores) => resultadoDetalleEntrenadores.filter(entrenador => entrenador.idEntrenador === id);
    const validaSolicitudPrevia = () => {
        if (idSolicitud > 0) {
            return true;
        } else {
            return false;
        }
    }
    const solicitarPlan = async (idServicio) => {
        if (validaSolicitudPrevia()) {
            alert('ya cuentas con una solicitud');
        } else {
            setIdSolicitud(idServicio);
            navigate('/mi-solicitud');
        }
    };
    useEffect(() => {
        cargarDetalleEntrenador();
    }, [id]);

    return (
        <div className='vista-detalle'>
            <div><span className='detalle-titulo-entrenador'>{entrenadorDetalles[0].nombreEntrenador}</span></div>
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
                                <Button className='detalle-entrenador-btn' variant="info" onClick={() => solicitarPlan(detalle.idServicio)}>Solicitar</Button>{' '}
                            </div>
                        ))
                    }
                </div>
            </Card>
        </div>
    )
}
