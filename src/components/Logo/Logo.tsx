import './Logo.scss';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();

  return (
    <img
      src="/logo.svg"
      alt=""
      className="logo"
      onClick={() => navigate('/private')}
    />
  );
};

export default Logo;
