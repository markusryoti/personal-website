import React, { useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from '../styles/Nav.module.css';
import { EditorContext } from '../context/EditorState';

function getWindowDimensions() {
  // make sure your function is being called in client side only
  if (typeof window !== 'undefined') {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  return {
    width: 0,
    height: 0,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

const Nav = ({ user }) => {
  const router = useRouter();
  const { height, width } = useWindowDimensions();
  const [linksVisible, setLinksVisible] = useState(width > 600 ? true : false);

  const editorContext = useContext(EditorContext);
  const { setPostToEdit } = editorContext;

  const currentPath = router.route.slice(1).split('/')[0];

  const handleBurgerClick = () => {
    setLinksVisible(!linksVisible);
  };

  useEffect(() => {
    if (width > 600) {
      setLinksVisible(true);
    } else {
      setLinksVisible(false);
    }
  }, [width]);

  return (
    <nav className={styles.nav}>
      <div className={styles.brandTitle}>markusryoti</div>
      <div className={styles.burger} onClick={handleBurgerClick}>
        <div>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      {linksVisible && (
        <div className={styles.navLinks}>
          <ul>
            <li className={!currentPath ? styles.active : ''}>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li className={currentPath === 'about' ? styles.active : ''}>
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
            <li className={currentPath === 'blog' ? styles.active : ''}>
              <Link href="/blog">
                <a>Blog</a>
              </Link>
            </li>
            <li className={currentPath === 'contact' ? styles.active : ''}>
              <Link href="/contact">
                <a>Contact</a>
              </Link>
            </li>
            {user && width < 650 && (
              <>
                <li
                  onClick={() => {
                    setPostToEdit(null);
                  }}
                >
                  <Link href="/blog/newpost">
                    <a>New Post</a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>{user.username}</a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
      {user && width > 650 && (
        <div className={styles.loggedInLinks}>
          <div
            className={styles.newPostButton}
            onClick={() => {
              setPostToEdit(null);
            }}
          >
            <Link href="/blog/newpost">
              <a>New Post</a>
            </Link>
          </div>
          <div>{user.username}</div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
