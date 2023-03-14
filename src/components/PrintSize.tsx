import { ParentComponent } from "solid-js";

// Apparently US resumes are printed on 8.5 x 11 in paper...
// /** A4 sheet */
// const A4_SIZES = {
//   width: 2480,
//   height: 3508,
//   dpi: 300,
// }

// function getDPI() {
//   const el = document.createElement('div');
//   //@ts-ignore
//   el.style = 'width: 1in;'
//   document.body.appendChild(el);
//   const dpi = el.offsetWidth;
//   document.body.removeChild(el);

//   return dpi;
// }

// export function getA4Size() {
//   const screenDpi = getDPI()
//   return {
//     // Technically, would need to ceil these...
//     // But doing so, makes chrome add an extra page... so... 🤷
//     height: (A4_SIZES.height / A4_SIZES.dpi) * screenDpi,
//     width: (A4_SIZES.width / A4_SIZES.dpi) * screenDpi,
//     dpi: screenDpi,
//   }
// }


const PrintSize: ParentComponent = (props) => {
  return (
    <div
      class=" bg-white"
      style={{
        "max-width": '8.5in',
        "height": '11in',
      }}
    >
      {props.children}
    </div>
  )
}

export default PrintSize