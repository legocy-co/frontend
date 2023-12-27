import './Header.scss';
import SearchIcon from '../../assets/icons/search.svg';
import MapIcon from '../../assets/icons/map.svg';
import ChatIcon from '../../assets/icons/chat.svg';
import UserIcon from '../../assets/icons/user.svg';
import { addDefaultSrc } from '../../services/utils';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const messagesCounter = 28;

  return (
    <header>
      <div className="header--group">
        <img
          className="header--logo"
          src="/logo.svg"
          onError={addDefaultSrc}
          alt=""
          onClick={() => navigate('/')}
        />
        <button onClick={() => navigate('/catalog')}>Catalog</button>
        <div className="header--searchbar">
          <input type="text" placeholder="Search" />
          <img src={SearchIcon} alt="" />
        </div>
        <img className="header--map" src={MapIcon} alt="" />
        <div className="header--chat">
          <img src={ChatIcon} alt="" />
          <div>{messagesCounter}</div>
        </div>
        <img
          src={UserIcon}
          onError={addDefaultSrc}
          onClick={() => navigate('/private')}
          alt=""
        />
      </div>
    </header>
  );
};

export default Header;
