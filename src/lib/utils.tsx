import { Profile, Skills } from './types';

export function getProfile(profiles: Profile[] = [], target: string) {
  const item = profiles.find(item => item.network.toLowerCase() === target)
  return item
}

export function allSkills(skills: Skills[] = []) {
  const all = []
  for (const category of skills) {
    all.push(...category.keywords)
  }
  return all
}