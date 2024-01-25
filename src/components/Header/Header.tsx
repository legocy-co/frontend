import './Header.scss';
import SearchIcon from '../../assets/icons/search.svg';
import MapIcon from '../../assets/icons/map.svg';
import ChatIcon from '../../assets/icons/chat.svg';
import UserIcon from '../../assets/icons/user.svg';
import ActiveUserIcon from '../../assets/icons/active-user.svg';
import { addDefaultSrc } from '../../services/utils';
import { useLocation, useNavigate } from 'react-router-dom';
import * as model from './model.ts';
import { authService } from '../../services/AuthService.ts';
import { useState } from 'react';
import LogoutModal from '../LogoutModal';
import { useGate } from 'effector-react';
import { useUnit } from 'effector-react/compat';

const Header = () => {
  useGate(model.gate);
  const userImages = useUnit(model.$userImages);
  const [showMenu, setShowMenu] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const messagesCounter = 0;

  const navigate = useNavigate();
  const location = useLocation();

  function handleShowLogout() {
    setShowLogout(true);
    setShowMenu(false);
  }

  console.log(authService.GetUserId());
  console.log(userImages);

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
            src={
              userImages[1]
                ? 'https://' + userImages[1].downloadURL
                : !showMenu
                  ? UserIcon
                  : ActiveUserIcon
            }
            className={
              userImages[1] ? 'h-10 w-10 object-cover rounded-full' : ''
            }
            onError={addDefaultSrc}
            onClick={() =>
              authService.IsAuthorized()
                ? setShowMenu((prev) => !prev)
                : navigate(`auth?from=${location.pathname}`)
            }
            alt=""
          />
          {showMenu && (
            <div>
              <p
                onClick={() => navigate('/profile/' + authService.GetUserId())}
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
