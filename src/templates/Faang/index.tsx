import {createEffect, For } from "solid-js";
import PrintSize from "../../components/PrintSize";
import { Profile, Skills, Template } from "../../types";
import { replaceMarkdownLinks } from "../../utils";
import './styles.css'

function getProfile(profiles: Profile[] = [], target: string) {
  const item = profiles.find(item => item.network.toLowerCase() === target)
  return item
}

function allSkills(skills: Skills[] = []) {
  const all = []
  for (const category of skills) {
    all.push(...category.keywords)
  }
  return all
}

const Default: Template = (props) => {
  createEffect(() => {
    document.title = props.resume?.basics?.name || 'Resume'
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

        <h3>WORK EXPERIENCE</h3>
        
        <For each={props.resume?.work}>
          {job => (
            <>
              <h4 class="font-semibold font-serif text-sm">{job.name}</h4>
              <div class="flex justify-between font-mono text-xs">
                <div>
                  {job.position}
                </div>
                <div>
                  {job.location} ({job.startDate} - {job.endDate})
                </div>
              </div>
              <div class="ml-6 text-xs">
                <p>{job.summary && replaceMarkdownLinks(job.summary)}</p>
                <ul>
                  <For each={job.highlights}>
                    {(text) => (
                      <li class="list-['-'] list-inside mr-2">
                        <span class="pl-1">
                          {replaceMarkdownLinks(text)}
                        </span>
                      </li>
                    )}
                  </For>
                  {job.stack && (
                    <li>
                      <b>{'Tech Stack: '}</b>
                      <For each={job.stack}>
                        {(tech, i) => (
                          <>
                            <a href={tech.href}>
                              {tech.text}
                            </a>
                            {i() < job.stack.length - 1 && ', '}
                          </>
                        )}
                      </For>
                    </li>
                  )}
                </ul>
              </div>
            </>
          )}
        </For>

        <h3>SKILLS</h3>
        <p>
          {skills?.join(', ')}
        </p>
      </main>
    </PrintSize>
  )
}

export default Default
