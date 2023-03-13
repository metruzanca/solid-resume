import { ParentComponent } from "solid-js";
import { getA4Size } from "../utils";

const PrintSize: ParentComponent = (props) => {
  const sizes = getA4Size()
  console.log(sizes);
  
  return (
    <div
      class="flex justify-center items-center bg-white"
      style={{
        "max-width": `${sizes.width}px`,
        "max-height": `${sizes.height}px`,
      }}
    >
      {props.children}
    </div>
  )
}

export default PrintSize