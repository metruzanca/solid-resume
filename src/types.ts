// Convenience type
import { Component } from "solid-js";
export type Template = Component<{ resume: SolidResume }>

// We're exporting the JsonResume namespace which exports all the other types.
// Using a namespace because I don't want to have confusing duplicate auto-complete imports
// Instead I just want the Solid- ones exported which will extend/override/replace/re-export
// the JsonResume ones
import { JsonResume } from "./json-resume";

export type Profile = JsonResume.Profile
export type Basics = JsonResume.Basics
// export type Award = JsonResume.Award // ... etc export as needed

// Basically removed the "level" option, as that should just be avoided on resumes.
export type Skills = {
  name: string;
  /** List some keywords pertaining to this skill */
  keywords: string[];
}

type Tech = {
  href: string
  text: string
}

export type Work = JsonResume.Work & {
  stack: Array<Tech | string>
  logo: string
}

// export type Font = {
//   name: string
//   href: string
// }

export type SolidResume = {
  /** link to the version of the schema that can validate the resume */
  $schema?: string;
  basics?: JsonResume.Basics;
  volunteer?: Array<JsonResume.Volunteer>;
  education?: Array<JsonResume.Education>;
  /** Specify any awards you have received throughout your professional career */
  awards?: Array<JsonResume.Award>;
  /** Specify any certificates you have received throughout your professional career */
  certificates?: Array<JsonResume.Certificate>;
  /** Specify your publications through your career */
  publications?: Array<JsonResume.Publication>;
  /** List any other languages you speak */
  languages?: Array<JsonResume.Language>;
  interests?: Array<JsonResume.Interest>;
  /** List references you have received */
  references?: Array<JsonResume.Reference>;
  /** Specify career projects */
  projects?: Array<JsonResume.Project>
  /** The schema version and any other tooling configuration lives here */
  meta?: JsonResume.Meta;
  
  // Everything above this line is standard JSONresume v1.0.0

  // work?: Array<JsonResume.Work>;
  work: Array<Work>
  /** List out your professional skill-set */
  // skills?: Array<JsonResume.Skills>;
  skills: Array<Skills>
}
