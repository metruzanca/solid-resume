// We're exporting the JsonResume namespace which exports all the other types.
// Using a namespace because I don't want to have confusing duplicate auto-complete imports
// Instead I just want the Solid- ones exported which will extend/override/replace/re-export
// the JsonResume ones
import { JsonResume } from "./json-resume";

export type Profile = JsonResume.Profile
export type Basics = JsonResume.Basics
export type Education = JsonResume.Education
export type Project = JsonResume.Project

// Basically removed the "level" option, as that should just be avoided on resumes.
export type SkillCategory = {
  name: string;
  /** Skills */
  keywords: string[];
}

type Tech = {
  href: string
  text: string
}

export type Work = JsonResume.Work & {
  stack?: Array<Tech | string>
  logo?: string
}

export type SolidResume = {
  /** link to the version of the schema that can validate the resume */
  $schema?: string;
  basics?: JsonResume.Basics;
  volunteer?: Array<JsonResume.Volunteer>;
  education?: Array<JsonResume.Education>;
  awards?: Array<JsonResume.Award>;
  certificates?: Array<JsonResume.Certificate>;
  publications?: Array<JsonResume.Publication>;
  languages?: Array<JsonResume.Language>;
  interests?: Array<JsonResume.Interest>;
  references?: Array<JsonResume.Reference>;
  projects?: Array<JsonResume.Project>
  /** The schema version and any other tooling configuration lives here */
  meta?: JsonResume.Meta;
  
  // Everything above this line is standard JSONresume v1.0.0

  work: Array<Work>
  /** List of skill categories, containing the actual skills e.g. frontend: [css, js] */
  skills: Array<SkillCategory>
}
