import './Header.scss';
import SearchIcon from '../../assets/icons/search.svg';
import WikiIcon from '../../assets/icons/wiki.svg';
import ChatIcon from '../../assets/icons/chat.svg';
import UserIcon from '../../assets/icons/user.svg';
import ActiveUserIcon from '../../assets/icons/active-user.svg';
import CollectionIcon from '../../assets/icons/collection.svg';
import { addDefaultSrc } from '../../services/utils';
import { useNavigate } from 'react-router-dom';
import * as model from './model.ts';
import { authService } from '../../services/AuthService.ts';
import { useState } from 'react';
import ConfirmationModal from '../ConfirmationModal';
import { useGate } from 'effector-react';
import { useUnit } from 'effector-react/compat';

const Header = () => {
  useGate(model.gate);

  const messagesCounter = 1;
  const userImages = useUnit(model.$userImages);
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  function handleShowLogout() {
    setShowLogout(true);
    setShowMenu(false);
  }

  function handleLogout() {
    setShowLogout(false);
    authService.Logout();
  }

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
        <div className="header--right">
          <img
            className="header--wiki"
            src={WikiIcon}
            onClick={() => navigate('/wiki/sets/')}
            alt=""
          />
          <div className="header--chat">
            <img src={ChatIcon} onError={addDefaultSrc} alt="" />
            {Number(messagesCounter) !== 0 && <div>{messagesCounter}</div>}
          </div>
          <img className="header--collection" src={CollectionIcon} alt="" onClick={() => navigate('/collections/')}/>
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
                  onClick={() =>
                    navigate('/profile/' + authService.GetUserId())
                  }
                >
                  My profile
                </p>
                <p onClick={() => handleShowLogout()}>Log out</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {showLogout && (
        <ConfirmationModal
          show={showLogout}
          onClose={() => setShowLogout(false)}
          onYes={handleLogout}
        >
          Are you sure you want to log out?
        </ConfirmationModal>
      )}
    </header>
  );
};

export default Header;
