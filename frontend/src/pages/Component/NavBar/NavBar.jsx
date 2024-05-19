/*NavBar.jsx*/
import React, { useState } from 'react';
import './NavBar.css';
import {Link} from "react-router-dom";


function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(0);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuItemClick = (index) => {
    setActiveMenuItem(index);
  };

  return (
    <React.Fragment>
      <div className={`menuToggle ${menuOpen ? 'active' : ''}`} onClick={handleMenuToggle}></div>
      <div className={`sidebar ${menuOpen ? 'active' : ''}`}>
        <ul>
          {/* Sidebar content */}
          <li className="logo" style={{ '--bg': '#333' }}>
            <a href="#">
              <div className="icon">.</div>
            </a>
          </li>

          <div className="Menulist">
            <li
              style={{ '--bg': '#ffa117' }}
              className={activeMenuItem === 0 ? 'active' : ''}
              onClick={() => handleMenuItemClick(0)}
            >
              <Link to="/Home">
                <div className="icon"><ion-icon name="home-outline"></ion-icon></div>
                <div className="text">Home</div>
              </Link>
            </li>
            <li
              style={{ '--bg': '#f44336' }}
              className={activeMenuItem === 1 ? 'active' : ''}
              onClick={() => handleMenuItemClick(1)}
            >
              <Link to="/POSD">
                <div className="icon"><ion-icon name="eye-outline"></ion-icon></div>
                <div className="text">POSD</div>
              </Link>
            </li>
            <li
              style={{ '--bg': '#e91e63' }}
              className={activeMenuItem === 2 ? 'active' : ''}
              onClick={() => handleMenuItemClick(2)}
            >
              <Link to="/Contatti">
                <div className="icon"><ion-icon name="mail-outline"></ion-icon></div>
                <div className="text">Contatti</div>
              </Link>
            </li>
            <li
              style={{ '--bg': '#0fc70f' }}
              className={activeMenuItem === 3 ? 'active' : ''}
              onClick={() => handleMenuItemClick(3)}
            >
              <Link to="/Partecipa">
                <div className="icon"><ion-icon name="hand-right-outline"></ion-icon></div>
                <div className="text">Partecipa</div>
              </Link>
            </li>
            <li
              style={{ '--bg': '#b145e9' }}
              className={activeMenuItem === 4 ? 'active' : ''}
              onClick={() => handleMenuItemClick(4)}
            >
              <Link to="Feedback">
                <div className="icon"><ion-icon name="clipboard-outline"></ion-icon></div>
                <div className="text">Feedback</div>
              </Link>
            </li>
          </div>
          <div className="bottom">
            <li style={{ '--bg': '#333' }}>
              <a href="#">
                <div className="icon">
                  <div className="imgBx">
                    <img src="images\totti.jpeg" alt="Francesco Totti" />
                  </div>
                </div>
                <div className="text">Francesco Totti</div>
              </a>
            </li>
            <li style={{ '--bg': '#333' }}>
              <a href="#">
                <div className="icon"><ion-icon name="log-in-outline"></ion-icon></div>
                <div className="text">Login</div>
              </a>
            </li>
          </div>
        </ul>
      </div>
  
    </React.Fragment>
  );
}

export default NavBar;