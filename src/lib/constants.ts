export const ACCENTS = {
  home: '#2DD4BF',
  projects: '#F5A623',
  publications: '#A78BFA',
  experience: '#38BDF8',
  certifications: '#FB7185',
  accomplishments: '#34D399',
};

export const hexToRgba = (hex: string, alpha = 1) => {
  let clean = hex.replace('#', '');
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Projects', href: '#projects' },
  { name: 'Publications', href: '#publications' },
  { name: 'Experience', href: '#experience' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Accomplishments', href: '#accomplishments' },
];
