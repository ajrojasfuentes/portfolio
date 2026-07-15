import { getCollection } from 'astro:content';

export async function getSortedProjects() {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
}

export async function getSortedPublications() {
  const publications = await getCollection('publications');
  return publications.sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
}

function parseDateStrings(period: string) {
  const parts = period.replace(/–/g, '-').split('-').map(s => s.trim());
  const startStr = parts[0];
  const endStr = parts.length > 1 ? parts[1] : parts[0];

  const parseSingle = (str: string) => {
    if (str.toLowerCase() === 'present') return Infinity;
    const date = new Date(str);
    return isNaN(date.getTime()) ? 0 : date.getTime();
  };

  return {
    start: parseSingle(startStr),
    end: parseSingle(endStr),
  };
}

const CATEGORY_PRIORITY: Record<string, number> = {
  milestone: 4,
  job: 3,
  project: 2,
  volunteering: 1,
};

export async function getSortedExperience() {
  const experience = await getCollection('experience');
  return experience.sort((a, b) => {
    const datesA = parseDateStrings(a.data.period);
    const datesB = parseDateStrings(b.data.period);
    
    // 1. End date descending (newest first)
    if (datesB.end !== datesA.end) {
      return datesB.end - datesA.end;
    }
    // 2. Start date descending
    if (datesB.start !== datesA.start) {
      return datesB.start - datesA.start;
    }
    // 3. Category priority (highest first)
    const priorityA = CATEGORY_PRIORITY[a.data.category] || 0;
    const priorityB = CATEGORY_PRIORITY[b.data.category] || 0;
    return priorityB - priorityA;
  });
}

export async function getSortedCertifications() {
  const certifications = await getCollection('certifications');
  return certifications.sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
}

export async function getSortedAccomplishments() {
  const accomplishments = await getCollection('accomplishments');
  return accomplishments.sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
}
