export interface SiteContent {
  person: {
    name: string;
    headline: string;
    location: string;
    email: string;
    summary: string;
    socials: { label: string; url: string; icon?: string }[];
    availabilityBadge?: string;
  };
  skills: {
    category: string;
    items: { name: string; level?: "Beginner" | "Intermediate" | "Advanced" }[];
  }[];
  experience: {
    company: string;
    title: string;
    start: string;
    end?: string;
    location?: string;
    highlights: string[];
    stack?: string[];
    links?: { label: string; url: string }[];
  }[];
  projects: {
    name: string;
    description: string;
    stack: string[];
    tags?: string[];
    featured?: boolean;
    images?: string[];
    links?: { live?: string; repo?: string; caseStudy?: string };
  }[];
  education: {
    school: string;
    program: string;
    start: string;
    end: string;
    grade?: string;
    achievements?: string[];
    links?: { label: string; url: string }[];
  }[];
  certifications?: {
    name: string;
    org: string;
    year?: string;
    url?: string;
  }[];
}

export interface ThemePreference {
  theme: 'light' | 'dark' | 'auto';
}
