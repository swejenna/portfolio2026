"use client";

import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'site_a11y_prefs_v1';

type Prefs = {
  largeText: boolean;
  highContrast: boolean;
  reduceMotion: boolean;
  grayscale: boolean;
};

const defaultPrefs: Prefs = {
  largeText: false,
  highContrast: false,
  reduceMotion: false,
  grayscale: false,
};

export default function AccessibilityWidget() {
  const [prefs, setPrefs] = useState<Prefs>(defaultPrefs);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setPrefs(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('a11y-large-text', prefs.largeText);
    root.classList.toggle('a11y-high-contrast', prefs.highContrast);
    root.classList.toggle('a11y-reduced-motion', prefs.reduceMotion);
    root.classList.toggle('a11y-grayscale', prefs.grayscale);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {}
  }, [prefs]);

  const toggle = (k: keyof Prefs) => setPrefs((p) => ({ ...p, [k]: !p[k] }));

  return (
    <div className="a11y-widget" aria-label="Accessibility controls" role="region">
      <button
        className="a11y-toggle"
        aria-expanded={open}
        aria-controls="a11y-controls"
        onClick={() => setOpen((s) => !s)}
        aria-label={open ? 'Close accessibility controls' : 'Open accessibility controls'}
      >
        {/* accessibility icon (SVG) */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
          <path d="M12 2a5 5 0 015 5v1h-2V7a3 3 0 10-6 0v1H7V7a5 5 0 015-5z" fill="currentColor" />
          <path d="M12 12c2.21 0 4 1.79 4 4v4h-2v-4a2 2 0 00-4 0v4H8v-4c0-2.21 1.79-4 4-4z" fill="currentColor" />
        </svg>
      </button>

      <div
        id="a11y-controls"
        className={`a11y-controls ${open ? 'open' : ''}`}
        aria-hidden={!open}
      >
        <button onClick={() => toggle('largeText')} aria-pressed={prefs.largeText} aria-label={prefs.largeText ? 'Disable larger text' : 'Enable larger text'}>
          A+/-
        </button>
        <button onClick={() => toggle('highContrast')} aria-pressed={prefs.highContrast} aria-label={prefs.highContrast ? 'Disable high contrast' : 'Enable high contrast'}>
          Contrast
        </button>
        <button onClick={() => toggle('grayscale')} aria-pressed={prefs.grayscale} aria-label={prefs.grayscale ? 'Disable grayscale' : 'Enable grayscale'}>
          Grayscale
        </button>
        <button onClick={() => toggle('reduceMotion')} aria-pressed={prefs.reduceMotion} aria-label={prefs.reduceMotion ? 'Disable reduced motion' : 'Enable reduced motion'}>
          Motion
        </button>
        <a className="a11y-skip" href="#main" onClick={() => setOpen(false)}>
          Skip to content
        </a>
      </div>
    </div>
  );
}
