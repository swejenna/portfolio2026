"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './Skills.module.css';

type Skill = {
  name: string;
  categories: string[];
  description?: string;
};

const SKILLS_KEY = 'selected_skills_v1';

const skillsData: Skill[] = [
  // Certifications
  { name: 'Front End Development (WGU)', categories: ['Certifications'], description: 'Front-end coursework and projects' },
  { name: 'CompTIA Project+ (ce)', categories: ['Certifications'], description: 'Project management certification' },
  { name: 'Front End Developer (freeCodeCamp)', categories: ['Certifications'], description: 'freeCodeCamp certification' },

  // Languages
  { name: 'JavaScript', categories: ['Languages'], description: 'ES6+, DOM, tooling' },
  { name: 'TypeScript', categories: ['Languages'], description: 'Static types for JS, interfaces, generics' },
  { name: 'C#/.NET', categories: ['Languages'], description: '.NET core, WebAPI' },
  { name: 'Python', categories: ['Languages', 'Data'], description: 'Scripting, data analysis, automation' },
  { name: 'PL/SQL', categories: ['Languages', 'Data'], description: 'Oracle PL/SQL programming' },
  { name: 'HTML/CSS', categories: ['Languages'], description: 'Semantic markup and responsive CSS' },
  { name: 'R', categories: ['Languages', 'Data'], description: 'Statistical programming' },
  { name: 'SQL', categories: ['Languages', 'Data'], description: 'Relational DB queries' },

  // Data
  { name: 'Pandas', categories: ['Data'], description: 'Dataframes and ETL' },
  { name: 'NumPy', categories: ['Data'], description: 'Numerical computing' },
  { name: 'Matplotlib', categories: ['Data'], description: 'Plotting and visualization' },
  { name: 'Seaborn', categories: ['Data'], description: 'Statistical visualization' },
  { name: 'Folium', categories: ['Data'], description: 'Interactive maps' },
  { name: 'Oracle APEX', categories: ['Data'], description: 'Low-code Oracle applications' },
  { name: 'PostgreSQL', categories: ['Data'], description: 'Relational database' },
  { name: 'MySQL', categories: ['Data'], description: 'Relational database' },
  { name: 'SQL Developer', categories: ['Data'], description: 'Oracle SQL tooling' },

  // Cloud
  { name: 'AWS', categories: ['Cloud'], description: 'Amazon Web Services' },
  { name: 'Azure', categories: ['Cloud'], description: 'Microsoft Azure' },
  { name: 'OCI', categories: ['Cloud'], description: 'Oracle Cloud Infrastructure' },

  // Frameworks
  { name: 'React', categories: ['Frameworks'], description: 'Component-driven UI, hooks' },
  { name: 'Angular', categories: ['Frameworks'], description: 'SPA framework, RxJS' },
  { name: 'Next.js', categories: ['Frameworks'], description: 'SSR/SSG and routing' },
  { name: 'ASP.NET Core', categories: ['Frameworks'], description: 'Web APIs and MVC' },
  { name: 'Flask', categories: ['Frameworks'], description: 'Lightweight Python web framework' },
  { name: 'WinForms', categories: ['Frameworks'], description: 'Desktop UI framework' },

  // Tools
  { name: 'Git/GitHub', categories: ['Tools'], description: 'Version control and collaboration' },
  { name: 'CI/CD', categories: ['Tools'], description: 'Pipelines and automation' },
  { name: 'REST APIs', categories: ['Tools'], description: 'API design and consumption' },
  { name: 'Salesforce', categories: ['Tools'], description: 'CRM platforms' },
  { name: 'Quarto', categories: ['Tools'], description: 'Scientific publishing' },
  { name: 'YAML/YML', categories: ['Tools'], description: 'Configuration files' },
  { name: 'Jira', categories: ['Tools'], description: 'Issue tracking' },
  { name: 'UKG UltiPro', categories: ['Tools'], description: 'Payroll/HCM platform' },
  { name: 'Node.js', categories: ['Tools'], description: 'Server-side JavaScript runtime' },
];

export default function Skills() {
  const categories = useMemo(() => {
    // Narrowed categories in required order
    return ['All', 'Certifications', 'Languages', 'Data', 'Cloud', 'Frameworks', 'Tools'];
  }, []);

  // Start filtered view on Languages by default
  const [activeCategory, setActiveCategory] = useState<string>('Languages');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [detail, setDetail] = useState<Skill | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SKILLS_KEY);
      if (raw) setSelected(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(SKILLS_KEY, JSON.stringify(selected));
    } catch {}
  }, [selected]);

  const filtered = useMemo(() => {
    return skillsData.filter((s) => {
      const matchesCategory = activeCategory === 'All' || s.categories.includes(activeCategory);
      const matchesQuery = s.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const toggleSelected = (name: string) => setSelected((prev) => ({ ...prev, [name]: !prev[name] }));

  const clearFilters = () => {
    setActiveCategory('All');
    setQuery('');
  };

  // Modal keyboard handling
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && detail) {
        setDetail(null);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [detail]);

  useEffect(() => {
    if (detail && closeBtnRef.current) closeBtnRef.current.focus();
  }, [detail]);

  return (
    <section id="skills" className={styles.section} aria-labelledby="skills-heading">
      <h2 id="skills-heading" className={styles.heading}>
        Skills
      </h2>

      <div className={styles.controls}>
        <div className={styles.filters} role="toolbar" aria-label="Filter skills by category">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterChip} ${activeCategory === cat ? styles.active : ''}`}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.searchWrap}>
          <label htmlFor="skill-search" className={styles.hiddenLabel}>
            Search skills
          </label>
          <input
            id="skill-search"
            className={styles.search}
            placeholder="Search skills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search skills"
          />
          <button className={styles.clearBtn} onClick={clearFilters} aria-label="Clear filters">
            Clear
          </button>
        </div>
      </div>

      <div className={styles.grid} role="list" aria-live="polite">
        {filtered.length === 0 ? (
          <p className={styles.noResults}>No skills match your filters.</p>
        ) : (
          filtered.map((skill) => {
            const isSelected = !!selected[skill.name];
            return (
              <button
                key={skill.name}
                role="listitem"
                className={`${styles.skill} ${isSelected ? styles.skillActive : ''}`}
                onClick={() => toggleSelected(skill.name)}
                onDoubleClick={() => setDetail(skill)}
                aria-pressed={isSelected}
                title={`Toggle ${skill.name}. Double-click to view details.`}
              >
                <span className={styles.skillName}>{skill.name}</span>
                <span className={styles.skillTags} aria-hidden>
                  {skill.categories.join(' • ')}
                </span>
              </button>
            );
          })
        )}
      </div>

      {detail && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-labelledby="skill-modal-title">
          <div className={styles.modal}>
            <h3 id="skill-modal-title" className={styles.modalTitle}>
              {detail.name}
            </h3>
            <p className={styles.modalDesc}>{detail.description ?? 'No details provided.'}</p>
            <p className={styles.modalCats}>Categories: {detail.categories.join(', ')}</p>
            <div className={styles.modalActions}>
              <button ref={closeBtnRef} onClick={() => setDetail(null)} className={styles.closeBtn}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}