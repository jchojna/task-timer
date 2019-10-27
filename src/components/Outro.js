import React from 'react';
import icons from '../assets/svg/icons.svg';
import '../scss/Outro.scss';

const Outro = (props) => {
  const {compClassName} = props;

  return (
    <section className={compClassName}>
      <div className="Outro__container">
        <h2 className="Outro__heading">
        Congratulations!
        <span
          className="Outro__party"
          role="img"
          aria-label="party"
        > 🎉</span>
        </h2>
        <p className="Outro__message">Test</p>
        <button className="Outro__retry">
          <svg className="Outro__svg" viewBox="0 0 512 512">
            <use href={`${icons}#retry`}/>
          </svg>
        </button>
      </div>
    </section>
  );
}
export default Outro;