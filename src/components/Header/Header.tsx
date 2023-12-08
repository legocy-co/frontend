import './Header.scss'

const Header = () => {
  const messagesCounter = 1;

  return (
      <header>
        <div className="header--group">
          <a href="/"><img className="header--logo" src="/logo.svg" alt="" /></a>
          <button>Catalog</button>
          <div className="header--searchbar">
            <input type="text" placeholder="Search" />
            <img src="/src/assets/icons/search.svg" alt=""/>
          </div>
          <img className="header--map" src="/src/assets/icons/map.svg" alt=""/>
          <div className="header--chat">
            <img src="/src/assets/icons/chat.svg" alt=""/>
            <div>{messagesCounter}</div>
          </div>
          <img src="/src/assets/icons/user.svg" alt=""/>
        </div>
      </header>
  )
}

export default Header;