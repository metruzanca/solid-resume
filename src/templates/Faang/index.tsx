import clsx from "clsx";
import { parseISO, format } from "date-fns";
import {Component, createEffect, createSignal, For, ParentComponent, Show } from "solid-js";
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
      <span>
        {props.children}
      </span>
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
    <div class={clsx(flags().logos && 'ml-[28px]')}>
      {/* Header */}

      <div class="flex items-center">
        {flags().logos && props.logo && (
          <div class="absolute ml-[-30px]">
            <Linkable url={props.url}>
              <img class="inline h-6 pr-1" src={props.logo}/>
            </Linkable>
          </div>
        )}

        <div class="w-full">

          <div class="flex justify-between">
            <h4 class="font-semibold font-serif text-sm flex items-start">
              <Linkable url={props.url}>{props.name}</Linkable>
            </h4>

            <span class="text-xs">{props.location}</span>
          </div>
          <div class="flex justify-between">
            <div class="underline">
              {props.position}
            </div>

            <span class="text-xs">({startDate} - {endDate})</span>
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
    </div>
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

        <div class="flex flex-col sm:flex-row items-center justify-between mx-4 text-xs">
          
          <div class="flex justify-between sm:justify-around w-full">
            <Linkable url={`mailto:${props.resume.basics?.email}`}>
              {props.resume.basics?.email}
            </Linkable>

            <Linkable url={`tel:${props.resume?.basics?.phone}`}>
              phone: {props.resume?.basics?.phone}
            </Linkable>
          </div>

          <div class="flex justify-between sm:justify-around w-full">
            {github && (
              <Linkable url={`https://github.com/${github.username}`}>
                {`github: ${github.username}`}
              </Linkable>
            )}
            {linkedin && (
              <Linkable url={`https://www.linkedin.com/in/${linkedin.username}/`}>
                {`linkedin: ${linkedin.username}`}
              </Linkable>
            )}
          </div>

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
