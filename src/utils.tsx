import { JSXElement } from 'solid-js';
import { Profile, Skills } from './types';

export const anchor = (text: string, link: string) => (
  <a class='text-blue-800 font-semibold' href={link}>{text}</a>
)

// Theres probably a better way to do this
export function replaceMarkdownLinks(markdown: string, transform: (text: string, link: string) => JSXElement = anchor): JSXElement {
  // Get all markdown links
  const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm
  const matches = markdown.match(regexMdLinks)
  if (!matches) return markdown
  
  const singleMatch = /\[([^\[]+)\]\((.*)\)/
  const segments = []  

  for (const match of matches) {
    // Find where the link starts, save all text up to the link.
    // Then trash it along with the link
    const idx = markdown.indexOf(match)
    segments.push(markdown.slice(0, idx))
    markdown = markdown.slice(idx + match.length)
    
    const [full, text, link] = singleMatch.exec(match)!
    const element = transform(text, link)
    segments.push(element)      
  }
  segments.push(markdown)
  
  return segments
}

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