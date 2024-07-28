import { Col, Row, Button, Container } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteBooking } from '../feature/posts/bookingsSlice';
import UpdateBookingModal from './UpdateBookingModal';

export default function BookingCardLayout({ booking }) {
    const { id, service, date, time } = booking;
    const [show, setShow] = useState(false);

    const dispatch = useDispatch();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDelete = () => dispatch(deleteBooking(id));


    return (
        <Container>
            <Row className='p-3' style={{ borderTop: "1px solid #D3D3D3", borderBottom: "1px solid #D3D3D3" }} >
                <Col sm={6}>
                    <div>Service: {service}</div>
                    <div>Date: {date}</div>
                    <div>Time: {time}</div>
                    <Button variant='warning' onClick={handleShow}>Edit</Button>
                    <Button variant='danger' onClick={handleDelete}>Delete</Button>
                </Col>
            </Row>
            <UpdateBookingModal
                show={show}
                handleClose={handleClose}
                id={id}
                date={date}
                time={time}
                service={service}
            />
        </Container>
    );
}
