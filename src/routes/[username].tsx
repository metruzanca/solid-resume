import { useParams } from "@solidjs/router";
import { Component, createSignal, onMount, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import Faang from "~/components/templates/Faang";
import { loadResume } from "../lib/api";
import { SolidResume } from "../lib/types";

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
          <Dynamic component={Faang} resume={data}/>
        </div>
      )}
    </Show>
  )
}

export default Resume
