import { Component } from "solid-js";
import markdown from 'markdown-it'
const md = markdown()
import './style.css'

const Markdown: Component<{ text: string }> = (props) => (
  <span class="md" innerHTML={md.renderInline(props.text)} />
)
export default Markdown;
