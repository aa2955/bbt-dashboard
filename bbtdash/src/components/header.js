import React from 'react';
import logo from './logo.webp';

function Header() {
  return (
    <header>
      <img src={logo} alt="Logo" className="header-logo" />  
      <h1>BHAKTIVEDANTA BOOK TRUST</h1>
      <nav>
        {
            /* navigation links 
            We will link the logo to the actual website if needed*/       
        }
      </nav>
    </header>
  );
}

export default Header;
