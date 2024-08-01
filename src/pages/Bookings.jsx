import { Col, Row, Container, Spinner, Nav, Navbar } from 'react-bootstrap';
import { getAuth } from 'firebase/auth';
import { AuthContext } from '../components/AuthProvider';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import BookingCardLayout from '../components/BookingCardLayout';
import { fetchBookingsByUser } from '../feature/posts/bookingsSlice';
import UserProfile from '../components/UserProfile';

export default function Bookings() {

    const auth = getAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useContext(AuthContext);
    const userId = currentUser?.uid;



    useEffect(() => {
        if (!userId) {
            navigate("/login");
        } else {
            dispatch(fetchBookingsByUser(userId));
        }

    }, [userId, dispatch, navigate]);

    const handleLogout = () => {
        auth.signOut().then(() => {
            navigate('/login');
        });
    }

    const bookings = useSelector((state) => state.bookings.bookings);
    const loading = useSelector((state) => state.bookings.loading);

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/home">Square One</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/landing">Home</Nav.Link>
                        <Nav.Link href="/bookings">Bookings</Nav.Link>
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Container>
                <Row className="p-3" style={{ borderTop: "1px solid #D3D3D3", borderBottom: "1px solid #D3D3D3" }} >
                    <Col sm={12}>
                        <h1>Your Profile</h1>
                        <UserProfile />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1>Your Bookings</h1>
                        {loading && (<Spinner animation='border' className='ms-3 mt-3' variant='primary' />)}
                        {!loading && bookings.length > 0 && bookings.map((booking) => (
                            <BookingCardLayout key={booking.id} booking={booking} />
                        ))}
                    </Col>
                </Row>

            </Container>
        </>
    );
}