// Button.js
import React, { useState, useRef } from 'react';
import './Button.css';
import yipieMusic from "../audio/yipie.mp4";
import HEYEMusic from "../audio/hey.mp4";
import FlorMusic from "../audio/flor.mp4";
import fogueteImg from '../img/foguete.svg';
import SpaceMusic from '../audio/buraco-negro-colidindo.mp4';
import Pacman from './Pacman';
import PacMusic from "../audio/pacman.mp4"
import shenlongMusic from '../audio/shenlong-theme.mp4';
import estrela from '../img/estrela.svg';
import db1 from '../img/esfera-1.svg';
import db2 from '../img/esfera-2.svg';
import db3 from '../img/esfera-3.svg';
import db4 from '../img/esfera-4.svg';
import db5 from '../img/esfera-5.svg';
import db6 from '../img/esfera-6.svg';
import db7 from '../img/esfera-7.svg';
import shenlongImg from '../img/shenlong.png';

const Button = ({ onButtonClick }) => {
  const [stars, setStars] = useState([]);
  const [isGradientActive, setIsGradientActive] = useState(false);
  const [starCount, setStarCount] = useState(50);
  const [starsAndRocketActive, setStarsAndRocketActive] = useState(false);
  const [flowersActive, setFlowersActive] = useState(false);
  const [showPacman, setShowPacman] = useState(false);
  const [showShenlong, setShowShenlong] = useState(false);      
  const [showGif, setShowGif] = useState(false);
  const [darkBackground, setDarkBackground] = useState(false);
  const [activeButton, setActiveButton] = useState(null); // ✅
  

  const isDisabled = (id) => activeButton !== null && activeButton !== id;

  const audioRef = useRef(null);
  const audioRefPacman = useRef(null);
  const audioRefSpace= useRef(null);
  const audioRefFlor = useRef(null);
  const audioRefHEYE = useRef(null);
  const audioRefYipie = useRef(null);

  const showAlert = (message) => alert(message);

  const createStars = () => {
    audioRefYipie.current.currentTime = 0;
    audioRefYipie.current.play();
    const newStars = [];
    for (let i = 0; i < starCount; i++) {
      newStars.push({
        id: i,
        left: `${Math.random() * 100}vw`,
        top: `${Math.random() * 100}vh`,
        animationDuration: `${Math.random() * 2 + 2}s`,
        delay: `${Math.random() * 2}s`,
        size: `${Math.random() * 5 + 5}px`,
        color: `hsl(${Math.random() * 360}, 100%, 75%)`,
      });
    }
    setStars(newStars);
    setTimeout(() => setStars([]), 6500);
  };

  const handleButton3Click = async () => {
    showAlert('Vamos colorir este lugar! 🌈');
    document.body.classList.add('rainbow-background');
    audioRefHEYE.current.currentTime = 28;
    audioRefHEYE.current.play();
    await new Promise(resolve => setTimeout(resolve, 18000));
    audioRefHEYE.current.pause();
    audioRefHEYE.current.currentTime = 0;
    document.body.classList.remove('rainbow-background');
  };

  const activateGalaxy = () => {
    document.body.classList.add('galaxy-theme');
    for (let i = 0; i < 30; i++) {
      const star = document.createElement('div');
      star.classList.add('star-shape');
      star.innerHTML = '★';
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.fontSize = `${Math.random() * 24 + 12}px`;
      document.body.appendChild(star);
    }
    const rocket = document.createElement('img');
    rocket.src = fogueteImg;
    rocket.classList.add('rocket');
    document.body.appendChild(rocket);
    setStarsAndRocketActive(true);
  };

  const deactivateGalaxy = () => {
    document.querySelectorAll('.star-shape').forEach(star => star.remove());
    document.querySelectorAll('.rocket').forEach(rocket => rocket.remove());
    document.body.classList.remove('galaxy-theme');
    setStarsAndRocketActive(false);
  };

  const handleGalaxyClick = async () => {
    showAlert('💫 Você clicou no botão da Galáxia! Prepare-se para viajar nas estrelas!');
    audioRefSpace.current.currentTime = 0;
    audioRefSpace.current.play();
    activateGalaxy();
    await new Promise(resolve => setTimeout(resolve, 7000));
    deactivateGalaxy();
    audioRefSpace.current.pause();
    audioRefSpace.current.currentTime = 0;
  };

  const handleFlowersClick = async () => {
    showAlert('Está sentindo esse cheiro? 🌺');
    document.body.classList.add('flower-theme');
    setFlowersActive(true);
    audioRefFlor.current.currentTime = 0;
    audioRefFlor.current.play();
    await new Promise(resolve => setTimeout(resolve, 12000));
    document.body.classList.remove('flower-theme');
    setFlowersActive(false);
    audioRefFlor.current.pause();
    audioRefFlor.current.currentTime = 0;
  };

  const pacMan = async () => {
    if (showPacman) {
      setShowPacman(false);
      setTimeout(() => {
        setShowPacman(true);
      }, 100);
    } else {
      showAlert('👾 Tema do Pac-Man ativado! Prepare-se para ver o Pac-Man comendo os botões!');
      audioRefPacman.current.currentTime = 0;
      audioRefPacman.current.play();
      setShowPacman(true);
      document.body.classList.add('pacman-theme');

      const buttons = document.querySelectorAll('.button-container button');
      const delayStep = 650;
      const maxDuration = 12000;

      buttons.forEach((btn, index) => {
        setTimeout(() => {
          btn.classList.add('button-eaten'); 
        }, delayStep * index);
      });

      const totalDelay = Math.min(delayStep * buttons.length + 1000, maxDuration);

      await new Promise(resolve => setTimeout(resolve, totalDelay));

      setShowPacman(false);
      document.body.classList.remove('pacman-theme');
      buttons.forEach((btn) => btn.classList.remove('button-eaten'));
      audioRefPacman.current.pause();
      audioRefPacman.current.currentTime = 0;
    }
  };

  const summonShenlong = async () => {
    showAlert("Vamos invocar o Grandioso Shenlong... 🐉");
    setShowShenlong(true);
    setShowGif(true);
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    await new Promise(resolve => setTimeout(resolve, 12500));
    setShowGif(false);
    setDarkBackground(true);
    await new Promise(resolve => setTimeout(resolve, 12000));
    showAlert('Não tenho o dia todo....');
    setShowShenlong(false);
    setDarkBackground(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  return (
    <div className={`button-wrapper ${isGradientActive ? 'gradient-active' : ''}`}>
      <div className="button-container">
        <button
          onClick={() => {
            if (isDisabled('confete')) return;
            setActiveButton('confete');
            createStars();
            showAlert('Chuva de confetes! 🎊🌈');
            setTimeout(() => setActiveButton(null), 6500);
          }}
          disabled={isDisabled('confete')}
        >
          <span>🎊</span>
        </button>

        <button
          onClick={async () => {
            if (isDisabled('rainbow')) return;
            setActiveButton('rainbow');
            await handleButton3Click();
            setActiveButton(null);
          }}
          disabled={isDisabled('rainbow')}
        >
          <span>🌈</span>
        </button>

        <button
          onClick={async () => {
            if (isDisabled('flowers')) return;
            setActiveButton('flowers');
            await handleFlowersClick();
            setActiveButton(null);
          }}
          disabled={isDisabled('flowers')}
        >
          <span>💐</span>
        </button>

        <button
          onClick={async () => {
            if (isDisabled('galaxy')) return;
            setActiveButton('galaxy');
            await handleGalaxyClick();
            setActiveButton(null);
          }}
          disabled={isDisabled('galaxy')}
        >
          <span>🌌</span>
        </button>

        <button
          onClick={async () => {
            if (isDisabled('pacman')) return;
            setActiveButton('pacman');
            await pacMan();
            setActiveButton(null);
          }}
          disabled={isDisabled('pacman')}
        >
          <span>👾</span>
        </button>

        <button
          onClick={async () => {
            if (isDisabled('shenlong')) return;
            setActiveButton('shenlong');
            await summonShenlong();
            setActiveButton(null);
          }}
          disabled={isDisabled('shenlong')}
        >
          <span>🐉</span>
        </button>

        {showPacman && (
          <div>
            <Pacman />
          </div>
        )}
      </div>

      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            backgroundColor: star.color,
            animationDuration: star.animationDuration,
            animationDelay: star.delay,
          }}
        ></div>
      ))}

      {flowersActive && (
        <div className="flower-container">
          {Array.from({ length: 20 }).map((_, index) => (
            <Flower key={index} />
          ))}
        </div>
      )}

      {showShenlong && (
        <div className={`shenlong-container ${darkBackground ? 'darkened' : ''}`}>
          {!showGif && (
            <>
              <img src={shenlongImg} alt="Shenlong" className="shenlong-img" />
              <div className="orbital-esferas">
                {[db1, db2, db3, db4, db5, db6, db7].map((db, i) => (
                  <React.Fragment key={i}>
                    <img src={db} alt={`Esfera ${i + 1}`} className={`esfera esfera-${i + 1}`} />
                    <img src={estrela} alt={`Estrela ${i + 1}`} className={`estrela-${i + 1}`} />
                  </React.Fragment>
                ))}
              </div>
              <p className="shenlong-frase">Qual é o seu desejo? Qualquer coisa dentro do meu poder será concedida.</p>
            </>
          )}
        </div>
      )}

      <audio ref={audioRefYipie} src={yipieMusic} />
      <audio ref={audioRefHEYE} src={HEYEMusic} />
      <audio ref={audioRefFlor} src={FlorMusic} />
      <audio ref={audioRefSpace} src={SpaceMusic} />
      <audio ref={audioRefPacman} src={PacMusic} />
      <audio ref={audioRef} src={shenlongMusic} />
    </div>
  );
};

const Flower = () => {
  const left = `${Math.random() * 100}vw`;
  const top = `${Math.random() * 50 + 50}vh`;
  const numPetals = 7;

  return (
    <div className="flower" style={{ left, top }}>
      {Array.from({ length: numPetals }).map((_, i) => (
        <div
          key={i}
          className="petal-wrapper"
          style={{ transform: `rotate(${(360 / numPetals) * i}deg)` }}
        >
          <div className="petal" style={{ animationDelay: `${i * 0.2}s` }}></div>
        </div>
      ))}
      <div className="center"></div>
    </div>
  );
};

export default Button;
