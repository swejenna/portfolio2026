import styles from './Skills.module.css';

const skills = [
  'JavaScript',
  'Python',
  'Java',
  'React',
  'Angular',
  'Next.js',
  'Node.js',
  'Flask',
  'Pandas',
  'Matplotlib',
  'Numpy',
  'REST APIs',
  'CI/CD',
  'Data Analysis',
  'SQL',
  'Azure',
  'Git',
  'Salesforce',
  'AWS',
];

export default function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <h2 className={styles.heading}>Skills</h2>
      <div className={styles.grid}>
        {skills.map((skill) => (
          <span key={skill} className={styles.skill}>
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
