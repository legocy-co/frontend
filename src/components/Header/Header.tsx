import './Header.scss';
import SearchIcon from '../../assets/icons/search.svg';
import MapIcon from '../../assets/icons/map.svg';
import ChatIcon from '../../assets/icons/chat.svg';
import UserIcon from '../../assets/icons/user.svg';
import ActiveUserIcon from '../../assets/icons/active-user.svg';
import { addDefaultSrc } from '../../services/utils';
import { useLocation, useNavigate } from 'react-router-dom';
import { GetCredentials } from '../../storage/credentials.ts';
import { jwtDecode } from 'jwt-decode';
import { TokenType } from '../../services/AuthService.ts';
import { useState } from 'react';
import LogoutModal from '../LogoutModal';

const Header = () => {
  const credentials = GetCredentials();
  const decodedAccess = credentials.accessToken
    ? jwtDecode<TokenType>(credentials.accessToken)
    : '';

  const [showMenu, setShowMenu] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  function handleShowLogout() {
    setShowLogout(true);
    setShowMenu(false);
  }

  const navigate = useNavigate();
  const location = useLocation();

  const messagesCounter = 0;
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
          <img src={SearchIcon} onError={addDefaultSrc} alt="" />
        </div>
        <img className="header--map" src={MapIcon} alt="" />
        <div className="header--chat">
          <img src={ChatIcon} onError={addDefaultSrc} alt="" />
          {Number(messagesCounter) !== 0 && <div>{messagesCounter}</div>}
        </div>
        <div className="header--user">
          <img
            src={!showMenu ? UserIcon : ActiveUserIcon}
            onError={addDefaultSrc}
            onClick={() =>
              decodedAccess
                ? setShowMenu((prev) => !prev)
                : navigate(`auth?from=${location.pathname}`)
            }
            alt=""
          />
          {showMenu && (
            <div>
              <p
                onClick={() =>
                  decodedAccess && navigate('/profile/' + decodedAccess.id)
                }
              >
                My profile
              </p>
              <p onClick={() => handleShowLogout()}>Log out</p>
            </div>
          )}
        </div>
      </div>
      {showLogout && (
        <LogoutModal show={showLogout} onClose={() => setShowLogout(false)} />
      )}
    </header>
  );
};

export default Header;
