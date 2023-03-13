import { Template } from "../utils";

const Raw: Template = (props) => {
  return (
    <pre>
      {JSON.stringify(props.resume, null, 2)}
    </pre>
  )
}

export default Raw