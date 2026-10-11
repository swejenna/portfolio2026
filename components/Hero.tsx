import ThemeToggle from './ThemeToggle';
import styles from './Hero.module.css';
import { clearPreviewData } from 'next/dist/server/api-utils';

export default function Hero() {
  return (
    <section id="about" className={styles.hero}>
      <div className={styles.mobileToggle}>
        <ThemeToggle />
      </div>
      <h1 className={styles.name}>Jenna Hall</h1>
      <p className={styles.title}>prev. jr. programmer/analyst @ NeXus Data Solutions</p>
      <p className={styles.tagline}>
        With heavy interest in software engineering, data analysis, machine learning, embedded software, and AI.
      </p>
    </section>
  );
}
