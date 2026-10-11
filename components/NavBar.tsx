"use client";

import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import styles from './NavBar.module.css';

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <a href="#about" className={styles.logo} aria-label="Home">JH</a>

        <button
          className={styles.mobileToggle}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((s) => !s)}
        >
          ☰
        </button>

        <div id="primary-navigation" className={`${styles.links} ${open ? styles.open : ''}`}>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#work">Work</a>
          <a href="#resume">Resume</a>
          <a href="#contact">Contact</a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
