import './Footer.scss';
import SocialIcon from '../../assets/icons/social.svg';
import { addDefaultSrc } from '../../services/utils.ts';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="text-black dark:bg-yellow-50">
      <div className="footer--group">
        <div className="footer--contacts">
          <p>legocycorp@gmail.com</p>
          <p>+7 898 384 9884</p>
          <img src={SocialIcon} onError={addDefaultSrc} alt="" />
        </div>
        <div className="footer--policy">
          <img src="/logo-dark.svg" onError={addDefaultSrc} alt="" />
          <div>
            <p>&copy; 2024 Legocy </p>
            <p>Privacy Policy</p>
          </div>
        </div>
        <div className="footer--right">
          <p>SUPPORT</p>
          <p onClick={() => navigate('/catalog/')}>CATALOG</p>
          <p>FAQ</p>
          <p>CONTACT US</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
