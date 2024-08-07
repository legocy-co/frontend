import './Footer.scss';
import Logo from '../../assets/icons/logo-dark.svg?react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="text-black dark:text-white">
      <div className="footer--group">
        <div className="footer--contacts">
          <p>legocycorp@gmail.com</p>
          <p>+7 898 384 9884</p>
        </div>
        <div className="footer--policy">
          <Logo />
          <div>
            <p>&copy; 2024 Legocy </p>
            <a onClick={() => navigate('/faq/privacy-policy')}>
              Privacy Policy
            </a>
          </div>
        </div>
        <div className="footer--right">
          <p onClick={() => navigate('/catalog')}>CATALOG</p>
          <p onClick={() => navigate('/faq')}>FAQ</p>
          <p onClick={() => navigate('/faq/contact-us')}>CONTACT US</p>
          <p onClick={() => navigate('/about-us')}>ABOUT US</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
