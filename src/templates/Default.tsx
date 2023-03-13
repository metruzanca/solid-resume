import {createEffect, For } from "solid-js";
import PrintSize from "../components/PrintSize";
import { Profile, Skills } from "../json-resume";
import { Template } from "../utils";


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
    console.log('resume: ', props.resume);

  })

  const github = getProfile(props.resume?.basics?.profiles, 'github')
  const linkedin = getProfile(props.resume?.basics?.profiles, 'linkedin')

  const skills = allSkills(props.resume?.skills)

  return (
    <PrintSize>
      {!props.resume && (
        <div>Loading...</div>
      )}

      <main class="text-sm px-4 py-8">
        {/* Basics */}
        <div class="flex flex-col items-center">
          <h1 class="text-4xl font-serif mb-[-5px]">
            {props.resume?.basics?.name}
          </h1>
          <h2 class="text-lg font-serif">
            {props.resume?.basics?.label}
          </h2>
        </div>

        <div class="flex justify-between mx-4">
          {props.resume?.basics?.email && (
            <span>
              <a
                class="text-blue-800"
                href={`mailto:${props.resume.basics.email}`}
              >{props.resume.basics.email}</a>
            </span>
          )}

          {props.resume?.basics?.phone && (
            <span>{props.resume?.basics?.phone}</span>
          )}

          {github && (
            <a
              class="text-blue-800"
              href={`https://github.com/${github.username}`}
            >github.com/{github.username}</a>
          )}

          {linkedin && (
            <a
              class="text-blue-800"
              href={`https://www.linkedin.com/in/${linkedin.username}/`}
            >linkedin.com/in/{linkedin.username}/</a>
          )}
        </div>

        {/* Work */}

        <h3 class="w-full border-b-2 border-black px-1 font-bold">
          Work
        </h3>
        
        <For each={props.resume?.work}>
          {job => (
            <>
              <h4 class="font-bold">{job.name}</h4>
              <div class="flex justify-between font-mono">
                <div>
                  {job.position}
                </div>
                <div>
                  {job.location} ({job.startDate} - {job.endDate})
                </div>
              </div>
              <div class="ml-8 text-xs">
                <p>{job.summary}</p>
                <ul>
                  <For each={job.highlights}>
                    {text => (
                      <li class="list-['-'] list-inside">
                        <span class="pl-1">{text}</span>
                      </li>
                    )}
                  </For>
                </ul>
              </div>
            </>
          )}
        </For>

        {/* Skills */}

        <h3 class="w-full border-b-2 border-black px-1 font-bold">
          Skills
        </h3>

        {skills?.join(', ')}
      </main>
    </PrintSize>
  )
}

export default Default
