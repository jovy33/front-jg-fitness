import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function CardEntrenador(props) {
    const { entrenador } = props;
    const { id, nombre, img } = entrenador;
    const navigate = useNavigate();
    const irDetalleEntrenador = async () => {
        navigate(`/entrenador-detalle/${id}`);
    };

    return (
        <div>
            <Card className='div-card-personal-trainer' style={{ width: '17rem' }}>
                <Card.Img variant="top" src={img} style={{ width: '100%', height: '22rem' }} />
                <Card.Body>
                    <Card.Title> {nombre} </Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item className='listgroup-item-cardentrenador'>
                        <div className='botones-card'>
                            <Button className='btn-card' variant="info" onClick={() => irDetalleEntrenador()}>ver</Button>{' '}
                        </div>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    )
}

