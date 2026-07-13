import { getCollection } from 'astro:content';

export async function getSortedProjects() {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
}

export async function getSortedPublications() {
  const publications = await getCollection('publications');
  return publications.sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
}

export async function getSortedExperience() {
  const experience = await getCollection('experience');
  return experience.sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
}

export async function getSortedCertifications() {
  const certifications = await getCollection('certifications');
  return certifications.sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
}

export async function getSortedAccomplishments() {
  const accomplishments = await getCollection('accomplishments');
  return accomplishments.sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
}
