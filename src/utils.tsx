import { find } from 'lodash'
import { JSXElement } from 'solid-js';
import { SolidResume } from './types';

export async function getResume(username: string): Promise<SolidResume> {
  const response = await fetch(`https://api.github.com/users/${username}/gists`)
  const data = await response.json()
  const resumeUrl = find(data, f => {
    return f.files["resume.json"]
  });

  const gistId = resumeUrl.id;
  const fullResumeGistUrl =
    `https://gist.githubusercontent.com/${username}/${gistId}/raw?cachebust=` +
    new Date().getTime();

  const response2 = await fetch(fullResumeGistUrl)
  const resumeData = await response2.json()
  return resumeData
}


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
