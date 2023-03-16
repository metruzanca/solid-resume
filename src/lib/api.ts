import { find } from "lodash";
import { SolidResume } from "../types";

async function fetchResume(username: string): Promise<SolidResume> {
  const response = await fetch(`https://api.github.com/users/${username}/gists`)
  const data = await response.json()
  const resumeUrl = find(data, f => {
    return f.files["resume.json"]
  });

  if (resumeUrl === undefined) {
    throw new Error(`${username} does not have a gist named resume.json`)
  }

  const gistId = resumeUrl.id;
  const fullResumeGistUrl =
    `https://gist.githubusercontent.com/${username}/${gistId}/raw?cachebust=` +
    new Date().getTime();

  const response2 = await fetch(fullResumeGistUrl)
  const resumeData = await response2.json()
  return resumeData
}

export async function loadResume(username: string) {
  // If dev, we can insert numbers to index an array of users that use jsonResume/solidResume 
  if (import.meta.env.DEV) {
    const id = parseInt(username)
    if (!Number.isNaN(id)) {
      const { resumes } = await import('../tests/data.json')
      if (resumes[id]) {
        username = resumes[id]
      } else {
        throw new Error(`Index provided out of bounds for ${resumes.length} resumes.`)
      }
    }
  }

  const resumeJson = await fetchResume(username)
  return resumeJson
}
