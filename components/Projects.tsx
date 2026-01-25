import styles from './Projects.module.css';

const projects = [
  {
    title: 'F1 Tracker',
    description: 'Front-end web application built with Next.js to track live race results and provide driver standings and race information like round number, circuit, location, and date/time. ',
    tech: ['Next.js', 'TailwindCSS', 'Vercel', 'Ergast API'],
    link: 'https://f1-tracker-drab.vercel.app',
  },
  {
    title: 'Finance Dashboard',
    description: 'IN PROGRESS: Finance dashboard for businesses to track invoices, expenses, and customers with data visualization features. Also includes user authentication and role-based access control. Database integration with PostgreSQL(Supabase).',
    tech: ['TypeScript', 'Next.js', 'TailwindCSS', 'Supabase', 'Vercel'],
    link: 'https://finance-dashboard-five-psi.vercel.app',
  },
  {
    title: 'Fireball Data Analysis',
    description: 'Data analysis project using Python to analyze fireball meteor data from NASA. Cleaned and processed the dataset, performed exploratory data analysis, and created visualizations to identify trends and patterns in fireball occurrences.',
    tech: ['Python', 'Pandas', 'Numpy', 'Matplotlib', 'NasaPy', 'Seaborn', 'Folium'],
    link: 'https://github.com/swejenna/more-projects',
  },
  {
    title: 'Interactive Map Project',
    description: 'Interactive web map application using Angular and Leaflet.js to display various geographic data layers. Features include zooming, panning, and clickable markers that provide additional information about specific regions like longitude, latitude, population, median income, and more.',
    tech: ['Angular', 'JavaScript', 'Bootstrap', 'HTML/CSS', 'Leaflet.js'],
    link: 'https://github.com/swejenna/interactive-map-project',
  }
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
