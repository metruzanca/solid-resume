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

export type Template = Component<{ resume: ResumeSchema }>