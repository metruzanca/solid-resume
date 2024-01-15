export type Gist = {
  url: string;
  id: string;
  files: Record<string, {
    filename: string;
    type: string;
    language: string;
    raw_url: string;
    size: number;
    truncated: boolean;
    content: string;
  }>
  public: boolean;
  created_at: string;
  updated_at: string;
}

const fetchJson = (url: string) => fetch(url).then(res => res.json())

export async function fetchResume(username: string): Promise<Gist> {
  const allPublicGists = await fetchJson(`https://api.github.com/users/${username}/gists`)  

  const resumeUrl = allPublicGists.find((f: any) => {
    return f.files["resume.json"]
  });

  if (resumeUrl === undefined) {
    throw new Error(`${username} does not have a gist named resume.json`)
  }

  const gistId = resumeUrl.id;
  const gist = await fetchJson(`https://api.github.com/gists/${gistId}`)

  // Snippet for busting cache if needed again
  // const fullResumeGistUrl =
  //   `https://gist.githubusercontent.com/${username}/${gistId}/raw/resume.json?cachebust=` +
  //   new Date().getTime();

  return gist
}