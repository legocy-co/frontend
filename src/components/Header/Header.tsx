import './Header.scss';
import SearchIcon from '../../assets/icons/search.svg';
import WikiIcon from '../../assets/icons/wiki.svg';
import ChatIcon from '../../assets/icons/chat.svg';
import UserIcon from '../../assets/icons/user.svg';
import ActiveUserIcon from '../../assets/icons/active-user.svg';
import CollectionIcon from '../../assets/icons/collection.svg';
import DarkIcon from '../../assets/icons/dark.svg';
import LightIcon from '../../assets/icons/light.svg';
import { addDefaultSrc } from '../../services/utils';
import { useNavigate } from 'react-router-dom';
import * as model from './model.ts';
import { authService } from '../../services/AuthService.ts';
import { useEffect, useState } from 'react';
import ConfirmationModal from '../ConfirmationModal';
import { useGate } from 'effector-react';
import { useUnit } from 'effector-react/compat';
import { Toggle } from '../../shared/ui/toggle';

const Header = () => {
  useGate(model.gate);

  const messagesCounter = 0;
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

  const [darkTheme, setDarkTheme] = useState(
    localStorage.getItem('color-theme') !== 'light'
  );

  window.addEventListener('click', function () {
    setShowMenu(false);
  });

  document.documentElement.setAttribute(
    'data-theme',
    darkTheme ? 'dark' : 'light'
  );

  document.body.style.background = darkTheme ? '#191919' : '#FFFFFF';

  useEffect(() => {
    darkTheme
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark');
    localStorage.setItem('color-theme', darkTheme ? 'dark' : 'light');
  }, [darkTheme]);

  return (
    <header className="dark:bg-headerdark">
      <div className="header--group">
        <img
          className="header--logo"
          src="/logo.svg"
          onError={addDefaultSrc}
          alt=""
          onClick={() => navigate('/')}
        />
        <button
          className="header--catalog"
          onClick={() => navigate('/catalog')}
        >
          Catalog
        </button>
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
            <img
              src={ChatIcon}
              onError={addDefaultSrc}
              alt=""
              onClick={() => navigate('/messenger/')}
            />
            {Number(messagesCounter) !== 0 && <div>{messagesCounter}</div>}
          </div>
          <img
            className="header--collection"
            src={CollectionIcon}
            alt=""
            onClick={() => navigate('/collection/')}
          />
          <div className="header--user">
            <img
              src={
                userImages[0]
                  ? userImages[0].downloadURL
                  : !showMenu
                    ? UserIcon
                    : ActiveUserIcon
              }
              className={
                userImages[0] ? 'h-10 w-10 object-cover rounded-full' : ''
              }
              onError={addDefaultSrc}
              onClick={(e) => {
                e.stopPropagation();
                authService.IsAuthorized()
                  ? setShowMenu((prev) => !prev)
                  : navigate(`auth?from=${location.pathname}`);
              }}
              alt=""
            />
            {showMenu && (
              <div
                className="header--user-menu bg-white dark:bg-dark dark:text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <p
                  onClick={() =>
                    navigate('/profile/' + authService.GetUserId())
                  }
                >
                  My profile
                </p>
                <div className="header--user-menu_theme">
                  <img src={LightIcon} alt="" onError={addDefaultSrc} />
                  <Toggle
                    checked={darkTheme}
                    onChange={() => setDarkTheme((prev) => !prev)}
                  />
                  <img src={DarkIcon} alt="" onError={addDefaultSrc} />
                </div>
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
