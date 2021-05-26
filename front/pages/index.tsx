import Link from 'next/link';
import React from 'react';
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
          <h2>Keep moving</h2>
          <p>
            I am a young guy with a passion for writing code. I'm extremely
            curious and I like to explore things while continuously challenging
            myself. My experience varies from writing simple scripts for
            automating mundane and unproductive business tasks, creating web
            apps and even a machine learning solution for temperature sensor
            analysis. This curiousity and exploration has led me to be able to
            learn new things quickly and effectively. Best part of a project is
            usually when you can see the effects of your work.
          </p>
        </div>
        <div className={styles.textBlock}>
          <h2>Some things I know about</h2>
          <div className={styles.cardContainer}>
            <div className={styles.card}>
              <h4>Software Development</h4>
              <ul>
                <li>Javascript / Typescript (React, Express) </li>
                <li>Python</li>
                <li>Java (Some knowledge on Spring)</li>
                <li>SQL</li>
                <li>C++</li>
              </ul>
            </div>
            <div className={styles.card}>
              <h4>Electronics</h4>
              <p>
                Knowledge of basic circuits and principles. Some examples can be
                found from my Github. Currently trying to grasp more knowledge
                on circuits and embedded development with C and C++
              </p>
            </div>
            <div className={styles.card}>
              <h4>Other stuff</h4>
              <ul>
                <li>Robot Framework</li>
                <li>Docker</li>
                <li>AWS Lightsail and S3</li>
                <li>Embedded software testing with HIL simulator</li>
                <li>CAN, HMI</li>
                <li>I know stuff about cars!</li>
              </ul>
            </div>
          </div>
          <div className={styles.contactAction}>
            <div className={styles.textBlock}>
              <h2>Tell me how I can help you!</h2>
              <Link href="/contact">
                <input
                  type="button"
                  className="btn btn-danger"
                  value="Contact Me"
                />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
