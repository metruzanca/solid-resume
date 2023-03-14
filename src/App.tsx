import { Component, createSignal, onMount, Show } from 'solid-js';
import { ResumeSchema } from './json-resume';
import Faang from './templates/Faang';
import { getResume, Template } from './utils';
import templates from './templates'
import { Dynamic } from 'solid-js/web';

if (import.meta.env.DEV) {

}

const App: Component = () => {
  const [resume, setResume] = createSignal<ResumeSchema>()
  const [template, setTemplate] = createSignal<Template>(Faang)

  onMount(async () => {
    const slugs = location.pathname.split('/')
    const username = slugs[1]
    const template = slugs[2] as keyof typeof templates
    if (template && templates?.[template]) {
      const newTemplate = templates?.[template]
      //@ts-ignore
      setTemplate(newTemplate)      
    }
    if (username) {
      const resumeJson = await getResume(username) as ResumeSchema
      setResume(resumeJson);
    }
  }) 

  return (
    // Remember, don't add any styles here.
    <Show when={resume()} keyed fallback={<div>Loading...</div>}>
      {resume => (
        <Dynamic component={template()} resume={resume}/>
      )}
    </Show>
  )
}

export default App;
