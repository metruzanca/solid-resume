import { useParams } from "@solidjs/router";
import { Component, createSignal, onMount, Show } from "solid-js";
import Template from "~/components/Template";
import { loadResume } from "~/lib/api";
import { SolidResume } from "~/lib/solid-resume";

const Resume: Component = () => {
  const [resume, setResume] = createSignal<SolidResume>()
  const params = useParams()

  onMount(() => {
    loadResume(params.username)
      .then(setResume)
      .catch(console.log);
  })

  return (
    <Show when={resume()} keyed fallback={<div>Loading...</div>}>
      {data => (
        <div style={{ background: '#1c1e26' }}>
          <Template resume={data}/>
        </div>
      )}
    </Show>
  )
}

export default Resume
