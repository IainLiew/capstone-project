import { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateBooking } from "../feature/posts/bookingsSlice";

export default function UpdateBookingModal({ show, handleClose, id, date, time, service, userId }) {
    const [newBookingService, setNewBookingService] = useState(service || '');
    const [newBookingDate, setNewBookingDate] = useState(date || '');
    const [newBookingTime, setNewBookingTime] = useState(time || '');
    const dispatch = useDispatch();

    useEffect(() => {
        setNewBookingService(service || '');
        setNewBookingDate(date || '');
        setNewBookingTime(time || '');
    }, [service, date, time]);

    const handleUpdate = () => {
        handleClose();
        dispatch(updateBooking({ id, newBookingService, newBookingDate, newBookingTime, userId }));
        setNewBookingService(service || '');
        setNewBookingDate(date || '');
        setNewBookingTime(time || '');

    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Title>Update Booking</Modal.Title>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="service">
                            <Form.Label>Service</Form.Label>
                            <Form.Select aria-label="Select" value={newBookingService} onChange={(e) => setNewBookingService(e.target.value)}>
                                <option value="Personal Coaching">Personal Coaching</option>
                                <option value="Strength & Conditioning">Strength & Conditioning</option>
                                <option value="Multipurpose Court">Multipurpose Court</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="datetime">
                            <Form.Label>Date</Form.Label>
                            <Form.Control placeholder="select date" type="date" value={newBookingDate} onChange={(e) => setNewBookingDate(e.target.value)} />
                            <Form.Label>Time</Form.Label>
                            <Form.Control placeholder="select time" type="time" value={newBookingTime} onChange={(e) => setNewBookingTime(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="rounded-pil" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" className="rounded-pil" onClick={handleUpdate}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
