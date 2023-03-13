import { Component, createSignal, onMount, Show } from 'solid-js';
import { ResumeSchema } from './json-resume';
import Default from './templates/Default';
import { getResume, Template } from './utils';
import templates from './templates'

const App: Component = () => {
  const [resume, setResume] = createSignal<ResumeSchema>()
  const [template, setTemplate] = createSignal<Template>(Default)

  onMount(async () => {
    const slugs = location.pathname.split('/')
    const username = slugs[1]
    const template = slugs[2] as keyof typeof templates
    if (username) {
      const resumeJson = await getResume(username) as ResumeSchema
      setResume(resumeJson);
    }
    // TODO lazy component
    // if (template && templates?.[template]) {
    //   const newTemplate = templates?.[template]
    //   //@ts-ignore
    //   setTemplate(newTemplate)
    //   console.log(newTemplate);
      
    // }
  }) 
  // TODO lazy component
  const Template = template()

  return (
    <div>
      <Show when={resume()} keyed>
        {resume => (
          <Template resume={resume}/>
        )}
      </Show>
    </div>
  )
}

export default App;
