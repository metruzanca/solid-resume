import { find } from 'lodash'
import { Component } from 'solid-js';
import { ResumeSchema } from './json-resume';

export async function getResume(username: string) {
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
/** This is the standard A4 sheet which is what you print on */
const A4 = {
  width: 2480,
  height: 3508,
  dpi: 300,
}

function getDPI() {
  const el = document.createElement('div');
  //@ts-ignore
  el.style = 'width: 1in;'
  document.body.appendChild(el);
  const dpi = el.offsetWidth;
  document.body.removeChild(el);

  return dpi;
}

export function getA4Size() {
  const screenDpi = getDPI()
  return {
    height: Math.ceil((A4.height / A4.dpi) * screenDpi),
    width: Math.ceil((A4.width / A4.dpi) * screenDpi),
    dpi: screenDpi,
  }
}

export type Template = Component<{ resume: ResumeSchema }>