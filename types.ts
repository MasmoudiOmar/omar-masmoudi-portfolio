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

export interface ProjectItem {
  name: string;
  /** Public URL, when the project has a reachable one. */
  link?: string;
  description: string;
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