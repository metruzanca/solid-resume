import { Component } from "solid-js";
import { ResumeSchema } from "../json-resume";

const Default: Component<{resume?: ResumeSchema}> = (prop) => {

  return (
    <pre>
      {JSON.stringify(prop.resume, null, 2)}
    </pre>
  )
}

export default Default
