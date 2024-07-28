import { Col, Row, Container, Spinner, Nav } from 'react-bootstrap';
import { getAuth } from 'firebase/auth';
import { AuthContext } from '../components/AuthProvider';
//import { jwtDecode } from 'jwt-decode';
//import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
//import useLocalStorage from 'use-local-storage';
//import { fetchBookingsByUser } from '../feature/posts/bookingsSlice';
import BookingCardLayout from '../components/BookingCardLayout';
import { fetchBookingsByUser } from '../feature/posts/bookingsSlice';

export default function Bookings() {

    const auth = getAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useContext(AuthContext);
    const userId = currentUser.uid;


    useEffect(() => {
        if (!userId) {
            navigate("/login");
        } else {
            dispatch(fetchBookingsByUser(userId));
        }

    }, [userId, dispatch, navigate]);

    const handleLogout = () => {
        auth.signOut();
    }

    const bookings = useSelector((state) => state.bookings.bookings);
    const loading = useSelector((state) => state.bookings.loading);


    // const [authToken, setAuthToken] = useLocalStorage("authToken", "");
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (!authToken) {
    //         navigate("/login");
    //     }
    // }, [authToken, navigate]);

    // const handleLogout = () => {
    //     setAuthToken("");
    // };

    // const bookings = useSelector((state) => state.bookings.bookings);
    // const loading = useSelector((state) => state.bookings.loading);
    //const dispatch = useDispatch();

    // useEffect(() => {
    //     const token = localStorage.getItem("authToken");
    //     if (token) {
    //         const decodedToken = jwtDecode(token);
    //         const userId = decodedToken.id;
    //         dispatch(fetchBookingsByUser(userId));
    //     }
    // }, [dispatch]);

    return (
        <>
            <Container>
                <Nav className="justify-content-center" activeKey="/home">
                    <Nav.Item>
                        <Nav.Link href="/landing">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/bookings">Bookings</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
            <Container>
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