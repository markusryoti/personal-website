import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import { UserContext } from '../context/UserState';

import styles from '../styles/About.module.css';

const about = () => {
  const userContext = useContext(UserContext);
  return (
    <>
      <Nav />
      <div className={styles.center}>
        <div className="container">
          <h1 className={styles.heading}>Lorem ipsum dolor sit amet.</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            praesentium omnis nihil delectus unde! Corrupti, id magni aperiam
            voluptatum, numquam hic ea aliquid saepe ratione, tenetur ex
            pariatur tempore recusandae non. Dignissimos fugiat tempora,
            laboriosam eaque minima repellendus, id aut, temporibus placeat
            ipsam nemo et. At, perspiciatis. Dolore, expedita soluta!
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            praesentium omnis nihil delectus unde! Corrupti, id magni aperiam
            voluptatum, numquam hic ea aliquid saepe ratione, tenetur ex
            pariatur tempore recusandae non. Dignissimos fugiat tempora,
            laboriosam eaque minima repellendus, id aut, temporibus placeat
            ipsam nemo et. At, perspiciatis. Dolore, expedita soluta!
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            praesentium omnis nihil delectus unde! Corrupti, id magni aperiam
            voluptatum, numquam hic ea aliquid saepe ratione, tenetur ex
            pariatur tempore recusandae non. Dignissimos fugiat tempora,
            laboriosam eaque minima repellendus, id aut, temporibus placeat
            ipsam nemo et. At, perspiciatis. Dolore, expedita soluta!
          </p>
          <div className={styles.imageContainer}>
            <img
              src="https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="laptop"
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default about;
