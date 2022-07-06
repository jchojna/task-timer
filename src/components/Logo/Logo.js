import React from 'react';
import icons from 'assets/svg/logo.svg';
import 'scss/Logo.scss';

const Logo = () => {
  return (
    <div className="Logo">
      <svg className="Logo__base" viewBox="0 0 512 612">
        <use href={`${icons}#logoBase`}></use>
      </svg>
      <svg className="Logo__letter" viewBox="0 0 512 612">
        <use href={`${icons}#logoLetter`}></use>
      </svg>
      <svg className="Logo__shadow Logo__shadow--base" viewBox="0 0 512 612">
        <use href={`${icons}#logoBaseShadow`}></use>
      </svg>
      <svg className="Logo__shadow Logo__shadow--letter" viewBox="0 0 512 612">
        <use href={`${icons}#logoLetterShadow`}></use>
      </svg>
    </div>
  );
};
export default Logo;
