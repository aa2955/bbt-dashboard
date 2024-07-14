import React from 'react';
import Simah from './simah.svg';

function MainContent() {
  return (
    <section id="home" className="main-content">
      <div className="content-overlay">
        <h2>Home Section</h2>
        <p>This is the home section of the website.</p>
      </div>
      <img src={Simah} alt="Simah" className="Simah" />
    </section>
  );
}

export default MainContent;
