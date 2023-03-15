import { parseISO, format } from "date-fns";
import {Component, createEffect, createSignal, For, ParentComponent } from "solid-js";
import PrintSize from "../../components/PrintSize";
import { Template, Work } from "../../types";
import { allSkills, getProfile, replaceMarkdownLinks } from "../../utils";
import './styles.css'

const DEFAULT_FLAGS = {
  logos: false,
}

const [flags, setFlags] = createSignal(DEFAULT_FLAGS)

const updateFlags = (search: string) => {
  const params = new URLSearchParams(search)
  const newFlags: Partial<typeof DEFAULT_FLAGS> = {}
  for (let entry of params.entries()) {
    const key = entry[0] as keyof typeof DEFAULT_FLAGS
    if (key in flags()) {
      const value = entry[1]
      newFlags[key] = value === 'true'
    }
  }
  setFlags({
    ...flags(),
    ...newFlags,
  })
}

const Linkable: ParentComponent<{ url?: string }> = (props) => (
  <>
    {props.url ? (
      <a href={props.url} class="cursor-pointer">
        {props.children}
      </a>
    ): (
      <>
        {props.children}
      </>
    )}
  </>
)

const Section: ParentComponent<{ name: string }> = (props) => {
  return (
    <>
      <h3>{props.name}</h3>
      <div class="px-2">
        {props.children}
      </div>
    </>
  )
}

const Job: Component<Work> = (props) => {
  const startDate = props.startDate
    ? format(parseISO(props.startDate), 'MMM yyyy')
    : '' // StartDate should always be present
  const endDate = props.endDate
    ? format(parseISO(props.endDate), 'MMM yyyy')
    : 'present'

  return (
    <>
      {/* Header */}

      <div class="flex items-center">
        {flags().logos && props.logo && (
          <Linkable url={props.url}>
            <img class="inline h-6 pr-1" src={props.logo}/>
          </Linkable>
        )}

        <div class="w-full">
          <h4 class="font-semibold font-serif text-sm flex items-start">
            <Linkable url={props.url}>
              {props.name}
            </Linkable>
          </h4>
          <div class="flex justify-between font-mono text-xs">
            <div class="underline">
              {props.position}
            </div>
            <div>
              {props.location} ({startDate} - {endDate})
            </div>
          </div>
        </div>
      </div>
      
      {/* Body */}
      
      <div class="ml-2 text-xs">
        <p>{props.summary && replaceMarkdownLinks(props.summary)}</p>
        <ul class="pl-2">
          <For each={props.highlights}>
            {(text) => (
              <li class="list-['-'] list-outside mr-2">
                <span class="pl-1">
                  {replaceMarkdownLinks(text)}
                </span>
              </li>
            )}
          </For>
        </ul>
        {props.stack && (
          <>
            <b>{'Tech Stack: '}</b>
            <For each={props.stack}>
              {(tech, i) => (
                <>
                  <a href={tech.href}>
                    {tech.text}
                  </a>
                  {i() < props.stack.length - 1 && ', '}
                </>
              )}
            </For>
          </>
        )}
      </div>
    </>
  )
}

const Faang: Template = (props) => {
  createEffect(() => {
    document.title = props.resume?.basics?.name || 'Resume'
    updateFlags(location.search)
  })

  const github = getProfile(props.resume?.basics?.profiles, 'github')
  const linkedin = getProfile(props.resume?.basics?.profiles, 'linkedin')

  const skills = allSkills(props.resume?.skills)

  return (
    <PrintSize>
      {!props.resume && (
        <div>Loading...</div>
      )}

      <main class="text-sm px-10 py-12">
        {/* Basics */}
        <div class="flex flex-col items-center">
          <h1 class="font-serif text-4xl mb-[-4px]">
            {props.resume?.basics?.name}
          </h1>
          <h2 class="font-serif text-lg">
            {props.resume?.basics?.label}
          </h2>
        </div>

        <div class="flex  flex-col sm:flex-row items-center justify-between mx-4">
          {props.resume?.basics?.email && (
            <div>
              <a
                class="text-xs"
                href={`mailto:${props.resume.basics.email}`}
              >
                {props.resume.basics.email}
              </a>
            </div>
          )}

          {props.resume?.basics?.phone && (
            <div>
              <span class="text-xs">
                {props.resume?.basics?.phone}
              </span>
            </div>
          )}

          {github && (
            <div>
              <a 
                class="text-xs"
                href={`https://github.com/${github.username}`}
              >
                github.com/{github.username}
              </a>
            </div>
          )}

          {linkedin && (
            <div>
              <a
                class="text-xs"
                href={`https://www.linkedin.com/in/${linkedin.username}/`}
              >
                linkedin.com/in/{linkedin.username}
                </a>
            </div>
          )}
        </div>

        <Section name="WORK EXPERIENCE">
          <For each={props.resume?.work} children={Job} />
        </Section>

        <Section name="SKILLS">
          <p class="text-xs">{skills?.join(', ')}</p>
        </Section>
      </main>
    </PrintSize>
  )
}

export default Faang
