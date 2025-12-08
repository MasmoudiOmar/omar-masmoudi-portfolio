export interface ExperienceItem {
  company: string;
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
  link: string;
  description: string; // Added for better UI, derived from resume context or placeholders
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ResumeData {
  personal: {
    name: string;
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