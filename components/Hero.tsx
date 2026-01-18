import ThemeToggle from './ThemeToggle';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.mobileToggle}>
        <ThemeToggle />
      </div>
      <h1 className={styles.name}>Jenna Hall</h1>
      <p className={styles.title}>Full-Stack Developer</p>
      <p className={styles.tagline}>
        Building clean, performant web experiences with robust backend systems.
      </p>
    </section>
  );
}
