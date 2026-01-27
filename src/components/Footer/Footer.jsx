import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className='footer'>
            <div className='footer-content'>
                <div className='footer-left'>
                    <img className='footer-logo' src="src/assets/Money Mentor landing.svg" alt="money-mentor-logo" />
                    <h4>Money Mentor</h4>
                    <p>Smart tracking for smarter savings.</p>
                </div>
            
            <div className='footer-right'>
                <div className='footer-links'>
                    <a href="https://github.com/angelikakasia/money-mentor-front-end" target="_blank">GitHub</a>
                    <a href="/about">About</a>
                    <a href="/privacy">Privacy</a>
                    <a href="/contact">Support</a>
                </div>
                <div className='footer-devs'>
                    <p>&copy; {currentYear} Money Mentor. All rights reserved.</p>
                    <p>Made with 💚 by Gabriel, Angelika & Sarah.</p>
                </div>                
            </div>
        </div>
        </footer>
    );
};

export default Footer;