import { createEffect } from "solid-js";
import PrintSize from "../components/PrintSize";
import { Template } from "../lib/types";

const Raw: Template = (props) => {    
  const json = () => {
    const data = JSON.stringify(props.resume, null, 2)
    console.log(data);
    return data
  }

  createEffect(() => {
    console.log(props.resume);
    
  })

  return (
    <>
      <PrintSize>
        {!props.resume && (
          <div>Loading...</div>
        )}
        <pre>
          {json()}
        </pre>
      </PrintSize>
    </>
  )
}

export default Raw