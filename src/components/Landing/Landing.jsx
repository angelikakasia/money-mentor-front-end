import "../../App.css"; 
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
      <div className="ticker-track">
        {/* Render the list twice for the infinite loop effect */}
        {reviews.map((review, index) => (
          <span key={`first-${index}`} className="review-item">{review}</span>
        ))}
        {reviews.map((review, index) => (
          <span key={`dup-${index}`} className="review-item">{review}</span>
        ))}
      </div>
    </div>
  );
};

const Landing = () => {
  return (
    <div className="auth-page">
      <header className="auth-header">
        <div className="brand">Money Mentor</div>
      </header>

      <main className="landing-container">
        <section className="landing-left">
          <div className="landing-app-details">
            <h1>Track your money. <br />  Build better habits.</h1>
            <h2>A simple way to track income, expenses, and savings while earning points and motivation.</h2>
            <h3>Add transactions in seconds.</h3>
            <h3>See monthly totals at a glance.</h3>
            <h3>Stay motivated as you reach your goals.</h3>
          </div>
          
          <div className="call-to-action">
            <Link className="primary-btn" to="/sign-up">
              <button>Get Started</button>
            </Link>
            <p>Already have an account? <a href="/sign-in">Sign in</a></p> 
          </div>
        </section>
        <section className="landing-right">
          <img 
            src="src/assets/landingpageview.svg" 
            alt="App at a glance view" 
            className='landing-hero-img' 
          />
        </section>
      </main>
      <ReviewTicker />
    </div>
  );
};

export default Landing;