
export interface Author {
  name: string;
  isMe?: boolean;
}

export interface Publication {
  id: string;
  title: string;
  authors: Author[];
  venue: string;
  year: number;
  abstract?: string;
  tags: string[];
  links: {
    pdf?: string;
    code?: string;
    website?: string;
    slides?: string;
    doi?: string;
  };
  imageUrl?: string;
  status?: string; // e.g., "In Submission", "Published"
  type?: 'Journal' | 'Conference' | 'Preprint' | 'Thesis';
}

export interface ResearchProject {
  id: string;
  title: string;
  description: string;
  longDescription?: string; // Fallback text
  details?: string[];
  imageUrl?: string;
  tools: string[];
  status: 'Ongoing' | 'Completed';
  github?: string;
  // URL to external markdown (.md) or html (.html) file
  contentUrl?: string; 
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  type: 'Research' | 'Teaching';
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  year: string;
  advisor?: string;
  details?: string;
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  date: string;
}

export interface Service {
  role: string;
  organization: string;
}

export interface NewsItem {
  id: string;
  date: string;
  content: string;
  link?: string;
}

export enum SectionId {
  INTRO = 'intro',
  RESEARCH = 'research',
  PUBLICATIONS = 'publications',
  CV = 'cv'
}
