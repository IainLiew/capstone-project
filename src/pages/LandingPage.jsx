import { useContext, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { Container, Col, Nav, Navbar } from "react-bootstrap";
import { useNavigate, Outlet } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import Header from "../components/Header";
import CardItem from "../components/CardItem";
import GoogleMap from "../components/GoogleMap";


export default function LandingPage() {
    const auth = getAuth();
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser, navigate]);

    const handleLogout = () => {
        auth.signOut();
    }

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
                    <Outlet />
                </Container>
            </Navbar>
            <Col sm={12}>
                <Header />
                <CardItem />
            </Col>
            <GoogleMap />
        </>
    );
}