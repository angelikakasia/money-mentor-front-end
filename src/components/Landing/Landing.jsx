import "../../App.css";
import { Link } from "react-router-dom";
import "./Landing.css";
import { Container, Row, Col, Button } from "react-bootstrap";

import moneyMentorImg from "../../assets/Money Mentor landing.svg";
import landingHeroImg from "../../assets/right.svg";

{
  /* reviews for review ticker */
}
const reviews = [
  " 'Money Mentor makes it easy to see where my money goes each month.' - Sarah S. ",
  " 'Tracking expenses helped me feel more in control of my finances.' - Angelika ",
  " 'The points and progress levels make saving feel motivating.' - Gabriel R. ",
];

const ReviewTicker = () => {
  return (
    <div className="testimonials-container">
      <div className="ticker-track">
        {/* Render the list twice for the infinite loop effect */}
        {reviews.map((review, index) => (
          <span key={`first-${index}`} className="review-item">
            {review}
          </span>
        ))}
        {reviews.map((review, index) => (
          <span key={`dup-${index}`} className="review-item">
            {review}
          </span>
        ))}
      </div>
    </div>
  );
};

const Landing = () => {
  return (
    <div className="landing-page-wrapper">
      <Container className="py-5">
        <Row className="align-items-center g-4">
          {/* Left */}
          <Col xs={12} lg={6}>
            <div className="text-center text-lg-start">
              <img
                src={moneyMentorImg}
                alt="Money Mentor"
                className="landing-logo-img mb-4"
              />

              <h1 className="display-5 fw-bold">
                Track your money.
                <br />
                Build better habits.
              </h1>

              <p className="lead text-muted mt-3">
                A simple way to track income, expenses, and savings while
                earning points and motivation.
              </p>

              <ul className="list-unstyled mt-4 mb-4 d-none d-lg-block">
                <li className="mb-2">✅ Add transactions in seconds.</li>
                <li className="mb-2">✅ See monthly totals at a glance.</li>
                <li className="mb-2">
                  ✅ Stay motivated as you reach your goals.
                </li>
              </ul>

              <Row className="justify-content-start">
                <Col xs={12} lg={6}>
                  <Button
                    as={Link}
                    to="/sign-up"
                    className="btn-moneymentor w-100"
                    type="button"
                  >
                    Get Started
                  </Button>
                </Col>
              </Row>

              <p className="text-muted mt-3 mb-0">
                Already have an account?{" "}
                <Link
                  to="/sign-in"
                  className="text-success fw-semibold text-decoration-none"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </Col>

          {/* Right */}
          <Col xs={12} lg={6}>
            <div className="text-center">
              <img
                src={landingHeroImg}
                alt="App at a glance view"
                className="landing-hero-img img-fluid"
              />
            </div>
          </Col>
        </Row>
      </Container>
      <ReviewTicker />
    </div>
  );
};

export default Landing;
