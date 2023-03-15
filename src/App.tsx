import { Component, createSignal, Show } from 'solid-js';
import Faang from './templates/Faang';
import { getResume } from './utils';
import { Dynamic } from 'solid-js/web';
import { SolidResume } from './types';
import Monaco from './components/Monaco';

// Very peculiar that I can do this in solid. But seems to make everything load faster...

const [resume, setResume] = createSignal<SolidResume>()

const slugs = location.pathname.split('/')
const username = import.meta.env.DEV ? 'metruzanca' : slugs[1]
if (username) {
  const resumeJson = await getResume(username)
  setResume(resumeJson);
}

const App: Component = () => {
  return (
    // <Show when={resume()} keyed fallback={<div>Loading...</div>}>
    //   {data => (
    //     <Dynamic component={Faang} resume={data}/>
    //   )}
    // </Show>
    <>
      <Monaco
        value={JSON.stringify(resume(), null, 2)}
        onChange={console.log}
      />
    </>
  )
}

export default App;
