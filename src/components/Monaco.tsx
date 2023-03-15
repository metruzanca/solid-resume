import * as monaco from 'monaco-editor';
import { Component, onMount } from 'solid-js';

// See https://github.com/microsoft/monaco-editor/blob/HEAD/docs/integrate-esm.md

self.MonacoEnvironment = {
  getWorker: function (workerId, label) {
    //@ts-ignore
    const getWorkerModule = (moduleUrl, label) => {
      //@ts-ignore
      return new Worker(self.MonacoEnvironment.getWorkerUrl(moduleUrl), {
        name: label,
        type: 'module'
      });
    };

    switch (label) {
      case 'json':
        return getWorkerModule('/monaco-editor/esm/vs/language/json/json.worker?worker', label);
      case 'css':
      case 'scss':
      case 'less':
        return getWorkerModule('/monaco-editor/esm/vs/language/css/css.worker?worker', label);
      case 'html':
      case 'handlebars':
      case 'razor':
        return getWorkerModule('/monaco-editor/esm/vs/language/html/html.worker?worker', label);
      case 'typescript':
      case 'javascript':
        return getWorkerModule('/monaco-editor/esm/vs/language/typescript/ts.worker?worker', label);
      default:
        return getWorkerModule('/monaco-editor/esm/vs/editor/editor.worker?worker', label);
    }
  }
};


// Playground: https://microsoft.github.io/monaco-editor/playground.html?source=v0.36.1#XQAAAAKyAQAAAAAAAABBqQkHQ5NjdMjwa-jY7SIQ9S7DNlzs5W-mwj0fe1ZCDRFc9ws9XQE0SJE1jc2VKxhaLFIw9vEWSxW3yscwz2KiCfGetpSDh57NQYQ2asNajdoyJU_6FVgMJLB2BzSSWdZxaVqpx4iTYX0ay0Fghs7NpdevmGdBWz1S2V-ivQu16T4owxixU-f351WYPvPGdWMsXFUNJq4VPY2SQnX6kEVS3tCXa9lUW4Q9wN3n5T66AWHyFhdmaltxMT9fSYa1smaT9ScTb4ofYtGEiUfg8Ggkgx6NO2ON7lfCpcQyzfM2bq_WrOhcsT-fIzmX8uIg6G6earIiQZXgFhgzGNQw4Sp-sIN8aYzeGp1v7ITm1Eu_Y3n2FaeNe71cpOYPrCPJEhz-TvPYeCsx1TiChNCXqwhycrn7A07MGVXYaetrrjyN3w1Y3PVNDoIfs5__puofAw
// Shared model: https://github.com/microsoft/monaco-editor/blob/main/samples/browser-amd-shared-model/index.html

const Monaco: Component<{ value?: string, onChange?: (e: string) => void}> = (props) => {
  let container: HTMLDivElement|undefined = undefined

  onMount(() => {
    if (container && props.value) {
      const model = monaco.editor.createModel(props.value, 'json')

      monaco.editor.create(container, {
        language: 'json',
        model,
      });

      model.onDidChangeContent(() => {
        props.onChange?.(model.getValue())
      })
    }
  })

  return (
    <div ref={container} class="w-screen h-screen"/>
  )
}

export default Monaco
