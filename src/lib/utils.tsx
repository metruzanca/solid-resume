import { format, parseISO } from 'date-fns';
import { Profile, SkillCategory } from '~/types/solid-resume';

export function getProfile(profiles: Profile[] = [], target: string) {
  const item = profiles.find(item => item.network.toLowerCase() === target)
  return item
}

export function allSkills(skills: SkillCategory[] = []) {
  const all = []
  for (const category of skills) {
    all.push(...category.keywords)
  }
  return all
}

export function formatDate(dateString?: string, defaultValue: string = '') {
  return dateString ? format(parseISO(dateString), 'MMM yyyy') : defaultValue
}