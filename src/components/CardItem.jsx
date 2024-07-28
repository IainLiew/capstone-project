import item1 from '../components/images/item1.png'
import item2 from '../components/images/item2.png'
import item3 from '../components/images/item3.png'
import { Button, Col, Row, Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import NewBookingModal from './NewBookingModal';

export default function CardItem() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Container className='mt-5 mx-5'>
            <Row>
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={item1} />
                        <Card.Body>
                            <Card.Title>Personal Coaching</Card.Title>
                            <Card.Text>
                                Improve your ball skills, agility and coordination with tailored drills.
                            </Card.Text>
                            <Button variant="primary" onClick={handleShow}> Book Now</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={item2} />
                        <Card.Body>
                            <Card.Title>Strength & Conditioning</Card.Title>
                            <Card.Text>
                                Train like a professional athlete. Learn how to be more explosive in your movements.
                            </Card.Text>
                            <Button variant="primary" onClick={handleShow}> Book Now</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={item3} />
                        <Card.Body>
                            <Card.Title>Multipurpose Courts</Card.Title>
                            <Card.Text>
                                Book a court for your own personal coaching use or for futsal games.
                            </Card.Text>
                            <Button variant="primary" onClick={handleShow}> Book Now</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <NewBookingModal show={show} handleclose={handleClose} />
        </Container>
    );
}