// Boilerplat schema as taken from a jsonSchema to typescript tool.
// Its been since refactored to be easier to work with.
export interface JsonResume {
  /** link to the version of the schema that can validate the resume */
  $schema?: string;
  basics?: JsonResume.Basics;
  work?: Array<JsonResume.Work>;
  volunteer?: Array<JsonResume.Volunteer>;
  education?: Array<JsonResume.Education>;
  /** Specify any awards you have received throughout your professional career */
  awards?: Array<JsonResume.Award>;
  /** Specify any certificates you have received throughout your professional career */
  certificates?: Array<JsonResume.Certificate>;
  /** Specify your publications through your career */
  publications?: Array<JsonResume.Publication>;
  /** List out your professional skill-set */
  skills?: Array<JsonResume.Skills>;
  /** List any other languages you speak */
  languages?: Array<JsonResume.Language>;
  interests?: Array<JsonResume.Interest>;
  /** List references you have received */
  references?: Array<JsonResume.Reference>;
  /** Specify career projects */
  projects?: Array<JsonResume.Project>
  /** The schema version and any other tooling configuration lives here */
  meta?: JsonResume.Meta;
}
export namespace JsonResume {
  /** e.g. 2014-06-29 */
  export type Iso8601 = string;
  
  export type Profile = {
    /** e.g. Facebook or Twitter */
    network: string;
    /** e.g. neutralthoughts */
    username: string;
    /** e.g. http://twitter.example.com/neutralthoughts */
    url: string;
  }
  
  export type Work = {
    /** e.g. Facebook */
    name?: string;
    /** e.g. Menlo Park, CA */
    location?: string;
    /** e.g. Social Media Company */
    description?: string;
    /** e.g. Software Engineer */
    position?: string;
    /** e.g. http://facebook.example.com */
    url?: string;
    startDate?: Iso8601;
    endDate?: Iso8601;
    /** Give an overview of your responsibilities at the company */
    summary?: string;
    /** Specify multiple accomplishments */
    highlights?: string[];
  }
  
  export type Skills = {
    /** e.g. Web Development */
    name: string;
    /** e.g. Master */
    level?: string; // TODO remove this with an override
    /** List some keywords pertaining to this skill */
    keywords: string[];
  }
  
  export type Basics = {
    name?: string;
    /** e.g. Web Developer */
    label?: string;
    /** URL (as per RFC 3986) to a image in JPEG or PNG format */
    image?: string;
    /** e.g. thomas@gmail.com */
    email?: string;
    /** Phone numbers are stored as strings so use any format you like, e.g. 712-117-2923 */
    phone?: string;
    /** URL (as per RFC 3986) to your website, e.g. personal homepage */
    url?: string;
    /** Write a short 2-3 sentence biography about yourself */
    summary?: string;
    location?: Location;
    /** Specify any number of social networks that you participate in */
    profiles?: Profile[];
  };
  
  export type Location = {
    /**
    * To add multiple address lines, use
    * . For example, 1234 Glücklichkeit Straße
    * Hinterhaus 5. Etage li.
    */
    address?: string;
    postalCode?: string;
    city?: string;
    /** code as per ISO-3166-1 ALPHA-2, e.g. US, AU, IN */
    countryCode?: string;
    /** The general region where you live. Can be a US state, or a province, for instance. */
    region?: string;
  }
  
  export type Volunteer = {
    /** e.g. Facebook */
    organization?: string;
    /** e.g. Software Engineer */
    position?: string;
    /** e.g. http://facebook.example.com */
    url?: string;
    startDate?: Iso8601;
    endDate?: Iso8601;
    /** Give an overview of your responsibilities at the company */
    summary?: string;
    /** Specify accomplishments and achievements */
    highlights?: string[];
  }
  
  export type Education = {
    /** e.g. Massachusetts Institute of Technology */
    institution?: string;
    /** e.g. http://facebook.example.com */
    url?: string;
    /** e.g. Arts */
    area?: string;
    /** e.g. Bachelor */
    studyType?: string;
    startDate?: Iso8601;
    endDate?: Iso8601;
    /** grade point average, e.g. 3.67/4.0 */
    score?: string;
    /** List notable courses/subjects */
    courses?: string[];
  }
  
  export type Award = {
    /** e.g. One of the 100 greatest minds of the century */
    title?: string;
    date?: Iso8601;
    /** e.g. Time Magazine */
    awarder?: string;
    /** e.g. Received for my work with Quantum Physics */
    summary?: string;
  }
  
  export type Certificate = {
    /** e.g. Certified Kubernetes Administrator */
    name?: string;
    /** e.g. 1989-06-12 */
    date?: string;
    /** e.g. http://example.com */
    url?: string;
    /** e.g. CNCF */
    issuer?: string;
  }
  
  export type Language = {
    /** e.g. English, Spanish */
    language?: string;
    /** e.g. Fluent, Beginner */
    fluency?: string;
  }
  
  export type Publication = {
    /** e.g. The World Wide Web */
    name?: string;
    /** e.g. IEEE, Computer Magazine */
    publisher?: string;
    releaseDate?: Iso8601;
    /** e.g. http://www.computer.org.example.com/csdl/mags/co/1996/10/rx069-abs.html */
    url?: string;
    /** Short summary of publication. e.g. Discussion of the World Wide Web, HTTP, HTML. */
    summary?: string;
  }
  
  export type Interest = {
    /** e.g. Philosophy */
    name?: string;
    keywords?: string[];
  }
  
  export type Reference = {
    /** e.g. Timothy Cook */
    name?: string;
    /**
     * e.g. Joe blogs was a great employee, who turned up to work at least once a week.
     * He exceeded my expectations when it came to doing nothing.
     */
    reference?: string;
  }
  
  export type Project = {
    /** e.g. The World Wide Web /
    name?: string;
    /** Short summary of project. e.g. Collated works of 2017. */
    description?: string;
    /** Specify multiple features */
    highlights?: string[];
    /** Specify special elements involved */
    keywords?: string[];
    startDate?: Iso8601;
    endDate?: Iso8601;
    /** e.g. http://www.computer.org/csdl/mags/co/1996/10/rx069-abs.html */
    url?: string;
    /** Specify your role on this project or in company */
    roles?: string[];
    /** Specify the relevant company/entity affiliations e.g. 'greenpeace', 'corporationXYZ' */
    entity?: string;
    /** e.g. 'volunteering', 'presentation', 'talk', 'application', 'conference' */
    type?: string;
  }
  
  export type Meta = {
    /** URL (as per RFC 3986) to latest version of this document */
    canonical?: string;
    /** A version field which follows semver - e.g. v1.0.0 */
    version?: string;
    /** Using ISO 8601 with YYYY-MM-DDThh:mm:ss */
    lastModified?: string;
    /** JSON resume theme */
    theme: string
  }
}

