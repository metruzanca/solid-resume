import { Component, createSignal, onMount } from 'solid-js';
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
    <Default resume={resume()}/>
  )
}

export default App;
