export interface ExperienceItem {
  company: string;
  /** Public URL for the company/product, when there is one. */
  link?: string;
  role: string;
  period: string;
  location: string;
  points: string[];
}

export interface EducationItem {
  school: string;
  degree: string;
  period: string;
  location: string;
  details?: string;
}

/** A looping clip of the product, in two codecs plus a still for the poster. */
export interface Media {
  mp4: string;
  webm: string;
  poster: string;
}

export interface ShowcaseFeature {
  title: string;
  description: string;
  media?: Media;
}

export interface ShowcaseStage {
  label: string;
  detail: string;
}

export interface ProjectShowcase {
  /** URL fragment, e.g. "solvizor" for #/solvizor */
  slug: string;
  tagline: string;
  overview: string[];
  role: string;
  period: string;
  /** Where the project stands today, stated plainly. */
  status: string;
  stack: { group: string; items: string[] }[];
  metrics: { value: string; label: string }[];
  features: ShowcaseFeature[];
  /** Left-to-right stages of the data pipeline. */
  pipeline: ShowcaseStage[];
}

export interface ProjectItem {
  name: string;
  /** Public URL, when the project has a reachable one. */
  link?: string;
  description: string;
  /** Clip used as the card's sneak peek. */
  preview?: Media;
  /** When present, the card links through to a showcase page. */
  showcase?: ProjectShowcase;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ResumeData {
  personal: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    summary: string;
  };
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  projects: ProjectItem[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}