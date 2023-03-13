import { Component, createEffect, createSignal, onMount, Show } from 'solid-js';
import { ResumeSchema } from './json-resume';
import Default from './templates/Default';
import { getResume, Template } from './utils';
import templates from './templates'
import { Dynamic } from 'solid-js/web';

const App: Component = () => {
  const [resume, setResume] = createSignal<ResumeSchema>()
  const [template, setTemplate] = createSignal<Template>(Default)

  onMount(async () => {
    const slugs = location.pathname.split('/')
    const username = slugs[1]
    const template = slugs[2] as keyof typeof templates
    if (template && templates?.[template]) {
      const newTemplate = templates?.[template]
      //@ts-ignore
      setTemplate(newTemplate)
      console.log(newTemplate);
      
    }
    if (username) {
      const resumeJson = await getResume(username) as ResumeSchema
      setResume(resumeJson);
    }
  }) 

  createEffect(() => {
    console.log('template', template());
    
  })

  return (
    <div>
      <Show when={resume()} keyed fallback={<div>Loading...</div>}>
        {resume => (
          <Dynamic component={template()} resume={resume}/>
        )}
      </Show>
    </div>
  )
}

export default App;
