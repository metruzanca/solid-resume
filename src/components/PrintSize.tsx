import { ParentComponent } from "solid-js";

/** This is the standard A4 sheet which is what you print on */
const A4 = {
  width: 2480,
  height: 3508,
  dpi: 300,
}

function getDPI() {
  const el = document.createElement('div');
  //@ts-ignore
  el.style = 'width: 1in;'
  document.body.appendChild(el);
  const dpi = el.offsetWidth;
  document.body.removeChild(el);

  return dpi;
}

export function getA4Size() {
  const screenDpi = getDPI()
  return {
    // Technically, would need to ceil these...
    // But doing so, makes chrome add an extra page... so... 🤷
    height: (A4.height / A4.dpi) * screenDpi,
    width: (A4.width / A4.dpi) * screenDpi,
    dpi: screenDpi,
  }
}


const PrintSize: ParentComponent = (props) => {
  const sizes = getA4Size()  
  return (
    <div
      class=" bg-white"
      style={{
        "max-width": `${sizes.width}px`,
        "height": `${sizes.height - 1}px`,
      }}
    >
      {props.children}
    </div>
  )
}

export default PrintSize