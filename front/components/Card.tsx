import React from 'react';

import styles from '../styles/Card.module.css';

const Card = () => {
  return (
    <div className={styles.card}>
      <h4>This is a card heading</h4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero,
        veritatis laborum molestiae perferendis fugit saepe unde! At tempore
        cumque sequi.
      </p>
    </div>
  );
};

export default Card;
