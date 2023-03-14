import { ParentComponent } from "solid-js";
import styles from './styles.module.css'

const PrintSize: ParentComponent = (props) => {
  return (
    <div class={styles.print}>
      {props.children}
    </div>
  )
}

export default PrintSize