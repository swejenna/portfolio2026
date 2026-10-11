"use client";

import { useState } from 'react';
import styles from './Projects.module.css';

//extracts the first 4-digit year from the year string (e.g., '2020-2023' -> 2020) and sorts by that start year descending so the newest items appear first.

type ProjectItem = {
  title: string;
  year: string;
  description: string;
  tech: string[];
  link?: string;
  type?: 'experience' | 'project';
  company?: string;
  subtitle?: string;
  featured?: boolean;
};

const projects: ProjectItem[] = [
  {
    title: 'CBRN Specialist (74D)',
    company: 'U.S. Army',
    year: '2020-2023',
    description:
      'Worked in airborne operations and reconnaisance; Designed and delivered CBRN training to 300-400 personnel; maintained equipment reliability and performed calibration and repairs in extreme conditions. Achieved high mission accuracy and improved operational speed through process improvements.',
    tech: ['Microsoft Office Products'],
    type: 'experience',
  },
  {
    title: 'Sr. Supervisor',
    company: 'CW Resources',
    year: '2023-2023',
    description:
      'Designed and built a PostgreSQL database to replace paper records; implemented access controls and quality-control inspections; owned payroll processing for 80+ staff and coordinated scheduling for 50-60 personnel; QA/QC inspections; Heavy duty floor cleaning equipment maintenance.',
    tech: ['PostgreSQL'],
    type: 'experience',
  },
  {
    title: 'Jr Programmer/Analyst',
    company: 'NeXus Data Solutions, LLC',
    year: '2026-2026',
    description:
      'Provided application development and testing support using SQL, Oracle APEX, PL/SQL, and JavaScript across federal/regional fisheries programs. Built interactive dashboards, automated trigger-based reporting, and partnered with stakeholders to translate requirements into scalable solutions.',
    tech: ['OCI', 'JavaScript', 'SQLDeveloper', 'PL/SQL'],
    type: 'experience',
  },
  {
    title: 'F1 Tracker',
    year: '2024',
    description:
      'Front-end web application built with Next.js to track live race results and provide driver standings and race information like round number, circuit, location, and date/time. Solved a family pain point by removing ads and offering a clear, straightforward race tracking experience.',
    tech: ['Next.js', 'TailwindCSS', 'Vercel', 'Ergast API'],
    link: 'https://f1-tracker-drab.vercel.app',
    type: 'project',
    featured: true,
  },
  {
    title: 'Finance Dashboard',
    year: '2025',
    description:
      'IN PROGRESS: Finance dashboard for businesses to track invoices, expenses, and customers with data visualization features, authentication, and role-based access control. Personal learning / development project.',
    tech: ['TypeScript', 'Next.js', 'TailwindCSS', 'Supabase', 'Vercel'],
    link: 'https://finance-dashboard-five-psi.vercel.app',
    type: 'project',
  },
  {
    title: 'NASA Fireball Analysis',
    year: '2023',
    description:
      'Data analysis project using Python to analyze meteor data from NASA: cleaning, EDA, and visualizations to surface trends in fireball occurrences.',
    tech: ['Python', 'Pandas', 'Numpy', 'Matplotlib', 'Seaborn', 'Folium'],
    link: 'https://github.com/swejenna/more-projects', 
    type: 'project',
  },
  {
    title: 'Interactive Map Project',
    year: '2022',
    description:
      'Interactive web map using Angular and Leaflet.js to display geographic data layers with clickable markers and demographic overlays.',
    tech: ['Angular', 'JavaScript', 'Bootstrap', 'Leaflet.js'],
    link: 'https://github.com/swejenna/interactive-map-project',
    type: 'project',
    subtitle: 'Front-End Dev Project',
  },
  {
    title: 'Inventory Management System',
    year: '2026',
    description:
      'WinForms management system to demonstrate OOP and track inventory and inventory parts. Built with C# and WinForms to show desktop application design and object-oriented principles.',
    tech: ['C#', 'WinForms'],
    link: 'https://github.com/swejenna/inventorymanagementapplication',
    type: 'project',
    subtitle: '(Software | OOP Project)',
  },
  {
    title: 'Vacation Site',
    year: '2026',
    description:
      'Vacation website for tourists built with HTML, CSS, and vanilla JavaScript to demonstrate UX design principles and static site techniques.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://github.com/swejenna/d479-tanitian-website',
    type: 'project',
    subtitle: 'UX Design Project',
  },
  {
    title: 'pokemonTCG search',
    year: '2025',
    description:
      'Search application built with Python and Flask using the PokemonTCG API. Search by Pokémon name and display the top 5 most notable cards by price. Personal learning / development project.',
    tech: ['Python', 'Flask', 'PokemonTCG API'],
    link: 'https://github.com/swejenna/pokemonTCG',
    type: 'project',
    subtitle: 'Search',
  },
  {
    title: 'Alaska E-landing App',
    year: '2024',
    description:
      'Personal web application for pilots to help Alaskan pilots find emergency landing locations (public & private). Uses Alaska 511 data and pilot-focused UX patterns. Personal learning / development project.',
    tech: ['TypeScript', 'Angular', 'Alaska 511 API'],
    link: 'https://github.com/swejenna/ak-airports-app',
    type: 'project',
    subtitle: 'Alaskan pilot support',
  },
  {
    title: 'Voting App',
    year: '2024',
    description:
      "CLI 'blockchain' based voting app implemented in Java to demonstrate OOP principles and basic ledger concepts. Personal learning / development project.",
    tech: ['Java'],
    link: 'https://github.com/swejenna/VotingApp',
    type: 'project',
    subtitle: 'CLI / OOP project',
  },
];

