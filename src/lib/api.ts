import axios from "axios";
import { SolidResume } from "./types";

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

// const [token, setToken] = createSignal();

// const githubAuthed = axios.create({
//   baseURL: 'https://api.github.com/',
// }).interceptors.request.use(config => {
//   config.headers.Authorization = `Bearer `
// })

// Docs https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps
export const github = {
  authorizeApp() {
    const params = new URLSearchParams()
    params.set('client_id', process.env.GITHUB_APP_ID!)
    if (import.meta.env.DEV) {
      // params.set('redirect_uri', location.origin + '/oauth')
    }
    params.set('scopes', ['gist'].join(' '))

    const url = 'https://github.com/login/oauth/authorize?' + params.toString()
    location.href = url
  },
  // TODO Right, I need solid start now...
  async getAccessToken(code: string) {
    const response = await fetch(`/api/oauth?code=${code}`)
    return response.json()
  }
}