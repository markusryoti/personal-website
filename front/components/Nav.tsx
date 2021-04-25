import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from '../styles/Nav.module.css';

const Nav = () => {
  const router = useRouter();

  const currentPath = router.pathname.slice(1).split('/')[0];

  return (
    <nav className={styles.nav}>
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
      </ul>
    </nav>
  );
};

export default Nav;
