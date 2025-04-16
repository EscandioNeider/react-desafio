import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import Button from './components/Button';

const App = () => {
  const [backgroundChanged, setBackgroundChanged] = useState(false);
  const [headerColorido, setHeaderColorido] = useState(false);

  const toggleBackground = () => setBackgroundChanged(prev => !prev);

  const handleButtonClick = (buttonIndex) => {
    setHeaderColorido(buttonIndex === 3);
    toggleBackground();
  };
  
  return (
    <div className={`app ${backgroundChanged ? 'rainbow-background' : ''}`}>
      <Header isColorido={headerColorido} />
      <Content />
      <Button onButtonClick={handleButtonClick} />
      <Footer />
    </div>
  );
};

export default App;
