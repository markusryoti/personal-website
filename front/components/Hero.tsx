import React from 'react';

import styles from '../styles/Hero.module.css';

const Hero = () => {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.hero}>
        <div className={styles.herobg}>
          <div className={styles.body}>
            <h1>Hi, I'm Markus</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
            <input type="button" className="btn btn-danger" value="Click" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
