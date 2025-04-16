import React from 'react';
import './Header.css';

const Header = ({ isColorful }) => {
  return (
    <header className={`header ${isColorful ? 'colorido' : ''}`}>
      <h1>Bem-vindo ao Projeto Incrível!</h1>
    </header>
  );
};

export default Header;
