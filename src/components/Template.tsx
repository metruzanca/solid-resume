import {Component, createSignal, For, ParentComponent } from "solid-js";
import { MetaProvider, Title, Link } from '@solidjs/meta';
import clsx from "clsx";

import { allSkills, formatDate, getProfile } from "~/lib/utils";

import Markdown from "~/components/Markdown";
import featureFlags, { defaultFlags, Flags } from "~/lib/featureFlags";
import PrintSize from "~/components/PrintSize";
import {
  SolidResume,
  Basics as BasicsType,
  Education as EducationType,
  Work as WorkType,
  SkillCategory as SkillsType,
  Project,
} from "~/lib/solid-resume";

const FAANG_FONT = {
  name: 'Frank Ruhl Libre',
  href: 'https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@400;500;600;700&display=swap',
}

const [flags, setFlags] = createSignal<Flags>(defaultFlags)

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
            <Linkable url={props.url}>
              <b>{props.name}</b>
            </Linkable>

            <span class="text-xs">{props.location}</span>
          </div>
          <div class="flex justify-between">
            <div class="underline">
              {props.position}
            </div>

            <span
              class="text-xs"
              textContent={`${formatDate(props.startDate)} - ${formatDate(props.endDate, 'present')}`}
            />
          </div>

        </div>
      </div>
      
      {/* Body */}
      
      <div class="ml-2 text-xs">
        {props.summary && (
          <Markdown text={props.summary}/>
        )}
        <ul class="pl-2">
          <For each={props.highlights} children={text => (
              <li class="list-['-'] list-outside mr-2">
                <span class="pl-1">
                  <Markdown text={text}/>
                </span>
              </li>
          )}/>
        </ul>
        {props.stack && (
          <>
            <b>{'Tech Stack: '}</b>
            <For each={props.stack!}>
              {(tech, i) => typeof tech === 'string' ? (
                <>
                  {tech}
                  {i() < props.stack!.length - 1 && ', '}
                </>
              ) : (
                <>
                  <a href={tech.href} class="text-blue-800 font-medium">
                    {tech.text}
                  </a>
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

const Education: Component<{ education?: EducationType[] }> = (props) => {
  return (
    <Section name="Education" when={props.education?.length! > 0}>
      <For each={props.education} children={degree => (
        <div>
          <div class="flex justify-between">
            <b>{degree.studyType} of {degree.area}</b>
            <span
              class="text-xs"
              textContent={`${formatDate(degree.startDate)} - ${formatDate(degree.endDate, 'present')}`}
            />
          </div>
          <span>{degree.institution}</span>
        </div>
      )}/>
    </Section>
  )
};

// TODO finish project section
const Projects: Component<{ projects?: Project[] }> = (props) => {
  return (
    <Section name="Projects" when={props.projects?.length! > 0}>
      <For each={props.projects} children={project => (
        <div>
          Can you tell projects are a WIP?
        </div>
      )}/>
    </Section>
  )
}

const Skills: Component<{ skills: SkillsType[] }> = (props) => {
  if (!props.skills?.length) return null;

  const skills = allSkills(props.skills)
  return (
    <Section name="Skills" when={props.skills.length! > 0}>
      <p class="text-xs">{skills?.join(', ')}</p>
    </Section>
  )
};


const Template: Component<{ resume: SolidResume }> = (props) => {
  setFlags(featureFlags({ search: location.search }))

  return (
    <PrintSize>
      <MetaProvider>
        <Title>{props.resume?.basics?.name || 'Resume'}</Title>
        <Link
          href={FAANG_FONT.href}
          rel="stylesheet"
        />
      </MetaProvider>

      <main class="text-sm px-10 py-12 text-black" style={{ "font-family": FAANG_FONT.name }}>
        <Header basics={props.resume.basics} />
        <Experience work={props.resume.work} />
        <Education education={props.resume.education} />
        {/* <Projects projects={props.resume.projects}/> */}
        <Skills skills={props.resume.skills}/>
      </main>
    </PrintSize>
  )
}

export default Template
