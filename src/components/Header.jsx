import Carousel from 'react-bootstrap/Carousel';
import carousel1 from '../components/images/carousel1.png';
import carousel2 from '../components/images/carousel2.png';
import carousel3 from '../components/images/carousel3.png';
import { Image } from 'react-bootstrap';
import { Container } from 'react-bootstrap';


export default function Header() {
    return (
        <>
            <Container>
                <Carousel>
                    <Carousel.Item>
                        <Image src={carousel1} fluid alt="First slide" />
                        <Carousel.Caption>
                            <h3>Personal Coaching</h3>
                            <p>Get personalised coaching to elevate your game to the next level.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image src={carousel2} alt="Second slide" />
                        <Carousel.Caption>
                            <h3>Strength & Conditioning</h3>
                            <p>Train like a professional athlete.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image src={carousel3} alt="Third slide" />
                        <Carousel.Caption>
                            <h3>Multi-purpose Courts</h3>
                            <p>
                                Use our courts for your own personal coaching, or a game of futsal.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Container>

        </>
    );
}