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
          <h1 className={styles.heading}>My Story</h1>
          <p>
            I grew up liking to spend time on my computer. However like for many
            others, this didn't result to getting into coding. In fact I didn't
            know anyone who wrote code and I didn't really know what that meant.
            So really my experiences were limited to downloading music,
            configuring my Winamp skins and researching whatever seemed like
            interesting. That was mostly dirtbikes to which I was hugely
            interested at the time.
          </p>
          <p>
            Time went on and my time mostly went into riding my motorcycles
            amongst other hobbies which were swimming and cross-country skiing
            during that time. After high school it was time to apply to college.
            I got accepted to study automation engineering. We had a mandatory
            automationg class that freaked me a bit. We also had an introductory
            programming class and that felt really intimidating and hard. Since
            all of my childhood and youth I had been interested in dirtbikes,
            motorcycles and cars, I thought switching to mechanical engineering
            would make more sense. I had also developed an interest on business
            and mechanical engineering integrated well with industrial economics
            in my school. So I made the switch.
          </p>
          <p>
            I don't know why but at some point I thought maybe I should give
            this whole coding thing another chance. My first course was with
            Python so I thought I would continue where I left off. Something
            weird happened. It didn't feel that hard than as it previously was.
            In fact it felt really good. Somewhere during that time I also
            started an internship where I was able to utilize my programming
            skills at some tasks that turned out to be at least somewhat useful.
            It felt great. I also started learning web development and creating
            simple UIs with Javascript and HTML which was also really cool.
            Later on I started dive more into backend development and learned
            Node.js and some Java. In school I also did an advanced course on
            C++.
          </p>
          <p>
            Since I had developed an interest in coding I chose Robotics as my
            MSc major. It turned out there were lot of difficult mathematical
            concepts but the challenge was all and all fun and it was exiting to
            combine software with hardware given that I initially started with
            more of the hardware side. During the end of my studies I took a job
            where I mostly tested engine ECU software with a HIL (hardware in
            loop) simulator. For my MSc thesis I did an interesting{' '}
            <span>
              <em>
                <a
                  href="https://trepo.tuni.fi/handle/10024/123760"
                  target="_blank"
                  style={{ textDecoration: 'underline' }}
                >
                  study on temperature sensor fault analysis using machine
                  learning
                </a>
              </em>
            </span>
          </p>
          <p>
            Here you have the summarized version! My path to coding may not be
            as usual as it is for most people but it certainly has been fun. I
            love the challenges I'm able to get and the feeling you get after
            solving the issues is priceless. I'm looking forward to learning
            even more, the speed of the learning journey hasn't slowed down.
            Quite the contrary.
          </p>
          <p style={{ margin: '3rem 0' }}>
            <em>-Markus</em>
          </p>
          <div>
            <p>
              PS. If you have any questions or ideas you would like to share,
              please contact me! I'm happy to discuss new things with new
              people!
            </p>
          </div>
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
