import { Component, JSXElement } from 'solid-js';

const Anchor: Component<{ text: string, link: string }> = (props) => (
  <a class='text-blue-800 font-semibold' href={props.link}> {props.text} </a>
)

const InlineMarkdown: Component<{ text: string }> = (props) => {

  // TODO make this reactive

  let markdown = props.text
  // Get all markdown links
  const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm
  const matches = markdown.match(regexMdLinks)
  if (!matches) return markdown

  const singleMatch = /\[([^\[]+)\]\((.*)\)/
  const segments = []

  for (const match of matches) {
    // Find where the link starts, save all text up to the link.
    // Then trash it along with the link
    const idx = markdown.indexOf(match)
    segments.push(markdown.slice(0, idx))
    markdown = markdown.slice(idx + match.length)

    const [full, text, link] = singleMatch.exec(match)!
    const element = Anchor({ text, link })
    segments.push(element)
  }
  segments.push(markdown)

  console.log(segments);
  

  return (
    <p>{segments}</p>
  );
};

export default InlineMarkdown