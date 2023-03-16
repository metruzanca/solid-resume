import {Component, createEffect, createSignal, For, ParentComponent } from "solid-js";
import { MetaProvider, Title, Link } from '@solidjs/meta';
import { parseISO, format } from "date-fns";
import clsx from "clsx";

import PrintSize from "../../components/PrintSize";
import { allSkills, getProfile, replaceMarkdownLinks } from "../../utils";
import {
  Template,
  Basics as BasicsType,
  Education as EducationType,
  Work as WorkType,
  Skills as SkillsType,
} from "../../types";

const DEFAULT_FLAGS = {
  logos: false,
}

const FANCY_FONT = {
  name: 'Frank Ruhl Libre',
  href: 'https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@400;500;600;700&display=swap',
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
      <a href={props.url} class="cursor-pointer text-blue-800">
        {props.children}
      </a>
    ): (
      <span>
        {props.children}
      </span>
    )}
  </>
)

const Section: ParentComponent<{ name: string, when?: any }> = (props) => {
  return props.when && (
    <>
      <h3 class="w-full border-gray-600 px-1 font-medium mb-2" style={{
        "border-bottom-width": "1px",
        "box-shadow": "0 2px 2px -2px gray",
      }}>{props.name.toUpperCase()}</h3>
      <div class="px-2">
        {props.children}
      </div>
    </>
  )
}

const Experience: Component<{ work: WorkType[] }> = (props) => {
  return (
    <Section name="WORK EXPERIENCE" when={props.work}>
      <For each={props.work} children={Job} />
    </Section>
  )
};

const Job: Component<WorkType> = (props) => {
  const startDate = props.startDate
    ? format(parseISO(props.startDate), 'MMM yyyy')
    : ''
  
  let endDate = ''
  // Can't have an endDate if no startDate.
  // Just in case theres a mistake in the jsonResume
  if (startDate !== '') {
    endDate = props.endDate
    ? format(parseISO(props.endDate), 'MMM yyyy')
    : 'present'
  }

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
            <h4 class="font-semibold text-sm flex items-start">
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
            <For each={props.stack!}>
              {(tech, i) => (
                <>
                  {typeof tech === 'string' ? (
                    <>
                      {tech}
                    </>
                  ) : (
                    <a href={tech.href} class="text-blue-800">
                      {tech.text}
                    </a>
                  )}
                  {i() < props.stack!.length - 1 && ', '}
                </>
              )}
            </For>
          </>
        )}
      </div>
    </div>
  )
}

const Header: Component<{ basics?: BasicsType }> = (props) => {

  const github = getProfile(props?.basics?.profiles, 'github')
  const linkedin = getProfile(props?.basics?.profiles, 'linkedin')

  return (
    <>
      <div class="flex flex-col items-center">
        <h1 class="text-4xl mb-[-4px]">
          {props.basics?.name}
        </h1>
        <h2 class="text-lg">
          {props?.basics?.label}
        </h2>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-between mx-4 text-xs">

        <div class="flex justify-between sm:justify-around w-full">
          <Linkable url={`mailto:${props.basics?.email}`}>
            {props.basics?.email}
          </Linkable>

          <Linkable url={`tel:${props?.basics?.phone}`}>
            phone: {props?.basics?.phone}
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
    </>
  )
}

// Would be education but thats the name of the type
const Education: Component<{ education?: EducationType[] }> = (props) => {
  return (
    <Section name="Education" when={props.education}>
      <For each={props.education}>
        {(degree) => (
          <>
            <b>{degree.studyType} of {degree.area}</b>{', '}{degree.institution}
          </>
        )}
      </For>
    </Section>
  )
};

const Skills: Component<{ skills: SkillsType[] }> = (props) => {
  if (!props.skills?.length) return null;

  const skills = allSkills(props.skills)
  return (
    <Section name="Skills" when={props.skills.length}>
      <p class="text-xs">{skills?.join(', ')}</p>
    </Section>
  )
};


const Faang: Template = (props) => {
  updateFlags(location.search)

  return (
    <PrintSize>
      <MetaProvider>
        <Title>{props.resume?.basics?.name || 'Resume'}</Title>
        <Link
          href={FANCY_FONT.href}
          rel="stylesheet"
        />
      </MetaProvider>

      <main class="text-sm px-10 py-12" style={{ "font-family": FANCY_FONT.name }}>
        <Header basics={props.resume.basics} />
        <Experience work={props.resume.work} />
        <Education education={props.resume.education} />
        <Skills skills={props.resume.skills}/>
      </main>
    </PrintSize>
  )
}

export default Faang
