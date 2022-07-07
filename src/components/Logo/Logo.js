import React from 'react';
import classNames from 'classnames';
import icons from 'assets/svg/logo.svg';
import styles from './Logo.module.scss';

const Logo = () => {
  return (
    <div className={styles.container}>
      <svg className={styles.base} viewBox="0 0 512 612">
        <use href={`${icons}#logoBase`}></use>
      </svg>
      <svg className={styles.letter} viewBox="0 0 512 612">
        <use href={`${icons}#logoLetter`}></use>
      </svg>
      <svg
        className={classNames(styles.shadow, styles['shadow--base'])}
        viewBox="0 0 512 612"
      >
        <use href={`${icons}#logoBaseShadow`}></use>
      </svg>
      <svg
        className={classNames(styles.shadow, styles['shadow--letter'])}
        viewBox="0 0 512 612"
      >
        <use href={`${icons}#logoLetterShadow`}></use>
      </svg>
    </div>
  );
};
export default Logo;
