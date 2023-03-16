import { Component, createSignal, Show } from 'solid-js';
import Faang from './templates/Faang';
import { getResume } from './utils';
import { Dynamic } from 'solid-js/web';
import { SolidResume } from './types';

// Very peculiar that I can do this in solid. But seems to make everything load faster...

const [resume, setResume] = createSignal<SolidResume>()

const slugs = location.pathname.split('/')

let username = slugs[1]

if (import.meta.env.DEV) {
  const id = parseInt(username)
  if (!Number.isNaN(id)) {
    const { resumes } = await import('./tests/data.json')
    username = resumes[id]
  }
}
if (username) {
  const resumeJson = await getResume(username)
  setResume(resumeJson);
}


const App: Component = () => {
  return (
    <Show when={resume()} keyed fallback={<div>Loading...</div>}>
      {data => (
        <Dynamic component={Faang} resume={data}/>
      )}
    </Show>
  )
}

export default App;
