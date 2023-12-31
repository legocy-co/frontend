import './Logo.scss';
import { useNavigate } from 'react-router-dom';
import { addDefaultSrc } from '../../services/utils.ts';

const Logo = () => {
  const navigate = useNavigate();

  return (
    <img
      src="/logo.svg"
      onError={addDefaultSrc}
      alt=""
      className="logo"
      onClick={() => navigate('/private')}
    />
  );
};

export default Logo;
