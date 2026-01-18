import ThemeToggle from './ThemeToggle';
import styles from './NavBar.module.css';

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <a href="#" className={styles.logo}>JD</a>
        <div className={styles.links}>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
