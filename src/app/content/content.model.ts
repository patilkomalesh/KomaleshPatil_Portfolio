// Shape of src/assets/content.json. Every section of the site renders from it.

export interface Social {
  label: string;
  url: string;
  icon?: string;
}

export interface Person {
  name: string;
  headline: string;
  location: string;
  email: string;
  phone?: string;
  summary: string;
  /** First-person intro shown on the site. Falls back to summary when absent. */
  intro?: string;
  socials: Social[];
  availabilityBadge?: string;
}

export interface SkillGroup {
  category: string;
  items: { name: string; level?: 'Beginner' | 'Intermediate' | 'Advanced' }[];
}

export interface Job {
  company: string;
  title: string;
  start: string;
  end?: string;
  location?: string;
  highlights: string[];
  stack?: string[];
}

export interface Project {
  name: string;
  description: string;
  stack: string[];
  tags?: string[];
  featured?: boolean;
  links?: {
    live?: string;
    repo?: string;
    caseStudy?: string;
    publication?: string;
    /** Proof of publication (e.g. a journal e-certificate), separate from the paper itself. */
    certificate?: string;
  };
}

export interface Education {
  school: string;
  program: string;
  start: string;
  end: string;
  grade?: string;
  achievements?: string[];
}

export interface Publication {
  title: string;
  authors: string[];
  journal: string;
  volume?: string;
  issue?: string;
  year: string;
  url?: string;
  /** Proof of publication (e.g. a journal e-certificate), separate from the paper itself. */
  certificateUrl?: string;
}

export interface Role {
  organization: string;
  role: string;
  start: string;
  end: string;
  highlights: string[];
}

export interface SiteContent {
  person: Person;
  skills: SkillGroup[];
  experience: Job[];
  projects: Project[];
  education: Education[];
  certifications?: { name: string; org: string; year?: string; url?: string }[];
  publications?: Publication[];
  leadership?: Role[];
}
