import styles from './Contact.module.css';

export default function Resume() {
  return (
    <section id="resume" className={styles.section} aria-labelledby="resume-heading">
      <div className={styles.resumeRow}>
        <div className={styles.resumeLeft}>
          <h2 id="resume-heading" className={`${styles.heading} ${styles.resumeHeading}`}>Resume</h2>
        </div>

        <div className={styles.resumeRight}>
          <span className={styles.resumeText}>Download or view my resume:</span>
          <a href="/resume.pdf" className={styles.resumeLink} target="_blank" rel="noopener noreferrer">
            Here!
          </a>
        </div>
      </div>
      <p className={styles.resumeNote}>
        This is my master resume and is over two pages long. It is formatted to federal resume standards and commonly reduced for specific applications to include only pertinent experience.
      </p>
    </section>
  );
}
