import { Container, Row, Col, Button, Stack } from 'react-bootstrap';
import "./Landing.css"; 
import { Link } from "react-router-dom";
import NavBar from "../NavBar/Navbar";

{/* reviews for review ticker */}
const reviews = [
  " 'Money Mentor makes it easy to see where my money goes each month.' - Sarah S. ",
  " 'Tracking expenses helped me feel more in control of my finances.' - Angelika ",
  " 'The points and progress levels make saving feel motivating.' - Gabriel R. ",
];

const ReviewTicker = () => {
  return (
    <div className="testimonials-container">
      <div className="testimonials-ticker-track">
        {/* Render the list twice for the infinite loop effect */}
        {reviews.map((review, index) => (
          <span key={`first-${index}`} className="testimonials-review-item">{review}</span>
        ))}
        {reviews.map((review, index) => (
          <span key={`dup-${index}`} className="testimonials-review-item">{review}</span>
        ))}
      </div>
    </div>
  );
};

const Landing = () => {
  return (
    <div className="landing-page-wrapper">
      <Container className="landing-container py-5 mt-md-5">
        <Row className='align-items-center g-5'>

        {/* left side */}  
        <Col lg={6} md={12} className="order-2 order-lg-1 text-center text-lg-start">
          <img 
            src="src/assets/mm-landing.svg" 
            alt="Money Mentor" 
            className="money-mentor-img mb-4 mx-auto mx-lg-0"
            style={{ maxWidth: '300px'}} 
          />
          <div className="landing-app-details mb-5">
            <h1 className='display-4 fw-bold mb-3'>Track your money. <br />  Build better habits.</h1>
            <p className='lead text-muted mb-4'>
              A simple way to track income, expenses, and savings while earning points and motivation.
            </p>
            <ul className='list-unstyled'>
              <li className='mb-2'>✅ Add transactions in seconds.</li>
              <li className='mb-2'>✅ See monthly totals at a glance.</li>
              <li className='mb-2'>✅ Stay motivated as you reach your goals.</li>
            </ul>
          </div>
          
          <div className="call-to-action">
            <Stack direction='vertical' gap={3} className='justify-content-center justify-content-lg-start align-items-center'>
              <Link className="primary-btn" to="/sign-up">
                <button>Get Started</button>
              </Link>
              <div className='text-muted'>
                <p>Already have an account? <a className='landing-link' href="/sign-in">Sign in</a></p> 
              </div>
            </Stack>
          </div>
        </Col>

        {/* RIGHT SIDE */}
        <Col lg={6} md={12} className="order-1 order-lg-2 text-center">
          <img 
            src="src/assets/landing-right.svg" 
            alt="App at a glance view" 
            className='img-fluid landing-hero-img mb-4 mb-lg-0' 
          />
        </Col>
        </Row>
      </Container>
      <ReviewTicker />
    </div>
  );
};

export default Landing;