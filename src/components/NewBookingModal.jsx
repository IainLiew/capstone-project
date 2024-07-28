import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { saveBooking } from "../feature/posts/bookingsSlice";





export default function NewBookingModal({ show, handleclose }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [service, setService] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const dispatch = useDispatch();

    const handleSave = () => {
        dispatch(saveBooking({ name, email, phone, service, date, time }));
        handleclose();
        setName("");
        setEmail("");
        setPhone("");
        setService("");
        setDate("");
        setTime("");
    };

    return (
        <>
            <Modal show={show} onHide={handleclose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="bookingformname">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="phonenumber">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control placeholder="+60" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="service">
                            <Form.Label>Service</Form.Label>
                            <Form.Select aria-label="Select" value={service} onChange={(e) => setService(e.target.value)}>
                                <option value="Personal Coaching">Personal Coaching</option>
                                <option value="Strength & Conditioning">Strength & Conditioning</option>
                                <option value="Multipurpose Court">Multipurpose Court</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="datetime">
                            <Form.Label>Date</Form.Label>
                            <Form.Control placeholder="select date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                            <Form.Label>Time</Form.Label>
                            <Form.Control placeholder="select time" type="time" value={time} onChange={(e) => setTime(e.target.value)} >
                            </Form.Control>

                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className="rounded-pil" onClick={handleSave}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}