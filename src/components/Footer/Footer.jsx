import './Footer.css';
import footerImg from '../../assets/mm-footer.svg';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className='footer'>
            <div className='footer-content'>
                <div className='footer-left'>
                    <img className='footer-logo' src={footerImg} alt="money-mentor-logo" />
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