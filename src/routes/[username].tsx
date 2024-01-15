import { useParams } from "@solidjs/router";
import clsx from "clsx";
import { Component, createSignal, For, onMount, Show } from "solid-js";
import Template from "~/components/Template";
import { fetchResume, Gist } from "~/lib/api";
import { SolidResume } from "~/types/solid-resume";

const DEFAULT_RESUME = 'resume.json'

const fields = {
  variant: 'variant',
  censor: 'censor',
}

const Resume: Component = () => {
  const [files, setFiles] = createSignal<Record<string, SolidResume>>({})
  const [resume, setResume] = createSignal<SolidResume>();
  const params = useParams()

  onMount(async () => {
    const data = await fetchResume(params.username)
    
    const files: Record<string, SolidResume> = {}
    for(const key in data.files) {
      const file = data.files[key]
      files[key] = JSON.parse(file.content)
    }
    setFiles(files)
    setResume(files[DEFAULT_RESUME])
  })

  const handleFormChange = (e: Event) => {
    const form = (e.target as HTMLInputElement)?.form
    if (!form) return
    const fd = new FormData(form)
    const variant = fd.get(fields.variant)?.toString()
    const censor = fd.get(fields.censor)?.toString()

    let selectedVariant = files()[variant || DEFAULT_RESUME]

    if (censor) {
      // We're deleting entries, so make a copy first
      selectedVariant = structuredClone(selectedVariant)
      selectedVariant.basics!.profiles = []
      selectedVariant.basics!.email = undefined
      selectedVariant.basics!.phone = undefined
      selectedVariant.basics!.name = selectedVariant.basics!.name!.split(' ')[0]
    }

    setResume(selectedVariant)
  }

  const [editMode, setEditMode] = createSignal(false);
  onMount(() => {
    document.addEventListener('keydown', e => {
      if (e.key === 'e' && e.ctrlKey) {
        e.preventDefault()
        setEditMode(prev => !prev)
      }
    })
  })

  return (
    <>
      <div class={clsx("print:hidden absolute prose p-2 px-4", editMode() ? 'block' : 'hidden')}>
        <form
          onSubmit={e => e.preventDefault()}
          onChange={handleFormChange}
        >
          <h3>Select Resume Variant</h3>
          <select class="select select-bordered w-full max-w-xs" name={fields.variant}>
            <For each={Object.keys(files())} children={file => (
              <option value={file} selected={file === DEFAULT_RESUME}>{file.slice(0, -5)}</option>
            )}/>
          </select>


          <h3>Censor Resume</h3>
          <input type="checkbox" class="checkbox" name={fields.censor}/>


          <hr />
          
          Literally, just print it. (<i class="text-xs">ctrl/cmd + P</i>)
        </form>
      </div>
      <Show when={resume()} keyed fallback={<div>Loading...</div>}>
        {data => (
          <div style={{ background: '#1c1e26' }}>
            <Template resume={data}/>
          </div>
        )}
      </Show>
    </>
  )
}

export default Resume
