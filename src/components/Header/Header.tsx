import './Header.scss';
import CatalogIcon from '../../assets/icons/catalog.svg?react';
import WikiIcon from '../../assets/icons/wiki.svg?react';
import ChatIcon from '../../assets/icons/chat.svg?react';
import UserIcon from '../../assets/icons/user.svg?react';
import CollectionIcon from '../../assets/icons/collection.svg?react';
import DarkIcon from '../../assets/icons/dark.svg';
import LightIcon from '../../assets/icons/light.svg';
import { addDefaultSrc } from '../../services/utils.ts';
import { useNavigate } from 'react-router-dom';
import * as model from './model.ts';
import { authService } from '../../services/AuthService.ts';
import React, { useEffect, useState } from 'react';
import ConfirmationModal from '../ConfirmationModal';
import { useGate } from 'effector-react';
import { useUnit } from 'effector-react/compat';
import { Toggle } from '../../shared/ui/toggle.tsx';
import clsx from 'clsx';
import { chatService } from '../../services/ChatService.ts';

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

  function handleAvatarClick(
    e: React.MouseEvent<HTMLImageElement | SVGSVGElement>
  ) {
    e.stopPropagation();
    authService.IsAuthorized()
      ? setShowMenu((prev) => !prev)
      : navigate(`auth?from=${location.pathname}`);
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
          onClick={() => navigate('')}
        />
        <div className="header--right">
          <CatalogIcon
            className={clsx('header--member fills', {
              'legocy-fills': location.pathname.split('/')[1] === 'catalog',
            })}
            onClick={() => navigate('/catalog')}
          />
          <WikiIcon
            className={clsx('header--member strokes', {
              'legocy-strokes': location.pathname.split('/')[1] === 'wiki',
            })}
            onClick={() => navigate('/wiki/sets')}
          />
          <div className="header--chat fills">
            <ChatIcon
              onClick={() =>
                console.log(
                  chatService.CreateChatSession(authService.GetUserId())
                )
              }
            />
            {Number(messagesCounter) !== 0 && <div>{messagesCounter}</div>}
          </div>
          <CollectionIcon
            className={clsx('header--collection fills strokes', {
              'legocy-fills legocy-strokes':
                location.pathname.split('/')[1] === 'collection',
            })}
            onClick={() => navigate('/collection')}
          />
          <div className="header--user">
            {userImages[0] ? (
              <img
                alt=""
                src={userImages[0].downloadURL}
                onError={addDefaultSrc}
                onClick={handleAvatarClick}
              />
            ) : (
              <UserIcon
                className={
                  location.pathname.split('/')[1] === 'profile' || showMenu
                    ? 'legocy-strokes'
                    : 'strokes'
                }
                onClick={handleAvatarClick}
              />
            )}
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
