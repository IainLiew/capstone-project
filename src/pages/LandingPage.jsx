import { useContext } from "react";
import { getAuth } from "firebase/auth";
import { Container, Col, Nav } from "react-bootstrap";
import { useNavigate, Outlet } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import Header from "../components/Header";
import CardItem from "../components/CardItem";
//import useLocalStorage from "use-local-storage";


export default function LandingPage() {
    const auth = getAuth();
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    if (!currentUser) {
        navigate("/login");
    }

    const handleLogout = () => {
        auth.signOut();
    }

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
                <Outlet />
            </Container>
            <Col sm={12}>
                <Header />
                <CardItem />

            </Col>
        </>
    );
}