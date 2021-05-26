import Link from 'next/link';
import React from 'react';

import styles from '../styles/Hero.module.css';

const Hero = () => {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.hero}>
        <div className={styles.herobg}>
          <div className={styles.body}>
            <h1>Hi, I'm Markus</h1>
            <p>I like to write code.</p>
            <Link href="/about">
              <input
                type="button"
                className="btn btn-danger"
                value="Read More"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
