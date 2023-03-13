import { createEffect, Show } from "solid-js";
import { Template } from "../utils";

const Raw: Template = (props) => {  
  createEffect(() => {
    console.log('Why? ', props.resume);
    
  })

  return (
    <>
      <Show when={props.resume}>
        <pre>
          {JSON.stringify(props.resume, null, 2)}
        </pre>
      </Show>
    </>
  )
}

export default Raw