import './Footer.scss'

const Footer = () => {
  return (
      <footer>
        <div className="footer--group">
          <div className="footer--contacts">
            <p>legocy.info@gmail.com</p>
            <p>+7 898 384 9884</p>
            <img src="/src/assets/icons/social.svg" alt=""/>
          </div>
          <div className="footer--policy">
            <img src="/logo-dark.svg" alt=""/>
          </div>
        </div>
      </footer>
  );
}

export default Footer;