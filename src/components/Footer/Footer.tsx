import './Footer.scss';

const Footer = () => {
  return (
    <footer>
      <div className="footer--group">
        <div className="footer--contacts">
          <p>legocycorp@gmail.com</p>
          <p>+7 898 384 9884</p>
          <img src="/src/assets/icons/social.svg" alt="" />
        </div>
        <div className="footer--policy">
          <img src="/logo-dark.svg" alt="" />
          <div>
            <p>&copy; 2022 Legocy </p>
            <p>Privacy Policy</p>
          </div>
        </div>
        <div className="footer--right">
          <p>SUPPORT</p>
          <p>CATALOG</p>
          <p>FAQ</p>
          <p>CONTACT US</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
