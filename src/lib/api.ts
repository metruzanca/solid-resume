import { SolidResume } from "./solid-resume";

async function fetchResume(username: string): Promise<SolidResume> {
  const response = await fetch(`https://api.github.com/users/${username}/gists`)
  const data = await response.json()
  const resumeUrl = data.find((f: any) => {
    return f.files["resume.json"]
  });

  if (resumeUrl === undefined) {
    throw new Error(`${username} does not have a gist named resume.json`)
  }

  const gistId = resumeUrl.id;
  const fullResumeGistUrl =
    `https://gist.githubusercontent.com/${username}/${gistId}/raw/resume.json?cachebust=` +
    new Date().getTime();

  const response2 = await fetch(fullResumeGistUrl)
  const resumeData = await response2.json()
  return resumeData
}

export async function loadResume(username: string) {
  const resumeJson = await fetchResume(username)
  return resumeJson
}
