# Solid Resume

## What is Solid Resume?
I really love the idea behind [JSONResume](https://jsonresume.org/) but I always found building templates to be frustrating. I would like to be able to use my tools of choice e.g. tailwind + svelte/react/solid but its hard to wire these to build to a commonjs module with a render function that returns an html string. Thats really easy to do with handlebars or similar but pretty complex to setup with bundlers.

I decided to use Solid, purely as an excuse to play around with it, this project could have easily been svelte or react.

> No clue where this project will go. I'm hoping to move my resume to this.

## MVP Features:
- [x] Solid app with router: `solid-resume.vercel.app/<username>/` will render the resume based on the JSONresume data.
- [ ] Simple CLI that will use puppeteer to create a PDF of `solid-resume.vercel.app/<username>/`

## Nice to haves
- [ ] Themes?

## Printing / export to PDF
Easiest way to export to PDF is to load the resume page on desktop and press `cmd/ctrl + P` and then save as PDF (_tip: turn off margins!_).

Alternatively use the CLI (WIP).
