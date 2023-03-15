# Solid Resume

## What is Solid Resume?
I really love the idea behind [JSONResume](https://jsonresume.org/) but I always found building templates to be frustrating. I would like to be able to use my tools of choice e.g. tailwind + svelte/react/solid but its hard to wire these to build to a commonjs module with a render function that returns an html string. Thats really easy to do with handlebars or similar but pretty complex to setup with bundlers.

Another thing that I found frustrating was, after building out a handlebars template, the CLI didn't produce a resume that looked EXACTLY like the web view. It seemed to add some padding/margin. After trying to hack things together I decided to just build my own thing, but still use the jsonresume schema.

> I decided to use Solid, purely as an excuse to play around with it, this project could have easily been svelte or react.
>
> No clue where this project will go. I'm hoping to move my resume to this.

## MVP Features:
- [x] Solid app with router: `solid-resume.vercel.app/<username>/` will render the resume based on the JSONresume data.
- [x] Markdown Urls! (currently only supported in job.highlights & job.summary, in the default template)
- [x] This project extends the JsonSchema while maintaining backwards compatibility. You can get our schema extension here: [SolidResume Schema](https://solid-resume.vercel.app/schema.json) (details on what was changed can be found here `src/types.ts`)
- [ ] Simple CLI that will use puppeteer to create a PDF of `solid-resume.vercel.app/<username>/`
- [ ] Themes?
- [ ] https://github.com/json-editor/json-editor w/ github Oauth for editing????
## Printing / export to PDF
Easiest way to export to PDF is to load the resume page on desktop and press `cmd/ctrl + P` and then save as PDF (_tip: turn off margins!_).

Alternatively use the CLI (WIP).


## Templates
- [Faang](./src/templates/Faang/readme.md) (the default)
