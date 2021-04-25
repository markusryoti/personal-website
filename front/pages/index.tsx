import React from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Nav from '../components/Nav';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div>
      <Nav />
      <Hero />
      <main className={styles.main}>
        <div className={styles.textBlock}>
          <h2>Lorem ipsum dolor sit amet.</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            odio alias ullam veniam fuga distinctio velit neque provident
            voluptas aspernatur nulla, repellat porro sapiente. Quasi ratione
            nisi ab labore totam. Labore ut explicabo tempora laboriosam amet
            maiores sit debitis, ducimus quia accusantium, eum exercitationem
            expedita ab blanditiis necessitatibus praesentium. Debitis.
          </p>
        </div>
        <div className={styles.textBlock}>
          <h2>Lorem ipsum dolor sit amet.</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus,
            quasi natus cum necessitatibus perferendis culpa veritatis totam
            voluptas possimus eligendi? Necessitatibus quo accusamus eius minus
            doloribus similique fugiat maiores odit eaque, voluptatum sint culpa
            numquam eveniet dolor incidunt? Ut eligendi temporibus, nesciunt
            voluptas asperiores iure nostrum dicta omnis optio fuga!
          </p>
        </div>
        <div className={styles.textBlock}>
          <h2>Lorem ipsum dolor sit amet.</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
            animi nostrum nemo deleniti consequatur laboriosam quaerat
            recusandae doloribus soluta eligendi?
          </p>
        </div>
        <div className={styles.cardContainer}>
          <Card />
          <Card />
          <Card />
        </div>
      </main>
      <Footer />
    </div>
  );
}
