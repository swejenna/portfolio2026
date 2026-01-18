import styles from './Projects.module.css';

const projects = [
  {
    title: 'F1 Tracker',
    description: 'Front-end web application built with Next.js to track live race results and provide driver standings and race information like round number, circuit, location, and date/time. ',
    tech: ['Next.js', 'TailwindCSS', 'Vercel', 'Ergast API'],
    link: 'https://f1-tracker-three.vercel.app',
  },
  {
    title: 'Finance Dashboard',
    description: 'CLI tool for automating development workflows and boosting productivity.',
    tech: ['TypeScript', 'Node.js'],
    link: 'https://github.com',
  },
  {
    title: 'Project Gamma',
    description: 'Mobile-first e-commerce platform with payment integration.',
    tech: ['Next.js', 'Stripe', 'MongoDB'],
    link: 'https://github.com',
  },
];

export default function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <h2 className={styles.heading}>Projects</h2>
      <div className={styles.grid}>
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h3 className={styles.title}>{project.title}</h3>
            <p className={styles.description}>{project.description}</p>
            <div className={styles.tech}>
              {project.tech.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
