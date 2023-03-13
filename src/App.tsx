import { Component, createSignal, onMount, Show } from 'solid-js';
import { ResumeSchema } from './json-resume';
import Default from './templates/Default';
import { getResume } from './utils';

const App: Component = () => {
  const [resume, setResume] = createSignal<ResumeSchema>()

  onMount(async () => {
    const [_,username] = location.pathname.split('/')
    if (username) {
      const resumeJson = await getResume(username) as ResumeSchema
      setResume(resumeJson);
    }
  }) 

  return (
    <div>
      <Show when={resume()} keyed>
        {resume => (
          <Default resume={resume}/>
        )}
      </Show>
    </div>
  )
}

export default App;