export default function Projects() {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggleExpanded = (idx: number) => {
    setExpanded((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Sort items by start year (descending). Handle ranges like "2020-2023" by taking start.
  const sorted = [...projects].sort((a, b) => {
    const getStart = (y: string) => {
      const m = y.match(/\d{4}/);
      return m ? parseInt(m[0], 10) : 0;
    };
    const aStart = getStart(a.year);
    const bStart = getStart(b.year);
    if (aStart !== bStart) return bStart - aStart;

    // If start years are equal, prefer experience entries before projects so
    // roles (experience) appear above projects with the same year.
    if (a.type === 'experience' && b.type !== 'experience') return -1;
    if (b.type === 'experience' && a.type !== 'experience') return 1;

    return 0;
  });

  // Special-case ordering: user requested the "Jr Programmer/Analyst" experience
  // to appear after the Finance Dashboard entry. If both exist, move Jr Programmer
  // to directly follow Finance Dashboard in the sorted list.
  try {
    const jrIndex = sorted.findIndex((p) => p.title === 'Jr Programmer/Analyst');
    const financeIndex = sorted.findIndex((p) => p.title === 'Finance Dashboard');
    if (jrIndex > -1 && financeIndex > -1) {
      const [jrItem] = sorted.splice(jrIndex, 1);
      // Recompute insertion index in case removing jrItem shifted indices
      const insertAt = sorted.findIndex((p) => p.title === 'Finance Dashboard');
      sorted.splice(insertAt + 1, 0, jrItem);
    }
  } catch (e) {
    // fail silently — sorting fallback is original chronological order
    // console.error(e);
  }

  return (
    <section id="work" className={styles.section} aria-labelledby="projects-heading">
      <h2 id="projects-heading" className={styles.heading}>
        Experience + Projects (my timeline)
      </h2>
      <p className={styles.subHeading}>Hover to view more about a role/project</p>

      <div className={styles.timeline}>
        <ol className={styles.list}>
          {sorted.map((project, idx) => {
            const isExpanded = !!expanded[idx];
            return (
              <li key={project.title} className={`${styles.item} ${project.type === 'experience' ? styles.left : styles.right}`}>
                <div className={styles.marker} aria-hidden="true">
                  <span className={styles.stud} aria-hidden="true" />
                </div>
                <a
                  className={`${styles.card} ${isExpanded ? styles.expanded : ''}`}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={0}
                  aria-describedby={`project-desc-${idx}`}
                >
                <div className={`${styles.cardInner} ${project.featured ? styles.featured : ''}`}>
                    <div className={styles.cardHeader}>
                      <div>
                        <h3 className={styles.title}>{project.title}</h3>
                        {project.subtitle && <div className={styles.subtitle}>{project.subtitle}</div>}
                        {project.type === 'experience' && (
                          <>
                            <div className={styles.titleRule} />
                            <div className={styles.company}>{project.company}</div>
                          </>
                        )}
                      </div>

                      <div className={styles.headerRight}>
                        <time className={styles.time} dateTime={project.year}>
                          {project.year}
                        </time>
                        {project.featured && <span className={styles.star} aria-hidden>★</span>}
                        <button
                          className={styles.infoBtn}
                          aria-label={isExpanded ? `Hide details for ${project.title}` : `Show details for ${project.title}`}
                          aria-expanded={isExpanded}
                          onClick={(e) => {
                            // prevent navigation when toggling details
                            e.preventDefault();
                            e.stopPropagation();
                            toggleExpanded(idx);
                          }}
                        >
                          i
                        </button>
                      </div>
                    </div>

                    <p id={`project-desc-${idx}`} className={`${styles.description}`}>
                      {project.description}
                    </p>

                    <div className={styles.tech} aria-hidden>
                      {project.tech.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  </div>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
